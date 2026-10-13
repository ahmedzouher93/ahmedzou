import { OfficialCenterContent } from './OfficialCenterContent';
import React from 'react';
import { CenterLayout, CenterLink } from './CenterLayout';
import { Home, Info, Phone, Activity, FileText, Briefcase } from 'lucide-react';

const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { 
    id: 'about', 
    name: 'عن المركز', 
    icon: Info,
    children: [
      { id: 'about-brief', name: 'نبذة عن المركز' },
      { id: 'about-director', name: 'كلمة المدير' },
      { id: 'about-council', name: 'مجلس المركز' },
      { id: 'about-staff', name: 'موظفو المركز' },
      { id: 'about-former', name: 'مدراء المركز السابقون' },
      { id: 'about-labs', name: 'مختبرات مجال البحث' },
      { id: 'about-proposals', name: 'دعوة لتقديم مقترحات' }
    ]
  },
  {
    id: 'activities',
    name: 'الأنشطة والبحوث',
    icon: Activity,
    children: [
      { id: 'act-in-progress', name: 'بحوث قيد الدراسة' },
      { id: 'act-published', name: 'البحوث المنشورة' },
      { id: 'act-energy', name: 'برنامج الحفاظ على الطاقة' },
      { id: 'act-water', name: 'برامج الحفاظ على المياه' },
      { id: 'act-recycling', name: 'أنشطة إعادة التدوير' },
      { id: 'act-affiliates', name: 'التابعون' }
    ]
  },
  { id: 'news', name: 'الأخبار', icon: FileText },
  { id: 'services', name: 'خدمات', icon: Briefcase },
  { id: 'contact', name: 'اتصل بنا', icon: Phone },
];

LINKS.push({"id": "gallery", "name": "معرض الصور"});
LINKS.push({"id": "announcements", "name": "الإعلانات"});

export function PrinceFaisalCenter(){return <CenterLayout centerName="مركز الأمير فيصل لدراسات البحر الميت" links={LINKS} heroVariant="photo" heroDescription="بحوث البحر الميت والمياه والبيئة والطاقة، والتعاون العلمي وخدمة المجتمع." heroImage={(window as any).__ASSETS["official-hero-pfc"]}>{(activeItem)=><OfficialCenterContent key={activeItem} center="pfc" tab={activeItem} links={LINKS}/>}</CenterLayout>;}
