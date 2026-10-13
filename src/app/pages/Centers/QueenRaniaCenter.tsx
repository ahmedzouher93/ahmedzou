import { OfficialCenterContent } from './OfficialCenterContent';
import React from 'react';
import { CenterLayout, CenterLink } from './CenterLayout';
import { Home, Info, Phone, Calendar, Heart, FileText, BookOpen } from 'lucide-react';

const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { 
    id: 'about', 
    name: 'عن المركز', 
    icon: Info,
    children: [
      { id: 'about-brief', name: 'نبذة عن المركز' },
      { id: 'about-director', name: 'كلمة مدير المركز' },
      { id: 'about-staff', name: 'موظفو المركز' }
    ]
  },
  {
    id: 'programs',
    name: 'البرامج',
    icon: BookOpen,
    children: [
      { id: 'prog-seminars', name: 'برنامج الندوات' },
      { id: 'prog-workshops', name: 'برنامج الورشات والمحاضرات' },
      { id: 'prog-paid-courses', name: 'برنامج الدورات المدفوعة' },
      { id: 'prog-free-courses', name: 'برنامج الدورات المجانية' }
    ]
  },
  {
    id: 'community',
    name: 'التوعية المجتمعية',
    icon: Heart,
    children: [
      { id: 'comm-overview', name: 'نبذة عامة' },
      { id: 'comm-activities', name: 'الانشطة' }
    ]
  },
  { id: 'activities', name: 'النشاطات', icon: Calendar },
  { id: 'case-study', name: 'نموذج دراسة حالة', icon: FileText },
  { id: 'contact', name: 'إتصل بنا', icon: Phone },
];

LINKS.push({"id": "about-strategy", "name": "الخطة الاستراتيجية"});
LINKS.push({"id": "support", "name": "فريق الدعم النفسي"});
LINKS.push({"id": "gallery", "name": "معرض الصور"});
LINKS.push({"id": "news", "name": "الأخبار والأحداث"});
LINKS.push({"id": "announcements", "name": "الإعلانات"});

export function QueenRaniaCenter(){return <CenterLayout centerName="مركز الملكة رانيا العبدالله للدراسات التربوية والنفسية" links={LINKS} heroVariant="photo" heroDescription="مركز رائد في إجراء البحوث والدراسات التربوية والنفسية وتطوير استراتيجيات التعليم والتعلم." heroImage={(window as any).__ASSETS["official-hero-qrc"]}>{(activeItem)=><OfficialCenterContent key={activeItem} center="qrc" tab={activeItem} links={LINKS}/>}</CenterLayout>;}
