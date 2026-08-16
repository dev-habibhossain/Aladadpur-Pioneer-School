import { useState, useEffect } from 'react';
import { BookOpen, Award, FileText, CheckCircle, Download } from 'lucide-react';
import { Link } from 'react-router';
import { fetchPublicInfo } from '../../services/publicService';

export default function Academics() {
  const [publicData, setPublicData] = useState(null);

  useEffect(() => {
    const loadInfo = async () => {
      const data = await fetchPublicInfo();
      if (data) {
        setPublicData(data);
      }
    };
    loadInfo();
  }, []);

  const classes = [
    {
      level: 'Pre-Primary Section',
      classes: 'Play, Nursery & KG',
      curriculum: 'NCTB & Activity-Based',
      details: 'Focuses on phonics, motor skills, social behavior, storytelling, and basic numeracy.',
      tagColor: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
    },
    {
      level: 'Primary Section',
      classes: 'Class 1 to Class 5',
      curriculum: 'NCTB Curriculum',
      details: 'Bangla, English, Mathematics, General Science, Bangladesh & Global Studies, Religion, and Art.',
      tagColor: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300',
    },
    {
      level: 'Junior Secondary',
      classes: 'Class 6 to Class 8',
      curriculum: 'NCTB New Curriculum Framework',
      details: 'Project-based learning, ICT labs, Science practicals, Mathematics, English Communication, and Values.',
      tagColor: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300',
    },
    {
      level: 'Secondary (SSC Level)',
      classes: 'Class 9 & Class 10',
      curriculum: 'Science & Business Studies Group',
      details: 'Rigorous SSC Board preparation with Physics, Chemistry, Higher Math, Biology, Accounting, and Business Org.',
      tagColor: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300',
    },
  ];

  const routines = [
    { name: `Class 1-5 Daily Class Routine ${publicData?.session || '2026'}`, size: '1.2 MB', type: 'PDF' },
    { name: `Class 6-8 Project Assessment Syllabus ${publicData?.session || '2026'}`, size: '2.4 MB', type: 'PDF' },
    { name: `Class 9-10 SSC Model Exam Schedule ${publicData?.session || '2026'}`, size: '850 KB', type: 'PDF' },
    { name: `Annual Academic Calendar ${publicData?.session || '2026'}`, size: '3.1 MB', type: 'PDF' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-12">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <BookOpen className="w-4 h-4 text-purple-300" />
            <span>NCTB Curriculum & Modern Standards</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Academic Excellence & Curriculum
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Discover {publicData?.schoolName || 'Aladadpur Pioneer School'}'s comprehensive educational structure from Nursery to SSC Level, designed to foster deep understanding, analytical thinking, and board exam success.
          </p>
        </div>
      </div>

      {/* Class Levels Breakdown */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 dark:text-white">Education Levels & Streams</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Structured learning stages for holistic student development
            </p>
          </div>
          <Link
            to="/admission"
            className="px-6 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-full hover:bg-purple-700 transition-all self-start md:self-auto"
          >
            Apply for Class Seat
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {classes.map((cls, idx) => (
            <div key={idx} className="dashboard-card p-7 border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${cls.tagColor}`}>
                  {cls.level}
                </span>
                <span className="text-xs font-bold text-slate-400">{cls.curriculum}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">{cls.classes}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {cls.details}
              </p>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-purple-600 dark:text-purple-400">
                <span>NCTB Approved</span>
                <span>Term & Model Exams Included</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examination & Assessment System */}
      <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Examination & Continuous Evaluation</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Ensuring steady progress without exam fear</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Monthly Class Tests (CT)</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Regular short tests conducted every month to track topic mastery and address learning gaps immediately.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Term Final Examinations</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Half-Yearly and Annual examinations evaluated according to national board marking guidelines.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">SSC Pre-Test & Test Exams</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Special model test series for Class 10 examinees before sitting for the Board Final Examinations.</p>
          </div>
        </div>
      </div>

      {/* Syllabus & Routine Downloads */}
      <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Academic Resources & Routines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routines.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.name}</h4>
                  <p className="text-xs text-slate-400">{item.size} • {item.type}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`Downloading ${item.name}`)}
                className="px-3.5 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold hover:bg-purple-100 dark:hover:bg-purple-900 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
