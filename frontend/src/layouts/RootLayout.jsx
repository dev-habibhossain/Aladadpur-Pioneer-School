import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="bg-[#F8F9FD] dark:bg-[#020617] font-sans antialiased text-slate-800 dark:text-slate-100 min-h-screen flex flex-col justify-between transition-colors duration-300 relative overflow-x-hidden">
      {/* Background Soft Purple Glow in Dark Mode */}
      <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-900/15 blur-[120px] pointer-events-none rounded-full z-0"></div>

      <Navbar />
      <main className="flex-1 space-y-14 relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
