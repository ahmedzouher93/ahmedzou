import { OfficialCenterContent } from './OfficialCenterContent';
import React from 'react';
import { CenterLayout, CenterLink } from './CenterLayout';
import { Home, Info, Phone, Building2, Stethoscope, Users } from 'lucide-react';

const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { 
    id: 'about', 
    name: 'عن المركز', 
    icon: Info,
    children: [
      { id: 'about-brief', name: 'نبذة عن المركز' },
      { id: 'about-director', name: 'كلمة مدير المركز' },
      { id: 'about-vision', name: 'الرؤية والرسالة والاهداف' }
    ]
  },
  {
    id: 'departments',
    name: 'أقسام المركز',
    icon: Building2,
    children: [
      { id: 'dept-diwan', name: 'الديوان' },
      { id: 'dept-lab', name: 'المختبر' },
      { id: 'dept-pharmacy', name: 'الصيدلية' },
      { id: 'dept-records', name: 'السجل الطبي' },
      { id: 'dept-warehouse', name: 'مخزن الادوية' },
      { id: 'dept-clinics', name: 'العيادات الطبية' },
      { id: 'dept-emergency', name: 'الطواريء' }
    ]
  },
  { id: 'committees', name: 'اللجان الطبية', icon: Stethoscope },
  { id: 'doctors', name: 'الاطباء', icon: Users },
  { id: 'contact', name: 'إتصل بنا', icon: Phone },
];

LINKS.push({"id": "news", "name": "الأخبار والأحداث"});
LINKS.push({"id": "announcements", "name": "الإعلانات"});

export function HealthCenter(){return <CenterLayout centerName="المركز الصحي" links={LINKS} heroVariant="photo" heroDescription="توفير رعاية صحية وطبية متكاملة وعالية الجودة للطلبة والعاملين في الجامعة." heroImage={(window as any).__ASSETS["official-hero-health"]}>{(activeItem)=><OfficialCenterContent key={activeItem} center="health" tab={activeItem} links={LINKS}/>}</CenterLayout>;}
