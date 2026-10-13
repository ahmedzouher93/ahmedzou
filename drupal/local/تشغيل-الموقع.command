#!/bin/bash
# تشغيل موقع جامعة مؤتة (دروبال) على هذا الجهاز.
# Runs the local Drupal copy of the Mutah University site with PHP's built-in server.

cd "$(dirname "$0")" || exit 1
ROOT="$(pwd)"

say() { printf '\n\033[1;34m%s\033[0m\n' "$1"; }
fail() { printf '\n\033[1;31m%s\033[0m\n' "$1"; echo; read -r -p "اضغط Enter للإغلاق..." _; exit 1; }

# PHP 8.3 or newer is required by Drupal 11
php_ok() { "$1" -r 'exit(version_compare(PHP_VERSION, "8.3.0", ">=") && extension_loaded("pdo_sqlite") && extension_loaded("gd") ? 0 : 1);' >/dev/null 2>&1; }

find_php() {
  for c in php /opt/homebrew/opt/php@8.4/bin/php /usr/local/opt/php@8.4/bin/php /opt/homebrew/bin/php /usr/local/bin/php /opt/homebrew/opt/php/bin/php /usr/local/opt/php/bin/php; do
    if command -v "$c" >/dev/null 2>&1 && php_ok "$c"; then command -v "$c"; return 0; fi
  done
  return 1
}

PHP="$(find_php)"

if [ -z "$PHP" ]; then
  say "الموقع يحتاج برنامج PHP، وهو غير موجود على جهازك."
  echo "سيتم تثبيته الآن مرة واحدة فقط (يحتاج إنترنت، وقد يطلب كلمة سر جهازك)."
  read -r -p "اضغط Enter للمتابعة، أو أغلق النافذة للإلغاء..." _

  if ! command -v brew >/dev/null 2>&1; then
    for b in /opt/homebrew/bin/brew /usr/local/bin/brew; do [ -x "$b" ] && eval "$("$b" shellenv)"; done
  fi
  if ! command -v brew >/dev/null 2>&1; then
    say "تثبيت Homebrew (مدير البرامج الرسمي لأجهزة الماك)..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)" || fail "تعذّر تثبيت Homebrew."
    for b in /opt/homebrew/bin/brew /usr/local/bin/brew; do [ -x "$b" ] && eval "$("$b" shellenv)"; done
  fi

  say "تثبيت PHP 8.4..."
  brew install php@8.4 || fail "تعذّر تثبيت PHP."
  PHP="$(find_php)"
  [ -n "$PHP" ] || fail "تم التثبيت لكن تعذّر العثور على PHP. أغلق النافذة وافتح الملف مرة أخرى."
fi

# First free port from 8080
PORT=8080
while lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do PORT=$((PORT + 1)); done
URL="http://127.0.0.1:$PORT/"

say "جارٍ تشغيل موقع جامعة مؤتة..."
echo "العنوان:  $URL"
echo "لوحة التحكم:  ${URL}user/login   (المستخدم: admin   كلمة السر: Mutah@2026)"
echo
echo "اترك هذه النافذة مفتوحة طوال استخدام الموقع. لإيقاف الموقع: اضغط Control + C أو أغلق النافذة."

( sleep 2; open "$URL" ) &
cd "$ROOT/web" || fail "مجلد web غير موجود."
exec "$PHP" -d memory_limit=512M -d max_execution_time=300 -S 127.0.0.1:"$PORT" .ht.router.php
