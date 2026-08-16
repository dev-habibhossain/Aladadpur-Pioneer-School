import { useState } from 'react';
import { Bell, Calendar, Download, FileText, Search, Tag, AlertCircle } from 'lucide-react';

export default function Notices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allNotices = [
    {
      id: 'NOT-2026-001',
      title: 'Annual Sports Competition & Cultural Function 2026 Notice',
      date: '15 February 2026',
      category: 'Events',
      summary: 'All students from Class 1 to Class 10 are requested to register their names with the class teachers for sports events by 20th Feb.',
      important: true,
    },
    {
      id: 'NOT-2026-002',
      title: 'First Term Examination Routine & Syllabus Published for Session 2026',
      date: '10 February 2026',
      category: 'Exams',
      summary: 'The First Term Examination for Class Play to Class 10 will commence from March 10, 2026. Download the routine below.',
      important: true,
    },
    {
      id: 'NOT-2026-003',
      title: 'International Mother Language Day Holiday Announcement (21st February)',
      date: '08 February 2026',
      category: 'Holiday',
      summary: 'The school will remain closed on Saturday, 21st February on the occasion of Shaheed Dibash & International Mother Language Day.',
      important: false,
    },
    {
      id: 'NOT-2026-004',
      title: 'Monthly Tuition Fee Payment Reminder for February 2026',
      date: '02 February 2026',
      category: 'Fees',
      summary: 'Parents are requested to clear monthly tuition fees through the Parent Portal before the 15th of February to avoid late charges.',
      important: false,
    },
    {
      id: 'NOT-2026-005',
      title: 'Special Extra Classes for Class 10 Board Examinees (SSC Batch 2026)',
      date: '25 January 2026',
      category: 'Academic',
      summary: 'Extra guidance classes for Mathematics and Physics will take place every Friday from 9:00 AM to 11:30 AM in Room 302.',
      important: false,
    },
  ];

  const categories = ['All', 'Academic', 'Exams', 'Events', 'Holiday', 'Fees'];

  const filteredNotices = allNotices.filter((notice) => {
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-10">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Bell className="w-4 h-4 text-purple-300" />
            <span>Official Notice Board</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            School Announcements & Notices
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Stay updated with the latest exam routines, holiday circulars, academic notices, and institutional events for Aladadpur Pioneer School.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="dashboard-card p-6 border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => (
            <div
              key={notice.id}
              className={`dashboard-card p-6 border transition-all ${
                notice.important
                  ? 'border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/20'
                  : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-extrabold flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {notice.category}
                  </span>
                  {notice.important && (
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-[10px] font-extrabold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Urgent
                    </span>
                  )}
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {notice.date}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">{notice.id}</span>
              </div>

              <div className="pt-3 space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {notice.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {notice.summary}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => alert(`Downloading Notice Circular: ${notice.title}`)}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" /> Download Circular PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="dashboard-card p-12 text-center text-slate-500 dark:text-slate-400 font-semibold">
            No notices found matching your search filter.
          </div>
        )}
      </div>
    </div>
  );
}
