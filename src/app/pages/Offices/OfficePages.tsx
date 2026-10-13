import React from 'react';
import {CenterLayout} from '../Centers/CenterLayout';
import {OfficialCenterContent} from '../Centers/OfficialCenterContent';
import DATA from './OfficesData';
function Office({office}:any){const cfg=DATA[office];return <CenterLayout key={office} centerName={cfg.name} links={cfg.links} heroImage={cfg.hero||""} heroVariant="photo" heroDescription={cfg.description}>{(tab)=><OfficialCenterContent key={tab} config={cfg} tab={tab} links={cfg.links}/>}</CenterLayout>;}
export function EngineeringOffice(){return <Office office="engineering-office"/>;}
export function EngineeringWorkshops(){return <Office office="engineering-workshops"/>;}
export function InvestmentFund(){return <Office office="investment-fund"/>;}
export function HousingFund(){return <Office office="housing-fund"/>;}
export function InternationalRelations(){return <Office office="international-relations"/>;}
export function EmployeesClub(){return <Office office="employees-club"/>;}
export function CentralTenders(){return <Office office="tenders"/>;}
export function Legislation(){return <Office office="legislation"/>;}
export function AdmissionPrograms(){return <Office office="admission-programs"/>;}
export function StudentServices(){return <Office office="student-services"/>;}
export function StaffServices(){return <Office office="staff-services"/>;}
export function UniversityEvents(){return <Office office="events"/>;}
export function Faculties(){return <Office office="faculties"/>;}
export function AdminServices(){return <Office office="admin-services"/>;}