<?php

namespace Drupal\mutah_content\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * /admin/mutah — «محتوى الجامعة»: one place to add and find site content.
 */
class DashboardController extends ControllerBase {

  const TYPES = [
    'news' => ['الأخبار', 'أخبار الكليات والأقسام والوحدات والمراكز والصفحة الرئيسية.'],
    'announcement' => ['الإعلانات', 'الإعلانات في صفحات الكليات والعمادات والوحدات.'],
    'event' => ['الفعاليات والنشاطات', 'الفعاليات ونشاطات الكليات والمراكز.'],
    'faculty_member' => ['أعضاء هيئة التدريس', 'صفحات «مواقع أعضاء هيئة التدريس».'],
    'council_member' => ['رئاسة الجامعة والمجالس', 'رئيس الجامعة ونوابه ومجلس الأمناء ومجلس الجامعة ومجلس العمداء.'],
    'course_document' => ['المرفقات', 'ملفات وصف المواد والخطط الدراسية (DOCX و HTML).'],
  ];

  public function page() {
    $storage = $this->entityTypeManager()->getStorage('node');
    $cards = [];
    foreach (self::TYPES as $type => [$label, $help]) {
      $count = $storage->getQuery()->accessCheck(TRUE)->condition('type', $type)->count()->execute();
      $cards[$type] = [
        '#type' => 'container',
        '#attributes' => ['class' => ['mutah-card']],
        'title' => ['#markup' => '<h3>' . $label . ' <span class="mutah-count">' . $count . '</span></h3><p>' . $help . '</p>'],
        'links' => [
          '#theme' => 'links',
          '#attributes' => ['class' => ['mutah-actions']],
          '#links' => [
            'add' => ['title' => $this->t('إضافة'), 'url' => Url::fromRoute('node.add', ['node_type' => $type]), 'attributes' => ['class' => ['button', 'button--primary', 'button--small']]],
            'list' => ['title' => $this->t('عرض الكل'), 'url' => Url::fromRoute('view.mutah_content_admin.page_1', [], ['query' => ['type' => $type]]), 'attributes' => ['class' => ['button', 'button--small']]],
          ],
        ],
      ];
    }
    return [
      '#attached' => ['library' => ['mutah_content/dashboard']],
      'intro' => ['#markup' => '<div class="mutah-intro"><p>كل ما يظهر في موقع الجامعة من أخبار وإعلانات وفعاليات وأعضاء ومرفقات يُدار من هنا. بعد الحفظ يظهر التعديل في الموقع مباشرة.</p><p>لكل خبر أو إعلان اختر <strong>«يظهر في»</strong>: الكلية أو القسم أو الوحدة أو المركز الذي يظهر فيه. قائمة هذه الأماكن موجودة في <a href="' . Url::fromRoute('entity.taxonomy_vocabulary.overview_form', ['taxonomy_vocabulary' => 'mutah_scope'])->toString() . '">الجهات</a>.</p></div>'],
      'cards' => ['#type' => 'container', '#attributes' => ['class' => ['mutah-cards']]] + $cards,
      'recent' => [
        '#type' => 'container',
        '#attributes' => ['class' => ['mutah-recent']],
        'title' => ['#markup' => '<h2>آخر التعديلات</h2>'],
        'view' => views_embed_view('mutah_content_admin', 'block_recent') ?: [],
      ],
      '#cache' => ['tags' => ['node_list']],
    ];
  }

}
