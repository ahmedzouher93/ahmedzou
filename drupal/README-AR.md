# موقع جامعة مؤتة على دروبال (Drupal 11)

هذه الحزمة مشروع دروبال كامل وجاهز للرفع، وفيها:

| المسار | المحتوى |
|---|---|
| `web/` | جذر الموقع (Document Root): نواة دروبال 11.4.9 وملفات التشغيل |
| `web/themes/custom/mutah_theme/` | قالب **Mutah University** الذي يعرض موقع الجامعة كاملاً |
| `web/modules/custom/mutah_content/` | وحدة **Mutah University content**: أنواع المحتوى والحقول والـ Views ولوحة «محتوى الجامعة»، مع محتوى الموقع الحالي |
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
7. **فعّل وحدة محتوى الجامعة** (تُنشئ أنواع المحتوى وتنقل كل محتوى الموقع الحالي إلى دروبال):
   - من لوحة التحكم: **Extend** ← ابحث عن **Mutah University content** ← **Install**.
   - أو: `vendor/bin/drush pm:install mutah_content -y`
8. **بعد التثبيت أمّن ملف الإعدادات:**
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

## إدارة المحتوى من داخل دروبال

بعد تفعيل الوحدة يظهر في قائمة الإدارة رابط **محتوى الجامعة** (`/admin/mutah`):

| نوع المحتوى | ما يديره |
|---|---|
| **خبر** / **إعلان** / **فعالية** | أخبار وإعلانات وفعاليات الصفحة الرئيسية والكليات والأقسام والعمادات والوحدات والمراكز. الحقل **«يظهر في»** يحدد القائمة (أو القوائم) التي يظهر فيها. |
| **عضو هيئة تدريس** | صفحات «مواقع أعضاء هيئة التدريس»: البيانات والاتصال والأبحاث والمواد والكتب والإشراف والإنجازات والملفات والروابط. |
| **عضو مجلس** | رئيس الجامعة (مع الكلمة ومعلومات الاتصال) ونواب الرئيس ومجلس الأمناء ومجلس الجامعة ومجلس العمداء، مع الصور والترتيب. |
| **ملف مرفق** | ملفات «المرفقات» تحت وصف المواد والخطط الدراسية. عنوان المرفق = الاسم الظاهر في الموقع؛ ارفع نسخة DOCX و HTML فيصبح الملف قابلاً للتحميل. |

- **الجهات** (`/admin/structure/taxonomy/manage/mutah_scope/overview`): قائمة بكل مكان في الموقع تظهر فيه أخبار (102 جهة). لا تغيّر حقل «مفتاح الجهة».
- **كل المحتوى** (`/admin/content/mutah`): جدول بحث وتصفية حسب النوع والجهة والعنوان والحالة.
- **Block «محتوى الجامعة: آخر التعديلات»**: يمكن وضعه في أي منطقة من **Structure ← Block layout**.
- **Views الخاصة بالموقع** (وسم `mutah`): `api/mutah/news`، `api/mutah/people`، `api/mutah/documents`، `api/mutah/scopes`، وهي التي يقرأ منها القالب المحتوى. لا تحذفها.
- **الترتيب**: الحقل «الترتيب» (الأصغر أولاً). المحتوى الجديد بدون ترتيب يظهر في أول القائمة.
- إلغاء نشر أي عنصر (Published) يخفيه من الموقع فوراً.

## تحديث تصميم الموقع لاحقاً

التصميم والصفحات الثابتة مبنية داخل ملفات القالب. لتعديلها:

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
- المرفقات التي لم تُرفع لها ملفات بعد تظهر كملفات توضيحية (لا تفتح)، وتصبح قابلة للتحميل بمجرد رفع الملفات في «ملف مرفق».
- هذه الحزمة لا تحتوي أي قاعدة بيانات أو كلمات مرور؛ تُنشأ عند التثبيت على خادمك.
