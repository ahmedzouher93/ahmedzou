import { useTabRoute } from "../nav";
import React, { useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  Search, 
  Filter,
  GraduationCap,
  BookOpen,
  Info,
  AlertTriangle,
  ChevronLeft,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const EVENTS = [
  { id: 1, title: "بدء العام الجامعي وبدء دوام الهيئة التدريسية", date: "2025-09-28", type: 'start', semester: 'sem1' },
  { id: 2, title: "فترة السحب والإضافة", date: "2025-09-28", endDate: "2025-09-30", type: 'academic', semester: 'sem1' },
  { id: 3, title: "بدء التدريس للفصل الأول", date: "2025-10-05", type: 'start', semester: 'sem1' },
  { id: 4, title: "آخر موعد لعقد امتحان غير المكتمل", date: "2025-10-09", type: 'deadline', semester: 'sem1' },
  { id: 5, title: "امتحانات منتصف الفصل", date: "2025-11-23", endDate: "2025-12-04", type: 'exam', semester: 'sem1' },
  { id: 6, title: "الامتحانات النهائية للفصل الأول", date: "2026-01-10", endDate: "2026-01-22", type: 'exam', semester: 'sem1' },
  { id: 7, title: "فترة السحب والإضافة لجميع الطلبة", date: "2026-02-15", endDate: "2026-02-17", type: 'academic', semester: 'sem2' },
  { id: 8, title: "بدء التدريس للفصل الثاني", date: "2026-02-22", type: 'start', semester: 'sem2' },
  { id: 9, title: "عيد الفطر السعيد / عطلة", date: "2026-03-20", type: 'holiday', semester: 'sem2' },
  { id: 10, title: "امتحانات منتصف الفصل", date: "2026-04-12", endDate: "2026-04-23", type: 'exam', semester: 'sem2' },
];

const TYPES = [
  { id: 'all', label: 'جميع المناسبات', color: 'bg-gray-100 text-gray-700' },
  { id: 'start', label: 'بداية فصل', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'academic', label: 'شؤون أكاديمية', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'exam', label: 'امتحانات', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'deadline', label: 'مواعيد نهائية', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'holiday', label: 'عطل رسمية', color: 'bg-orange-100 text-orange-700 border-orange-200' },
];

const SEMESTERS = [
  { id: 'sem1', label: 'الفصل الدراسي الأول' },
  { id: 'sem2', label: 'الفصل الدراسي الثاني' },
  { id: 'sem3', label: 'الفصل الصيفي' },
];

export function CalendarPage() {
  const [activeYear, setActiveYear] = useState('current');
  const [activeType, setActiveType] = useState('all');
  const [activeSemester, setActiveSemester] = useTabRoute('sem1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const filteredEvents = EVENTS.filter(event => {
    // Add dummy year filtering logic
    const matchYear = 
      activeYear === 'current' ? true : // show all for now, or filter by '2025'/'2026'
      activeYear === 'previous' ? event.date.includes('2024') :
      activeYear === '2024/2025' ? event.date.includes('2024') || event.date.includes('2025-01') || event.date.includes('2025-02') || event.date.includes('2025-03') || event.date.includes('2025-04') || event.date.includes('2025-05') || event.date.includes('2025-06') || event.date.includes('2025-07') || event.date.includes('2025-08') : true;

    const matchType = activeType === 'all' || event.type === activeType;
    const matchSem = event.semester === activeSemester;
    const matchSearch = event.title.includes(searchQuery);
    return matchYear && matchType && matchSem && matchSearch;
  });

  const getIcon = (type: string) => {
    switch(type) {
      case 'start': return <BookOpen size={20} className="text-green-600" />;
      case 'academic': return <GraduationCap size={20} className="text-blue-600" />;
      case 'exam': return <BookOpen size={20} className="text-purple-600" />;
      case 'deadline': return <AlertTriangle size={20} className="text-red-600" />;
      case 'holiday': return <Info size={20} className="text-orange-600" />;
      default: return <CalendarIcon size={20} className="text-gray-600" />;
    }
  };

  const getColorClass = (type: string) => {
    const t = TYPES.find(x => x.id === type);
    return t ? t.color : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
  };

  const getDay = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('ar-EG', { day: '2-digit' }).format(d);
  };
  
  const getMonth = (dateStr: string) => {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('ar-EG', { month: 'short' }).format(d);
  };

  const getEventForDate = (date: Date) => {
    return filteredEvents.find(e => {
      const eDate = new Date(e.date);
      return eDate.getFullYear() === date.getFullYear() && 
             eDate.getMonth() === date.getMonth() && 
             eDate.getDate() === date.getDate();
    });
  };

  const getDotColor = (type: string) => {
    switch(type) {
      case 'start': return 'bg-green-600';
      case 'academic': return 'bg-blue-600';
      case 'exam': return 'bg-purple-600';
      case 'deadline': return 'bg-red-600';
      case 'holiday': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  const getMonthsForSemester = () => {
    if (activeSemester === 'sem1') {
      return [
        new Date(2025, 9, 1),
        new Date(2025, 10, 1),
        new Date(2025, 11, 1),
        new Date(2026, 0, 1),
      ];
    } else if (activeSemester === 'sem2') {
      return [
        new Date(2026, 1, 1),
        new Date(2026, 2, 1),
        new Date(2026, 3, 1),
        new Date(2026, 4, 1),
        new Date(2026, 5, 1),
      ];
    } else if (activeSemester === 'sem3') {
      return [
        new Date(2026, 6, 1),
        new Date(2026, 7, 1),
      ];
    }
    return Array.from({ length: 12 }).map((_, i) => new Date(2025, 8 + i, 1));
  };

  // Custom DayContent component to avoid inline function ref issues in react-day-picker
  const CustomDayContent = React.forwardRef<HTMLDivElement, any>(({ date, displayMonth, activeModifiers, ...props }, ref) => {
    const evt = getEventForDate(date);
    return (
      <div ref={ref} className="relative w-full h-full flex items-center justify-center" {...props}>
        <span>{date.getDate()}</span>
        {evt && (
          <div className={`absolute bottom-0.5 w-1 h-1 rounded-full ${getDotColor(evt.type)}`} />
        )}
      </div>
    );
  });
  CustomDayContent.displayName = "CustomDayContent";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Noto_Kufi_Arabic'] flex flex-col" dir="rtl">
      
      {/* Hero Section */}
      <div className="bg-[#0f3057] relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a227] rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <CalendarIcon size={16} className="text-[#c9a227]" />
            العام الجامعي 2025/2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            التقويم <span className="text-[#c9a227]">الجامعي</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            تعرف على أهم التواريخ، والمواعيد النهائية، والفعاليات الأكاديمية لضمان مسيرة جامعية منظمة وناجحة.
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full -mt-8 relative z-20 mb-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
          
          <div className="flex bg-gray-50 p-1.5 rounded-xl w-full lg:w-auto">
            {SEMESTERS.map(sem => (
              <button
                key={sem.id}
                onClick={() => setActiveSemester(sem.id)}
                className={`flex-1 lg:flex-none px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeSemester === sem.id 
                    ? 'bg-white text-[#0f3057] shadow-sm ring-1 ring-black/5' 
                    : 'text-gray-500 hover:text-[#0f3057]'
                }`}
              >
                {sem.label}
              </button>
            ))}
          </div>

          <div className="flex w-full lg:w-auto gap-4">
            <div className="relative">
              <select 
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl py-3 pr-4 pl-10 text-sm font-bold text-[#0f3057] focus:ring-2 focus:ring-[#c9a227]/50 focus:bg-white transition-all outline-none appearance-none"
              >
                <option value="current">السنة الحالية</option>
                <option value="previous">السنة السابقة</option>
                <option value="2024/2025">2024/2025</option>
              </select>
              <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text"
                placeholder="ابحث عن مناسبة..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-xl py-3 pr-12 pl-4 text-sm focus:ring-2 focus:ring-[#c9a227]/50 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Calendars Section */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full mb-10">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-[#0f3057] flex items-center gap-2">
              <CalendarIcon size={20} className="text-[#c9a227]" />
              الرزنامة السنوية
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" dir="ltr">
            {getMonthsForSemester().map((monthDate, i) => {
              return (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden bg-white w-full shadow-[0_4px_20px_rgba(15,48,87,0.04)] hover:shadow-[0_8px_30px_rgba(15,48,87,0.08)] transition-all">
                  <div className="bg-[#0f3057] text-white py-2.5 text-center font-bold text-sm" dir="rtl">
                    {new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' }).format(monthDate)}
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    month={monthDate}
                    disableNavigation
                    showOutsideDays={false}
                    className="border-0 w-full flex justify-center p-3 bg-white"
                    classNames={{
                      head_cell: "text-gray-500 font-medium text-[0.7rem] w-8 pb-1",
                      cell: "text-center text-xs p-0.5 relative [&:has([aria-selected])]:bg-transparent",
                      day: "size-8 p-0 font-normal hover:bg-gray-50 rounded-lg transition-colors text-xs",
                      day_selected: "bg-[#0f3057] text-white hover:bg-[#0f3057] hover:text-white focus:bg-[#0f3057] focus:text-white",
                    }}
                    modifiers={{
                      event: filteredEvents.map(e => new Date(e.date))
                    }}
                    modifiersClassNames={{
                      event: "font-bold text-[#0f3057] bg-[#c9a227]/20 rounded-full"
                    }}
                    components={{
                      DayContent: CustomDayContent
                    }}
                  />
                  {selectedDate && selectedDate.getMonth() === monthDate.getMonth() && selectedDate.getFullYear() === monthDate.getFullYear() && getEventForDate(selectedDate) && (
                    <div className="bg-[#0f3057]/5 p-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getColorClass(getEventForDate(selectedDate)!.type).split(' ')[0]} ${getColorClass(getEventForDate(selectedDate)!.type).split(' ')[1]}`}>
                          {getIcon(getEventForDate(selectedDate)!.type)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0f3057] text-sm mb-1 leading-tight">{getEventForDate(selectedDate)?.title}</h4>
                          <span className="text-xs font-bold text-[#c9a227]">{TYPES.find(t => t.id === getEventForDate(selectedDate)?.type)?.label}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full flex-1 flex flex-col lg:flex-row gap-10 mb-20">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-lg text-[#0f3057] mb-6 flex items-center gap-2">
              <Filter size={20} className="text-[#c9a227]" />
              تصنيف المناسبات
            </h3>
            <div className="flex flex-col gap-3">
              {TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all border text-right ${
                    activeType === type.id 
                      ? 'bg-[#0f3057] text-white border-[#0f3057]' 
                      : 'bg-white border-gray-100 text-gray-600 hover:border-[#c9a227] hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${type.color.split(' ')[0]}`}></span>
                  <span className="font-medium text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex-1">
          {filteredEvents.length > 0 ? (
            <div className="relative border-r-2 border-gray-200/60 pr-8 md:pr-12 py-4 space-y-10">
              {filteredEvents.map((event, i) => (
                <div key={event.id} id={`event-${event.id}`} className="relative animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute -right-[43px] md:-right-[59px] top-4 w-5 h-5 rounded-full border-4 border-[#F8FAFC] shadow-sm z-10" style={{ backgroundColor: '#0f3057' }}></div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#c9a227]/40 transition-all group flex flex-col md:flex-row gap-6 items-start">
                    
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center min-w-[90px] bg-gray-50 rounded-xl p-4 border border-gray-100 group-hover:bg-[#0f3057] transition-colors shrink-0">
                      <span className="text-3xl font-extrabold text-[#0f3057] group-hover:text-white leading-none mb-1">
                        {getDay(event.date)}
                      </span>
                      <span className="text-sm font-bold text-gray-500 group-hover:text-[#c9a227]">
                        {getMonth(event.date)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getColorClass(event.type)}`}>
                          {TYPES.find(t => t.id === event.type)?.label}
                        </span>
                        {event.endDate && (
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                            <Clock size={12} />
                            إلى {formatDate(event.endDate)}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-[#0f3057] mb-2 leading-relaxed group-hover:text-[#c9a227] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        هذه المناسبة تخص {SEMESTERS.find(s => s.id === event.semester)?.label}
                      </p>
                    </div>

                    {/* Icon Decorative */}
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-gray-50 items-center justify-center shrink-0 opacity-50 group-hover:opacity-100 transition-opacity group-hover:scale-110">
                      {getIcon(event.type)}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <CalendarIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-[#0f3057] mb-2">لا توجد مناسبات</h3>
              <p className="text-gray-500 text-sm">حاول تغيير خيارات البحث أو التصفية.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
