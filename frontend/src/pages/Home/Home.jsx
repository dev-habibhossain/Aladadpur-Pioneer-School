import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Award,
  ArrowRight,
  Lock,
  ShieldCheck,
  GraduationCap,
  UserCheck,
  Trophy,
  User,
  Users,
  BadgeDollarSign,
  Shield,
  Smartphone,
  Cpu,
  Smile,
  BookOpen,
  Layers,
  Star,
  Phone,
  HelpCircle,
} from 'lucide-react';
import { fetchPublicInfo } from '../../services/publicService';

export default function Home() {
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

  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Vision & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-[#F3E8FF] dark:bg-purple-950/50 dark:border dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-sm font-bold shadow-xs">
              <Award className="w-4.5 h-4.5 text-purple-600 dark:text-purple-400" />
              <span>Admissions Open for Session {publicData?.session || '2026-2027'}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-[1.15]">
              Nurturing Minds, Building Character &{' '}
              <span className="text-purple-600 dark:text-purple-400">Future Leaders</span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
              Welcome to {publicData?.schoolName || 'Aladadpur Pioneer School & Academy'}. We provide a world-class
              environment where academic excellence, moral values, modern technology, and personal
              growth come together to empower your child.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/admission"
                className="px-8 py-4 bg-purple-600 text-white text-base font-bold rounded-full shadow-lg shadow-purple-200 dark:shadow-purple-950/60 hover:bg-purple-700 transition-all flex items-center gap-3"
              >
                Apply for Admission <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-base font-bold rounded-full border border-slate-200 dark:border-slate-800 hover:border-purple-600 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center gap-2.5 shadow-xs"
              >
                <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Parent Portal Login
              </Link>
            </div>
          </div>

          {/* Right Column: Campus Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="dashboard-card p-7 border border-slate-100 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">Safe & Caring Environment</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">100% CCTV & Verified Staff</p>
                  </div>
                </div>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950/60"></span>
              </div>

              {/* Parent Information Points */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F5EEF8] dark:bg-slate-900/90 dark:border dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">SSC Board Pass Rate</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800 dark:text-white">
                    {publicData?.stats?.sscPassRate || '100%'}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#E0F2FE] dark:bg-slate-900/90 dark:border dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Student-Teacher Ratio</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800 dark:text-white">15 : 1</span>
                </div>

                <div className="p-4 rounded-xl bg-[#DCFCE7] dark:bg-slate-900/90 dark:border dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">STEM & Sports Clubs</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800 dark:text-white">25+ Programs</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-bold">
                <span>EIIN: {publicData?.eiin || '134250'}</span>
                <span className="text-purple-600 dark:text-purple-400">NCTB & Cambridge Standard</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Campus Highlights */}
      <section className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Students */}
          <div className="metric-card bg-[#F5EEF8] dark:bg-purple-950/25 p-6 flex items-center justify-between border border-transparent dark:border-purple-800/30">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Active Learners</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
                {publicData?.stats?.activeLearners ? `${publicData.stats.activeLearners}+` : '1.50K'}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-purple-900/40 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
          </div>

          {/* Teachers */}
          <div className="metric-card bg-[#E0F2FE] dark:bg-sky-950/25 p-6 flex items-center justify-between border border-transparent dark:border-sky-800/30">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Expert Educators</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
                {publicData?.stats?.expertEducators ? `${publicData.stats.expertEducators}+` : '45+'}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-sky-900/40 flex items-center justify-center text-sky-600 dark:text-sky-300 shadow-xs">
              <User className="w-7 h-7" />
            </div>
          </div>

          {/* Parents */}
          <div className="metric-card bg-[#FFEDD5] dark:bg-amber-950/25 p-6 flex items-center justify-between border border-transparent dark:border-amber-800/30">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">Satisfied Parents</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
                {publicData?.stats?.satisfiedParents ? `${publicData.stats.satisfiedParents}+` : '560+'}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-amber-900/40 flex items-center justify-center text-orange-600 dark:text-amber-300 shadow-xs">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Scholarships */}
          <div className="metric-card bg-[#DCFCE7] dark:bg-emerald-950/25 p-6 flex items-center justify-between border border-transparent dark:border-emerald-800/30">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400">SSC Pass Rate</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
                {publicData?.stats?.sscPassRate || '100%'}
              </h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shadow-xs">
              <BadgeDollarSign className="w-7 h-7" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section for Parents */}
      <section id="about" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-xs md:text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
            Why Parents Trust {publicData?.schoolName || 'Aladadpur Pioneer School'}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white">
            A Safe, Smart & Holistic Learning Environment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div className="dashboard-card p-7 space-y-4 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Campus Safety & Monitoring</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Our campus is equipped with 24/7 CCTV surveillance, smart gate entry, automated
              attendance tracking, and verified transport GPS tracking for absolute peace of mind.
            </p>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Real-Time Parent Portal</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Track your child’s daily attendance, homework assignments, exam results, teacher remarks,
              and fee invoice payments instantly through your dedicated smartphone portal.
            </p>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">Future-Ready Curriculum</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Alongside core academics, we integrate Coding, Artificial Intelligence, Robotics, Public
              Speaking, and Entrepreneurship starting from early primary grades.
            </p>
          </div>
        </div>
      </section>

      {/* Admission Application Section */}
      <section id="admission" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="dashboard-card p-10 bg-gradient-to-r from-purple-900 to-purple-700 text-white relative overflow-hidden dark:border-purple-800/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="px-4 py-1.5 rounded-full bg-white/20 text-xs md:text-sm font-bold tracking-wider uppercase">
                Admissions Open 2026-2027
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
                Ready to Give Your Child the Best Educational Foundation?
              </h3>
              <p className="text-purple-100 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                Fill out our simple online admission form or schedule a campus visit with our admissions
                office.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                to="/admission"
                className="px-7 py-4 bg-white text-purple-700 text-sm font-bold rounded-full shadow-md text-center hover:bg-purple-50 transition-all"
              >
                Apply Online Now
              </Link>
              <a
                href={`tel:${publicData?.contact?.phone || '+8801700000000'}`}
                className="px-7 py-4 bg-purple-800/60 border border-purple-400/40 text-white text-sm font-bold rounded-full text-center hover:bg-purple-800 transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5" /> Call Admissions Office
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
