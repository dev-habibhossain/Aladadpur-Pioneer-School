import { useState } from 'react';
import { Link } from 'react-router';
import { Flower2, UserCheck, GraduationCap, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-9 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-200">
            <Flower2 className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">sp!k</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <Link to="/" className="text-purple-600 font-bold">
            Home
          </Link>
          <a href="#about" className="hover:text-purple-600 transition-colors">
            About Us
          </a>
          <a href="#academics" className="hover:text-purple-600 transition-colors">
            Academics
          </a>
          <a href="#campus" className="hover:text-purple-600 transition-colors">
            Campus Life
          </a>
          <a href="#portals" className="hover:text-purple-600 transition-colors">
            Portals
          </a>
          <a href="#faq" className="hover:text-purple-600 transition-colors">
            Parent FAQ
          </a>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 hover:border-purple-600 hover:text-purple-600 transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-purple-600" /> Parent Login
          </Link>
          <a
            href="#admission"
            className="px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md shadow-purple-200 hover:bg-purple-700 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" /> Online Admission
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="md:hidden text-slate-700 hover:text-purple-600 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-600">
            <Link
              to="/"
              className="text-purple-600 font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#about"
              className="hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </a>
            <a
              href="#academics"
              className="hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Academics
            </a>
            <a
              href="#campus"
              className="hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Campus Life
            </a>
            <a
              href="#portals"
              className="hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portals
            </a>
            <a
              href="#faq"
              className="hover:text-purple-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Parent FAQ
            </a>
          </nav>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserCheck className="w-4 h-4 text-purple-600" /> Parent Login
            </Link>
            <a
              href="#admission"
              className="px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-full text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GraduationCap className="w-4 h-4" /> Online Admission
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
