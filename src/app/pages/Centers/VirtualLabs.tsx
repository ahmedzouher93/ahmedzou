import { OfficialCenterContent } from './OfficialCenterContent';
import React from 'react';
import { CenterLayout, CenterLink } from './CenterLayout';
import { Home, Beaker, FlaskConical, Stethoscope, Factory, Sprout } from 'lucide-react';

const LINKS: CenterLink[] = [
  { id: 'home', name: 'الرئيسية', icon: Home },
  { id: 'science', name: 'الأجهزة الرئيسية في كلية العلوم', icon: FlaskConical },
  { id: 'agriculture', name: 'الأجهزة الرئيسية في كلية الزراعة', icon: Sprout },
  { id: 'pharmacy', name: 'الأجهزة الرئيسية في كلية الصيدلة', icon: Beaker },
  { id: 'engineering', name: 'الأجهزة الرئيسية في كلية الهندسة', icon: Factory },
  { id: 'medicine', name: 'الأجهزة الرئيسية في كلية الطب', icon: Stethoscope },
];


export function VirtualLabs(){return <CenterLayout centerName="المختبرات المركزية الافتراضية" links={LINKS} heroVariant="photo" heroDescription="أدلة الأجهزة العلمية الرئيسية في كليات العلوم والزراعة والصيدلة والهندسة والطب." heroImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=2000&q=80">{(activeItem)=><OfficialCenterContent key={activeItem} center="labs" tab={activeItem} links={LINKS}/>}</CenterLayout>;}
