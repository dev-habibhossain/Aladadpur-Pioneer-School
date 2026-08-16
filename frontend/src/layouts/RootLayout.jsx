import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout() {
  return (
    <div className="bg-[#F8F9FD] font-sans antialiased text-slate-700 min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 space-y-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
