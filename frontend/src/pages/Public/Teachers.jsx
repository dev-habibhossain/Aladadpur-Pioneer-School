import { useState, useEffect } from 'react';
import { Mail, GraduationCap, UserCheck, BookOpen, Loader2, Search, Award } from 'lucide-react';
import { fetchPublicTeachers } from '../../services/publicService';

export default function Teachers() {
  const [activeDept, setActiveDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeachers = async () => {
      setLoading(true);
      const data = await fetchPublicTeachers();
      if (data && data.length > 0) {
        setTeachers(data);
      } else {
        // Fallback default teachers if backend unavailable
        setTeachers([
          {
            name: 'Md. Rafiqul Islam',
            designation: 'Headmaster & Principal',
            department: 'Administration',
            qualifications: 'M.Sc in Physics, M.Ed (DU)',
            experience: '18 Years Experience',
            email: 'headmaster@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
          },
          {
            name: 'Nusrat Jahan',
            designation: 'Assistant Headmaster (Academic)',
            department: 'English',
            qualifications: 'M.A in English Literature (CU), B.Ed',
            experience: '14 Years Experience',
            email: 'nusrat.jahan@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
          },
          {
            name: 'Engr. Tanvir Ahmed',
            designation: 'Senior ICT & Computer Teacher',
            department: 'ICT & Science',
            qualifications: 'B.Sc in Computer Science (SUST)',
            experience: '8 Years Experience',
            email: 'tanvir.ict@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
          },
          {
            name: 'Dr. Shahinur Rahman',
            designation: 'Senior Science Faculty (Chemistry)',
            department: 'ICT & Science',
            qualifications: 'M.Sc in Applied Chemistry (RU)',
            experience: '11 Years Experience',
            email: 'shahinur.chem@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
          },
          {
            name: 'Fatema Khatun',
            designation: 'Senior Mathematics Teacher',
            department: 'Mathematics',
            qualifications: 'M.Sc in Mathematics (DU)',
            experience: '10 Years Experience',
            email: 'fatema.math@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
          },
          {
            name: 'Anisur Rahman',
            designation: 'Senior Social Studies & History Faculty',
            department: 'Humanities',
            qualifications: 'M.A in International Relations (DU)',
            experience: '12 Years Experience',
            email: 'anisur.history@aladadpurpioneer.edu.bd',
            avatar: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
          },
        ]);
      }
      setLoading(false);
    };

    loadTeachers();
  }, []);

  const departments = ['All', 'Administration', 'ICT & Science', 'Mathematics', 'English', 'Humanities'];

  const filteredTeachers = teachers.filter((t) => {
    const matchesDept = activeDept === 'All' || t.department === activeDept;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.designation && t.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (t.qualifications && t.qualifications.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-10">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <UserCheck className="w-4 h-4 text-purple-300" />
            <span>Qualified & Experienced Faculty</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Our Respected Teachers & Staff
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Meet the dedicated educators at Aladadpur Pioneer School who guide, inspire, and empower students to reach their full potential.
          </p>
        </div>
      </div>

      {/* Controls: Search Bar & Department Filter Tabs */}
      <div className="dashboard-card p-6 border border-slate-100 dark:border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeDept === dept
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="dashboard-card p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
          <span className="text-xs font-bold">Loading faculty members from database...</span>
        </div>
      ) : (
        /* Faculty Cards Grid */
        <div className="space-y-6">
          {filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredTeachers.map((teacher, idx) => (
                <div
                  key={idx}
                  className="dashboard-card p-6 border border-slate-100 dark:border-slate-800 space-y-4 flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-800/60 transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={teacher.avatar?.url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={teacher.name}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100 dark:ring-purple-900 shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-bold text-slate-800 dark:text-white">{teacher.name}</h3>
                        <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mt-0.5">{teacher.designation || 'Faculty Member'}</p>
                        <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold">
                          {teacher.department || 'General'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                        <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span>{teacher.qualifications || 'Graduate Degree'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Award className="w-4 h-4 text-sky-500 shrink-0" />
                        <span>{teacher.experience || 'Experienced Educator'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px] truncate max-w-[190px]">{teacher.email}</span>
                    <a
                      href={`mailto:${teacher.email}`}
                      className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-all shrink-0"
                      title="Send Direct Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="dashboard-card p-12 text-center text-slate-500 dark:text-slate-400 font-semibold">
              No faculty members found matching your search term.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
