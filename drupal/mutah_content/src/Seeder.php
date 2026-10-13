<?php

namespace Drupal\mutah_content;

use Drupal\Core\File\FileExists;
use Drupal\Core\File\FileSystemInterface;
use Drupal\node\Entity\Node;
use Drupal\taxonomy\Entity\Term;

/**
 * Loads the site's current content (content/content.json) into Drupal.
 *
 * Creates one "الجهات" term per site list, the news / announcement / event
 * nodes of every list, faculty members, council members and the attachment
 * titles. Runs once, when the module is installed.
 */
class Seeder {

  protected string $dir;

  /** @var int[] term id by scope key */
  protected array $terms = [];

  public function __construct(?string $dir = NULL) {
    $this->dir = $dir ?: \Drupal::service('extension.list.module')->getPath('mutah_content') . '/content';
  }

  public function run(): array {
    $data = json_decode(file_get_contents($this->dir . '/content.json'), TRUE);
    $count = ['scopes' => 0, 'items' => 0, 'faculty' => 0, 'council' => 0, 'documents' => 0];

    foreach ($data['scopes'] as $i => $scope) {
      $tid = $this->term($scope['key'], $scope['label'], $i);
      $count['scopes']++;
      foreach (array_values($scope['items']) as $w => $item) {
        $this->item($scope['kind'], $tid, $item, $w);
        $count['items']++;
      }
    }
    foreach ($data['faculty'] as $w => $member) {
      $this->facultyMember($member, $w);
      $count['faculty']++;
    }
    foreach ($data['councils'] as $council => $members) {
      foreach ($members as $w => $member) {
        $this->councilMember($council, $member, $w);
        $count['council']++;
      }
    }
    foreach ($data['documents'] ?? [] as $w => $title) {
      Node::create(['type' => 'course_document', 'title' => mb_substr($title, 0, 255), 'field_weight' => $w, 'status' => 1, 'uid' => 1])->save();
      $count['documents']++;
    }
    return $count;
  }

  protected function term(string $key, string $label, int $weight): int {
    $existing = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadByProperties(['vid' => 'mutah_scope', 'field_scope_key' => $key]);
    $term = $existing ? reset($existing) : Term::create(['vid' => 'mutah_scope', 'field_scope_key' => $key]);
    $term->setName(mb_substr($label, 0, 255));
    $term->setWeight($weight);
    $term->save();
    return $this->terms[$key] = (int) $term->id();
  }

  /** News / announcement / event. */
  protected function item(string $type, int $tid, array $it, int $weight): void {
    $title = trim((string) ($it['title'] ?? $it['t'] ?? ''));
    if ($title === '') {
      return;
    }
    $date = (string) ($it['date'] ?? $it['d'] ?? '');
    $paragraphs = $it['paragraphs'] ?? (is_array($it['body'] ?? NULL) ? $it['body'] : []);
    $desc = (string) ($it['desc'] ?? $it['excerpt'] ?? '');
    $html = implode("\n", array_map(fn($p) => '<p>' . htmlspecialchars((string) $p, ENT_NOQUOTES) . '</p>', array_filter($paragraphs, 'is_string')));
    if ($html === '' && $desc !== '') {
      $html = '<p>' . htmlspecialchars($desc, ENT_NOQUOTES) . '</p>';
    }
    $values = [
      'type' => $type,
      'title' => mb_substr($title, 0, 255),
      'status' => 1,
      'uid' => 1,
      'field_scope' => [$tid],
      'field_weight' => $weight,
      'field_date_text' => mb_substr($date, 0, 120),
      'body' => ['value' => $html, 'summary' => $desc, 'format' => 'basic_html'],
    ];
    if ($iso = self::isoDate($date)) {
      $values['field_date'] = $iso;
    }
    if (isset($it['id']) && $it['id'] !== '') {
      $values['field_item_id'] = (string) $it['id'];
    }
    if ($tag = $it['tag'] ?? (isset($it['category']) && !in_array($it['category'], ['news', 'events'], TRUE) ? $it['category'] : NULL)) {
      $values['field_tag'] = $tag;
    }
    if ($src = $it['source'] ?? $it['url'] ?? $it['link'] ?? NULL) {
      $values['field_source_link'] = ['uri' => self::uri($src)];
    }
    $img = $it['img'] ?? $it['image'] ?? NULL;
    if ($img && str_starts_with($img, 'file:')) {
      if ($fid = $this->file(substr($img, 5), 'mutah/news')) {
        $values['field_image'] = ['target_id' => $fid, 'alt' => mb_substr($title, 0, 512)];
      }
    }
    elseif ($img) {
      $values['field_image_url'] = mb_substr($img, 0, 1024);
    }
    if (!empty($it['images'])) {
      $values['field_gallery'] = array_values(array_filter($it['images'], fn($u) => is_string($u) && !str_starts_with($u, 'file:')));
    }
    if (!empty($it['docs'])) {
      $values['field_related_links'] = array_map(fn($d) => ['uri' => self::uri(is_array($d) ? $d[0] : $d), 'title' => is_array($d) ? ($d[1] ?? '') : ''], $it['docs']);
    }
    Node::create($values)->save();
  }

