import { Link } from 'react-router';
import { Flower2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 py-10 px-6 sm:px-9 mt-14 transition-colors duration-300 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100 dark:border-slate-800/80 text-xs font-medium text-slate-500 dark:text-slate-400">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Flower2 className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-800 dark:text-white text-lg leading-none">
                Aladadpur Pioneer
              </span>
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase mt-0.5">
                School & Academy
              </span>
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            EIIN: 134250 | School Code: 4021 — Nurturing academic excellence, character building, and digital innovation for K-10 students in Bangladesh.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider text-xs">Quick Links</h5>
          <ul className="space-y-2 text-xs font-semibold">
            <li><Link to="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Academy Home</Link></li>
            <li><Link to="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About Our School</Link></li>
            <li><Link to="/academics" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Academic Programs</Link></li>
            <li><Link to="/notices" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Official Notice Board</Link></li>
            <li><Link to="/teachers" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Teachers & Faculty</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider text-xs">Portals Access</h5>
          <ul className="space-y-2 text-xs font-semibold">
            <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Parent Portal</Link></li>
            <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Student Zone</Link></li>
            <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Faculty Hub</Link></li>
            <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">System Admin</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-3 uppercase tracking-wider text-xs">Contact Campus</h5>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            Aladadpur Pioneer High School<br />
            Village: Aladadpur, Post: Pioneer<br />
            Upazila / District, Bangladesh<br />
            Phone: +880 1700-000000<br />
            Email: info@aladadpurpioneer.edu.bd
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400 dark:text-slate-400">
        <p>© 2026 Aladadpur Pioneer School & Academy. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Portal Login</Link>
          <Link to="/admission" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Online Admission</Link>
          <Link to="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Contact Us</Link>
        </div>
      </div>
    </footer>
  );
}
