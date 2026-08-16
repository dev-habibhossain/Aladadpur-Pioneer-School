import { Link } from 'react-router';
import { Flower2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-9 px-6 sm:px-9 mt-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-7 pb-7 border-b border-slate-100 text-xs font-medium text-slate-500">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white">
              <Flower2 className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-slate-800 text-2xl">sp!k</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Spik International Academy — Nurturing academic excellence, character building, and digital innovation for K-12 students.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-xs">Quick Links</h5>
          <ul className="space-y-2 text-xs font-semibold">
            <li><Link to="/" className="hover:text-purple-600">Academy Home</Link></li>
            <li><a href="#about" className="hover:text-purple-600">About Spik</a></li>
            <li><a href="#academics" className="hover:text-purple-600">Academic Programs</a></li>
            <li><a href="#admission" className="hover:text-purple-600">Online Admission</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-xs">Portals Access</h5>
          <ul className="space-y-2 text-xs font-semibold">
            <li><Link to="/login" className="hover:text-purple-600">Parent Portal</Link></li>
            <li><Link to="/login" className="hover:text-purple-600">Student Zone</Link></li>
            <li><Link to="/login" className="hover:text-purple-600">Teacher Hub</Link></li>
            <li><Link to="/login" className="hover:text-purple-600">Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-slate-800 mb-3 uppercase tracking-wider text-xs">Contact Campus</h5>
          <p className="text-slate-400 text-xs leading-relaxed">
            Spik International Campus<br />
            123 Knowledge Parkway, Tech District<br />
            Phone: +1 (800) 555-SPIK<br />
            Email: info@spikacademy.edu
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-400">
        <p>© 2026 Spik International Academy. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link to="/login" className="hover:text-purple-600">Parent Login</Link>
          <a href="#admission" className="hover:text-purple-600">Online Admission</a>
        </div>
      </div>
    </footer>
  );
}
