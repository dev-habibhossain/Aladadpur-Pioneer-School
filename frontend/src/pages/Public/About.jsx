import { Award, BookOpen, Building2, CheckCircle2, ShieldCheck, Target, Users, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-12">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-900 via-slate-900 to-purple-950 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Building2 className="w-4 h-4 text-purple-300" />
            <span>EIIN: 134250 | School Code: 4021</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            About Aladadpur Pioneer School
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Established with a commitment to academic brilliance, moral integrity, and modern technological education in Bangladesh. We cultivate future leaders with strong traditional values and global perspectives.
          </p>
        </div>
      </div>

      {/* Headmaster's & Management Message */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 relative">
          <div className="dashboard-card p-4 border border-slate-100 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Headmaster Message"
              className="w-full h-80 object-cover rounded-xl"
            />
            <div className="mt-4 p-3 text-center space-y-0.5">
              <h4 className="text-base font-bold text-slate-800 dark:text-white">Md. Rafiqul Islam</h4>
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">Headmaster & Principal</p>
              <p className="text-xs text-slate-400">M.Sc (Physics), M.Ed (DU)</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <HeartHandshake className="w-4 h-4" /> Message From Headmaster
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
            "Empowering Students to Achieve Academic Excellence & Higher Moral Character"
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            Welcome to Aladadpur Pioneer School. Our institution stands as a beacon of quality education, blending the national NCTB curriculum with modern STEM initiatives, computer literacy, and character development.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            We provide a secure, digitalized, and nurturing environment where every child receives personalized attention, ensuring success in board examinations (PSC, JSC, SSC) and beyond.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/50">
              <h4 className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">100%</h4>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">SSC Board Pass Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/50">
              <h4 className="text-2xl font-extrabold text-sky-700 dark:text-sky-300">45+</h4>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Experienced Teachers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Our Mission</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            To deliver top-tier secondary education that combines rigorous academics, digital literacy, moral ethics, and physical fitness, enabling students to excel in national competitive fields.
          </p>
        </div>

        <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Our Vision</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            To become a leading model educational institution in the region, recognized for academic innovation, Smart Campus digitalization, and producing disciplined, patriotic citizens.
          </p>
        </div>
      </div>

      {/* Campus Infrastructure Highlights */}
      <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Campus Infrastructure & Facilities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Computer & AI Lab</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">High-speed internet with 35 modern computers for student ICT classes.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Science Laboratories</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fully equipped Physics, Chemistry, and Biology labs for practical experiments.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Central Library</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Over 5,000 academic, reference, and storybooks with quiet reading spaces.</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">CCTV & Smart Security</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Entire campus under 24/7 CCTV surveillance with automated SMS attendance.</p>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-8 rounded-2xl bg-purple-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="text-xl font-bold">Want to Enroll Your Child in Our Academy?</h3>
          <p className="text-sm text-purple-100">Admissions for Play to Class 9 are currently open for session 2026-2027.</p>
        </div>
        <Link
          to="/admission"
          className="px-6 py-3 bg-white text-purple-700 font-bold rounded-full hover:bg-purple-50 transition-all text-sm shrink-0"
        >
          Apply for Admission
        </Link>
      </div>
    </div>
  );
}
