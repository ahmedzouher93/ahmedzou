# موقع جامعة مؤتة على دروبال (Drupal 11)

هذه الحزمة مشروع دروبال كامل وجاهز للرفع، وفيها:

| المسار | المحتوى |
|---|---|
| `web/` | جذر الموقع (Document Root): نواة دروبال 11.4.9 وملفات التشغيل |
| `web/themes/custom/mutah_theme/` | قالب **Mutah University** الذي يعرض موقع الجامعة كاملاً |
| `vendor/` | مكتبات PHP التي يحتاجها دروبال، مع أداة Drush |
| `composer.json` و `composer.lock` | تعريف المشروع لتحديثه لاحقاً عبر Composer |

## المتطلبات على الخادم

- PHP 8.3 أو أحدث، مع الإضافات: `pdo_mysql` (أو `pdo_pgsql`)، `gd`، `mbstring`، `xml`، `curl`، `zip`، `opcache`.
- قاعدة بيانات: MySQL 8.0 أو MariaDB 10.6 أو PostgreSQL 16 (أو أحدث).
- خادم ويب Apache (مع `mod_rewrite`) أو Nginx.

## خطوات الرفع والتثبيت

1. **ارفع المجلد كاملاً** (`mutah-drupal`) إلى الخادم، مثلاً إلى `/var/www/mutah-drupal`.
2. **اجعل جذر الموقع (Document Root) هو المجلد `web`**، وليس المجلد الرئيسي.
   - في الاستضافات المشتركة (cPanel): اجعل النطاق يشير إلى `mutah-drupal/web`.
3. **أنشئ قاعدة بيانات فارغة** ومستخدماً لها بكامل الصلاحيات.
4. **جهّز مجلد الملفات وملف الإعدادات:**
   ```bash
   cd /var/www/mutah-drupal/web/sites/default
   mkdir files && chmod 775 files
   cp default.settings.php settings.php && chmod 664 settings.php
   ```
5. **افتح الموقع في المتصفح** (مثلاً `https://your-domain/`) وسيبدأ معالج التثبيت:
   - اختر اللغة، ثم ملف التثبيت **Standard**.
   - أدخل بيانات قاعدة البيانات.
   - أنشئ حساب المدير باسم مستخدم وكلمة مرور قوية.
6. **فعّل قالب الجامعة واجعله الافتراضي:**
   - من لوحة التحكم: **Appearance** ← **Mutah University** ← **Install and set as default**.
   - أو من سطر الأوامر:
     ```bash
     cd /var/www/mutah-drupal
     vendor/bin/drush theme:enable mutah_theme -y
     vendor/bin/drush config:set system.theme default mutah_theme -y
     vendor/bin/drush cr
     ```
7. **بعد التثبيت أمّن ملف الإعدادات:**
   ```bash
   chmod 444 web/sites/default/settings.php
   ```
   وأضف نطاق موقعك إلى `trusted_host_patterns` داخل `settings.php`، مثلاً:
   ```php
   $settings['trusted_host_patterns'] = ['^www\.mutah\.edu\.jo$', '^mutah\.edu\.jo$'];
   ```

> بديل سريع عبر سطر الأوامر بدل المعالج (الخطوة 5):
> ```bash
> vendor/bin/drush site:install standard --db-url=mysql://USER:PASS@localhost/DBNAME --site-name="جامعة مؤتة" --account-name=admin -y
> ```

## كيف يعمل الموقع داخل دروبال

- واجهة الموقع كلها (الصفحات والتصميم والخطوط والصور المضمّنة) موجودة في `web/themes/custom/mutah_theme/dist/`.
- التنقّل بين صفحات الموقع يتم داخل الصفحة الرئيسية، وتظهر الروابط بهذا الشكل:
  `https://your-domain/#/about/presidency`، `https://your-domain/#/faculty/pharmacy`.
- صفحات دروبال الخاصة بالحسابات تبقى تعمل بشكلها الطبيعي: تسجيل الدخول `/user/login` واستعادة كلمة المرور.
- لوحة التحكم `/admin` تعمل بقالب الإدارة **Claro**.
- أدوات الوصول (حجم الخط، تباعد الأسطر، التباين العالي، النطق) تعمل من أعلى الموقع، وتُحفظ إعدادات كل زائر في متصفحه.

## تحديث محتوى أو تصميم الموقع لاحقاً

محتوى الموقع مبني داخل ملفات القالب. لتعديله:

1. عدّل المشروع المصدري (مستودع React) وشغّل:
   ```bash
   npm install
   npm run build:drupal
   ```
2. انسخ المجلد الناتج `drupal/mutah_theme/dist/` فوق `web/themes/custom/mutah_theme/dist/` على الخادم.
3. امسح الكاش: `vendor/bin/drush cr` (أو من **Configuration ← Performance ← Clear all caches**).

## تحديث دروبال نفسه

```bash
composer update "drupal/core-*" --with-all-dependencies
vendor/bin/drush updatedb -y
vendor/bin/drush cr
```

## ملاحظات

- الصور الخارجية (مثل صور الأخبار القادمة من `mutah.edu.jo`) تظهر فقط عند توفّر الإنترنت ووجودها على الخادم الأصلي.
- المرفقات في صفحات وصف المواد والخطط الدراسية ملفات توضيحية (DOCX و HTML)، وتُستبدل بالملفات الحقيقية عند توفرها.
- هذه الحزمة لا تحتوي أي قاعدة بيانات أو كلمات مرور؛ تُنشأ عند التثبيت على خادمك.
