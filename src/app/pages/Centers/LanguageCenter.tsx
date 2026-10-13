import { OfficialCenterContent } from './OfficialCenterContent';
import React from 'react';
import { CenterLayout, CenterLink } from './CenterLayout';
import { Home, Info, Phone, Users, Award, Calendar, CheckCircle, Globe, BookOpen, MessageSquare, FileText } from 'lucide-react';

const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { 
    id: 'about', 
    name: 'عن المركز', 
    icon: Info,
    children: [
      { id: 'about-brief', name: 'نبذة عن المركز' },
      { id: 'about-director', name: 'كلمة مدير المركز' },
      { id: 'about-vision', name: 'الرؤية' },
      { id: 'about-message', name: 'الرسالة' },
      { id: 'about-strategy', name: 'الخطة الاستراتيجية' },
      { id: 'about-former', name: 'مدراء المركز' },
      { id: 'about-office', name: 'مكتب المدير' },
      { id: 'about-council', name: 'مجلس المركز' },
      { id: 'about-staff', name: 'موظفو المركز' }
    ]
  },
  {
    id: 'departments',
    name: 'الشعب',
    icon: Users,
    children: [
      { id: 'dept-arabic', name: 'شعبة اللغة العربية' },
      { id: 'dept-english', name: 'شعبة اللغة الانجليزية' },
      { id: 'dept-non-native', name: 'العربية لغير الناطقين بها' }
    ]
  },
  { id: 'achievements', name: 'الإنجازات', icon: Award },
  {
    id: 'activities',
    name: 'النشاطات',
    icon: Calendar,
    children: [
      { id: 'act-extracurricular', name: 'النشاطات اللامنهجية' },
      { id: 'act-academic', name: 'النشاطات الاكاديمية' }
    ]
  },
  {
    id: 'exams',
    name: 'الامتحانات',
    icon: CheckCircle,
    children: [
      { id: 'exams-equivalent', name: 'الامتحان المكافئ' },
      { id: 'exams-instructions', name: 'تعليمات الامتحان' },
      { id: 'exams-fees', name: 'رسوم الامتحان' },
      { id: 'exams-results', name: 'نتائج الامتحان' }
    ]
  },
  {
    id: 'arabic-non-native',
    name: 'اللغة العربية لغير الناطقين بها',
    icon: Globe,
    children: [
      { id: 'non-native-about', name: 'من نحن' },
      { id: 'non-native-levels', name: 'المستويات' },
      { id: 'non-native-reg', name: 'التسجيل والرسوم' },
      { id: 'non-native-agreements', name: 'الاتفاقيات' },
      { id: 'non-native-calendar', name: 'التقويم الدراسي وجدول الرحلات' }
    ]
  },
  {
    id: 'training',
    name: 'الدورات التدريبية',
    icon: BookOpen,
    children: [
      { id: 'training-general', name: 'الدورات التدريبية' },
      { id: 'training-language', name: 'دورات اللغة' }
    ]
  },
  { id: 'services', name: 'الخدمات اللغوية', icon: MessageSquare },
  { id: 'forms', name: 'النماذج', icon: FileText },
  { id: 'contact', name: 'إتصل بنا', icon: Phone },
];

LINKS.push({"id": "exams-branch", "name": "فرعي من الامتحان المكافئ"});
LINKS.push({"id": "exams-computer", "name": "الامتحانات المحوسبة"});
LINKS.push({"id": "exams-marks", "name": "علامات اجتياز الامتحان"});
LINKS.push({"id": "news", "name": "الأخبار والأحداث"});
LINKS.push({"id": "announcements", "name": "الإعلانات"});

export function LanguageCenter(){return <CenterLayout centerName="مركز اللغات" links={LINKS} heroVariant="photo" heroDescription="تنمية المهارات اللغوية للطلبة وتوفير برامج تعليمية للغات المتعددة لتعزيز التواصل الثقافي." heroImage={(window as any).__ASSETS["official-hero-lgc"]}>{(activeItem)=><OfficialCenterContent key={activeItem} center="lgc" tab={activeItem} links={LINKS}/>}</CenterLayout>;}
