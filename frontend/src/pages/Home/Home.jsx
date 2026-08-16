import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
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

export default function Home() {
  const [publicData, setPublicData] = useState(null);

  useEffect(() => {
    // Attempt fetching dynamic institution data from backend MongoDB
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
    axios
      .get(`${apiBase}/public/info`)
      .then((res) => {
        if (res.data?.success) {
          setPublicData(res.data.data);
        }
      })
      .catch(() => {
        // Fallback silently to template default data if API is offline
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Vision & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full bg-[#F3E8FF] text-purple-700 text-sm font-bold shadow-xs">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Admissions Open for Session 2026-2027</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15]">
              Nurturing Minds, Building Character &{' '}
              <span className="text-purple-600">Future Leaders</span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
              Welcome to {publicData?.schoolName || 'Spik Academy'}. We provide a world-class
              environment where academic excellence, moral values, modern technology, and personal
              growth come together to empower your child.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#admission"
                className="px-8 py-4 bg-purple-600 text-white text-base font-bold rounded-full shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center gap-3"
              >
                Apply for Admission <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/login"
                className="px-8 py-4 bg-white text-slate-800 text-base font-bold rounded-full border border-slate-200 hover:border-purple-600 hover:text-purple-600 transition-all flex items-center gap-2.5 shadow-xs"
              >
                <Lock className="w-5 h-5 text-purple-600" /> Parent Portal Login
              </Link>
            </div>
          </div>

          {/* Right Column: Campus Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="dashboard-card p-7 border border-slate-100 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-purple-600 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-800">Safe & Caring Environment</h4>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">100% CCTV & Verified Staff</p>
                  </div>
                </div>
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
              </div>

              {/* Parent Information Points */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F5EEF8] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-bold text-slate-700">Student Success Rate</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800">99.8%</span>
                </div>

                <div className="p-4 rounded-xl bg-[#E0F2FE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-sky-600" />
                    <span className="text-sm font-bold text-slate-700">Student-Teacher Ratio</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800">15 : 1</span>
                </div>

                <div className="p-4 rounded-xl bg-[#DCFCE7] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-700">STEM & Sports Clubs</span>
                  </div>
                  <span className="text-base font-extrabold text-slate-800">25+ Programs</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-bold">
                <span>CBSE / Cambridge Standard</span>
                <span className="text-purple-600">Co-Educational</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Campus Highlights */}
      <section className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Students */}
          <div className="metric-card bg-[#F5EEF8] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500">Active Learners</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">15.00K</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-purple-600 shadow-xs">
              <GraduationCap className="w-7 h-7" />
            </div>
          </div>

          {/* Teachers */}
          <div className="metric-card bg-[#E0F2FE] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500">Expert Educators</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">2.00K</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-sky-600 shadow-xs">
              <User className="w-7 h-7" />
            </div>
          </div>

          {/* Parents */}
          <div className="metric-card bg-[#FFEDD5] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500">Satisfied Parents</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">5.6K</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-orange-600 shadow-xs">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Scholarships */}
          <div className="metric-card bg-[#DCFCE7] p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs md:text-sm font-bold text-slate-500">Scholarships Awarded</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">$19.3K</h2>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-emerald-600 shadow-xs">
              <BadgeDollarSign className="w-7 h-7" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section for Parents */}
      <section id="about" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-xs md:text-sm font-bold text-purple-600 uppercase tracking-widest">
            Why Parents Trust {publicData?.schoolName || 'Spik Academy'}
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800">
            A Safe, Smart & Holistic Learning Environment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-purple-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Campus Safety & Monitoring</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Our campus is equipped with 24/7 CCTV surveillance, smart gate entry, automated
              attendance tracking, and verified transport GPS tracking for absolute peace of mind.
            </p>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-sky-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Real-Time Parent Portal</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Track your child’s daily attendance, homework assignments, exam results, teacher remarks,
              and fee invoice payments instantly through your dedicated smartphone portal.
            </p>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-emerald-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Future-Ready Curriculum</h4>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Alongside core academics, we integrate Coding, Artificial Intelligence, Robotics, Public
              Speaking, and Entrepreneurship starting from early primary grades.
            </p>
          </div>
        </div>
      </section>

      {/* Academics & Curriculum Levels */}
      <section id="academics" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="dashboard-card p-8 border border-slate-100 space-y-7">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800">
                Academic Programs & Learning Levels
              </h3>
              <p className="text-sm font-semibold text-slate-500 mt-1">
                Designed to support every developmental stage of your child
              </p>
            </div>
            <a
              href="#admission"
              className="px-6 py-3 bg-purple-600 text-white text-sm font-bold rounded-full shadow-md hover:bg-purple-700 transition-all flex items-center gap-2 self-start md:self-auto"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-600">
                <Smile className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-800">Kindergarten (KG 1-2)</h4>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Play-based learning, motor skill development, early phonics, and sensory exploration
                activities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2.5 text-sky-600">
                <BookOpen className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-800">Primary (Grade 1-5)</h4>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Core literacy, mathematics, environmental science, creative arts, and foundational computer
                skills.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2.5 text-orange-600">
                <Layers className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-800">Middle School (6-8)</h4>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                STEM labs, advanced mathematics, foreign languages, social sciences, and competitive robotics
                clubs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-600">
                <Award className="w-5 h-5" />
                <h4 className="text-base font-bold text-slate-800">High School (9-12)</h4>
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">
                Advanced board preparations, university counseling, research projects, and career
                specialization tracks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portals Grid */}
      <section id="portals" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="mb-7">
          <h3 className="text-xs md:text-sm font-bold text-purple-600 uppercase tracking-widest">Portal Access</h3>
          <h4 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">
            Dedicated Logins for All Stakeholders
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Link
            to="/login"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-purple-600 border border-transparent transition-all group min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-purple-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-bold text-slate-800">Admin</h5>
              <span className="text-xs font-semibold text-slate-400">System Portal</span>
            </div>
          </Link>

          <Link
            to="/login"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-sky-400 border border-transparent transition-all group min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#E0F2FE] text-sky-600 flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-bold text-slate-800">Teacher</h5>
              <span className="text-xs font-semibold text-slate-400">Faculty Hub</span>
            </div>
          </Link>

          <Link
            to="/login"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-purple-400 border border-transparent transition-all group min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#F5EEF8] text-purple-600 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-bold text-slate-800">Student</h5>
              <span className="text-xs font-semibold text-slate-400">Student Zone</span>
            </div>
          </Link>

          <Link
            to="/login"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-orange-400 border border-transparent transition-all group border-2 border-purple-600/20 shadow-md min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-orange-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-bold text-slate-800">Parent Access</h5>
              <span className="text-xs font-bold text-purple-600">Child Tracking</span>
            </div>
          </Link>

          <Link
            to="/login"
            className="dashboard-card p-6 flex flex-col justify-between hover:border-emerald-400 border border-transparent transition-all group min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] text-emerald-600 flex items-center justify-center mb-4">
              <BadgeDollarSign className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-base font-bold text-slate-800">Accountant</h5>
              <span className="text-xs font-semibold text-slate-400">Fees & Payroll</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Parent Testimonials Section */}
      <section className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-xs md:text-sm font-bold text-purple-600 uppercase tracking-widest">Parent Feedback</h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800">What Our Parent Community Says</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed italic">
              "The Parent Portal makes it so easy to stay updated on my daughter’s attendance and report
              cards. I receive instant alerts for everything."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                alt="Sarah Jenkins"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-800">Sarah Jenkins</h5>
                <span className="text-xs font-semibold text-slate-500">Parent of Grade 5 Student</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed italic">
              "Spik Academy balances academic rigor with sports and robotics. The teachers are genuinely
              approachable and supportive."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80"
                alt="David Miller"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-sky-100"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-800">David Miller</h5>
                <span className="text-xs font-semibold text-slate-500">Parent of Grade 8 Student</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-7 space-y-4 border border-slate-100">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <p className="text-sm md:text-base font-medium text-slate-600 leading-relaxed italic">
              "Paying fee invoices online and receiving instant PDF receipts saves so much time. Highly
              organized management system!"
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                alt="Diana Plenty"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-100"
              />
              <div>
                <h5 className="text-sm font-bold text-slate-800">Diana Plenty</h5>
                <span className="text-xs font-semibold text-slate-500">Parent of Grade 10 Student</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Application Section */}
      <section id="admission" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="dashboard-card p-10 bg-gradient-to-r from-purple-900 to-purple-600 text-white relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="px-4 py-1.5 rounded-full bg-white/20 text-xs md:text-sm font-bold tracking-wider uppercase">
                Admissions Open
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
                to="/login"
                className="px-7 py-4 bg-white text-purple-700 text-sm font-bold rounded-full shadow-md text-center hover:bg-purple-50 transition-all"
              >
                Apply Online Now
              </Link>
              <a
                href="tel:+18005557745"
                className="px-7 py-4 bg-purple-800/60 border border-purple-400/40 text-white text-sm font-bold rounded-full text-center hover:bg-purple-800 transition-all flex items-center justify-center gap-2.5"
              >
                <Phone className="w-5 h-5" /> Call Admissions Office
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section for Parents */}
      <section id="faq" className="px-6 sm:px-9 max-w-7xl mx-auto">
        <div className="mb-8">
          <h3 className="text-xs md:text-sm font-bold text-purple-600 uppercase tracking-widest">
            Parent Enquiries
          </h3>
          <h4 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-1">Frequently Asked Questions</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="dashboard-card p-6 space-y-3 border border-slate-100">
            <h5 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
              What are the admission eligibility requirements?
            </h5>
            <p className="text-sm font-medium text-slate-600 leading-relaxed pl-7">
              Admissions require the previous year's academic mark sheets, birth certificate, transfer
              certificate (if applicable), and a brief student interaction session.
            </p>
          </div>

          <div className="dashboard-card p-6 space-y-3 border border-slate-100">
            <h5 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
              How can parents track daily attendance & results?
            </h5>
            <p className="text-sm font-medium text-slate-600 leading-relaxed pl-7">
              Upon admission, parents receive individual credentials to log in to the Parent Portal
              (`/parent/dashboard`) to view live attendance, marks, and announcements.
            </p>
          </div>

          <div className="dashboard-card p-6 space-y-3 border border-slate-100">
            <h5 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
              Is school transport available with safety tracking?
            </h5>
            <p className="text-sm font-medium text-slate-600 leading-relaxed pl-7">
              Yes, our fleet of air-conditioned school buses covers major city routes, equipped with GPS
              tracking, speed governors, and trained female attendants.
            </p>
          </div>

          <div className="dashboard-card p-6 space-y-3 border border-slate-100">
            <h5 className="text-base font-bold text-slate-800 flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
              How can fee payments be made?
            </h5>
            <p className="text-sm font-medium text-slate-600 leading-relaxed pl-7">
              Fees can be paid online via credit/debit card, bank transfer, or net banking through the
              Parent Portal, generating an instant downloadable PDF receipt.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