  protected function facultyMember(array $m, int $weight): void {
    $join = fn(array $rows, array $keys) => array_map(fn($r) => rtrim(implode(' | ', array_map(fn($k) => (string) ($r[$k] ?? ''), $keys)), ' |'), $rows);
    $values = [
      'type' => 'faculty_member',
      'title' => $m['name'],
      'status' => 1,
      'uid' => 1,
      'field_slug' => $m['slug'],
      'field_college' => $m['college'] ?? '',
      'field_department' => $m['department'] ?? '',
      'field_email' => $m['email'] ?? NULL,
      'field_phone' => $m['phone'] ?? '',
      'field_fax' => $m['fax'] ?? '',
      'body' => ['value' => implode("\n", array_map(fn($p) => '<p>' . htmlspecialchars($p, ENT_NOQUOTES) . '</p>', $m['about'] ?? [])), 'format' => 'basic_html'],
      'field_research' => $m['research'] ?? [],
      'field_publications' => $join($m['publications'] ?? [], ['title', 'venue', 'year', 'link']),
      'field_courses' => $join($m['courses'] ?? [], ['title', 'code']),
      'field_member_news' => $join($m['news'] ?? [], ['title', 'date', 'text', 'link']),
      'field_office_hours' => $join($m['officeHours'] ?? [], ['day', 'time']),
      'field_other_info' => $m['otherInfo'] ?? [],
      'field_books' => $join($m['books'] ?? [], ['title', 'publisher', 'year', 'link']),
      'field_supervision' => $join($m['supervision'] ?? [], ['title', 'student', 'degree', 'year', 'role']),
      'field_achievements' => $join($m['achievements'] ?? [], ['title', 'year', 'text']),
      'field_funded_research' => $join($m['fundedResearch'] ?? [], ['title', 'funder', 'year', 'role']),
      'field_file_links' => array_map(fn($l) => ['uri' => self::uri($l['url']), 'title' => $l['title']], $m['files'] ?? []),
      'field_important_links' => array_map(fn($l) => ['uri' => self::uri($l['url']), 'title' => $l['title']], $m['links'] ?? []),
    ];
    foreach (['cv' => 'field_cv', 'scholar' => 'field_scholar', 'researchgate' => 'field_researchgate', 'site' => 'field_personal_site'] as $k => $field) {
      if (!empty($m[$k])) {
        $values[$field] = ['uri' => self::uri($m[$k])];
      }
    }
    if (!empty($m['photo']) && str_starts_with($m['photo'], 'file:') && ($fid = $this->file(substr($m['photo'], 5), 'mutah/faculty'))) {
      $values['field_photo'] = ['target_id' => $fid, 'alt' => $m['name']];
    }
    Node::create($values)->save();
  }

  protected function councilMember(string $council, array $m, int $weight): void {
    $values = [
      'type' => 'council_member',
      'title' => $m['name'],
      'status' => 1,
      'uid' => 1,
      'field_council' => $council,
      'field_role' => $m['role'] ?? '',
      'field_weight' => $weight,
    ];
    foreach (['phone' => 'field_phone', 'ext' => 'field_phone_ext', 'fax' => 'field_fax', 'email' => 'field_email', 'location' => 'field_location'] as $k => $field) {
      if (!empty($m[$k])) {
        $values[$field] = $m[$k];
      }
    }
    if (!empty($m['speech'])) {
      $values['body'] = ['value' => implode("\n", array_map(fn($p) => '<p>' . htmlspecialchars($p, ENT_NOQUOTES) . '</p>', $m['speech'])), 'format' => 'basic_html'];
    }
    if (!empty($m['img']) && str_starts_with($m['img'], 'file:') && ($fid = $this->file(substr($m['img'], 5), 'mutah/council'))) {
      $values['field_photo'] = ['target_id' => $fid, 'alt' => $m['name']];
    }
    Node::create($values)->save();
  }

  /** Copies content/files/<name> to public://<dir>/ and returns the file id. */
  protected function file(string $name, string $dir): ?int {
    static $done = [];
    if (isset($done[$name])) {
      return $done[$name];
    }
    $src = $this->dir . '/files/' . basename($name);
    if (!is_file($src)) {
      return NULL;
    }
    $fs = \Drupal::service('file_system');
    $target = 'public://' . $dir;
    $fs->prepareDirectory($target, FileSystemInterface::CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);
    $file = \Drupal::service('file.repository')->writeData(file_get_contents($src), $target . '/' . basename($name), FileExists::Rename);
    $file->setPermanent();
    $file->save();
    return $done[$name] = (int) $file->id();
  }

  /** "2026-08-13", "5/30/2022", "30/7/2025" → Y-m-d (NULL when unknown or ambiguous). */
  public static function isoDate(string $s): ?string {
    $s = strtr(trim($s), ['٠' => '0', '١' => '1', '٢' => '2', '٣' => '3', '٤' => '4', '٥' => '5', '٦' => '6', '٧' => '7', '٨' => '8', '٩' => '9']);
    if (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})/', $s, $m)) {
      [$y, $mo, $d] = [(int) $m[1], (int) $m[2], (int) $m[3]];
    }
    elseif (preg_match('#^(\d{1,2})/(\d{1,2})/(\d{4})$#', $s, $m)) {
      [$a, $b, $y] = [(int) $m[1], (int) $m[2], (int) $m[3]];
      if ($a > 12) {
        [$d, $mo] = [$a, $b];
      }
      elseif ($b > 12) {
        [$mo, $d] = [$a, $b];
      }
      else {
        return NULL;
      }
    }
    else {
      return NULL;
    }
    return checkdate($mo, $d, $y) ? sprintf('%04d-%02d-%02d', $y, $mo, $d) : NULL;
  }

  protected static function uri(string $u): string {
    $u = trim($u);
    if (preg_match('#^(https?:|mailto:|tel:)#i', $u)) {
      return $u;
    }
    return str_starts_with($u, '#') || str_starts_with($u, '/') ? 'internal:/' . ltrim($u, '/') : 'https://' . $u;
  }

}
