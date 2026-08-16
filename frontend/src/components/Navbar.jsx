import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Flower2, UserCheck, GraduationCap, Menu, X, Sun, Moon, Bell } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext/ThemeProvider';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Academics', path: '/academics' },
    { label: 'Notice Board', path: '/notices' },
    { label: 'Admission', path: '/admission' },
    { label: 'Teachers & Staff', path: '/teachers' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="border-b border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-9 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-200 dark:shadow-purple-900/40">
            <Flower2 className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white leading-none">
              Aladadpur Pioneer
            </span>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 tracking-wider uppercase mt-0.5">
              School & Academy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? 'text-purple-600 dark:text-purple-400 font-extrabold'
                    : 'hover:text-purple-600 dark:hover:text-purple-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-amber-400 flex items-center justify-center hover:border-purple-600 dark:hover:border-purple-500 transition-all shadow-xs"
            title={`Switch to ${theme === 'light' ? 'Executive Dark' : 'Light'} Theme`}
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>

          <Link
            to="/login"
            className="px-4.5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-purple-600 dark:hover:border-purple-500 dark:hover:text-purple-400 transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Portal Login
          </Link>
          <Link
            to="/admission"
            className="px-4.5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-full shadow-md shadow-purple-200 dark:shadow-purple-950/60 hover:bg-purple-700 transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-4 h-4" /> Admission 2026
          </Link>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-amber-400 flex items-center justify-center"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            type="button"
            className="text-slate-700 dark:text-slate-200 hover:text-purple-600 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-6 py-4 space-y-3">
          <nav className="flex flex-col gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `transition-colors ${
                    isActive
                      ? 'text-purple-600 dark:text-purple-400 font-extrabold'
                      : 'hover:text-purple-600 dark:hover:text-purple-400'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/login"
              className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Portal Login
            </Link>
            <Link
              to="/admission"
              className="px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-full text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <GraduationCap className="w-4 h-4" /> Admission 2026
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
