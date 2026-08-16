import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, Building2, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [formSuccess, setFormSuccess] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 800));
    setFormSuccess(`Thank you ${data.name}! Your message regarding "${data.subject}" has been sent to Aladadpur Pioneer School administration.`);
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-12">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <Building2 className="w-4 h-4 text-purple-300" />
            <span>Institutional Contact Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Contact Campus & Administration
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Have questions about admissions, fees, syllabus, or student services? Get in touch with our office or visit our campus.
          </p>
        </div>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Institutional Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="dashboard-card p-7 border border-slate-100 dark:border-slate-800 space-y-5">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Campus Information</h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">School Campus Address</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    Aladadpur Pioneer High School & Academy<br />
                    Village: Aladadpur, Post Office: Pioneer<br />
                    Upazila / District, Bangladesh<br />
                    <span className="font-bold text-purple-600 dark:text-purple-400">EIIN: 134250 | School Code: 4021</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Helpline & Mobile</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    Principal Office: +880 1700-000000<br />
                    Admission Helpdesk: +880 1800-000000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Email Contacts</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    General: info@aladadpurpioneer.edu.bd<br />
                    Admissions: admission@aladadpurpioneer.edu.bd
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Office Hours</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed mt-0.5">
                    Sunday – Thursday: 8:00 AM – 3:30 PM<br />
                    Saturday: 9:00 AM – 1:00 PM (Admin Only)<br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Public Message Form */}
        <div className="lg:col-span-7">
          <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Send Us a Public Message</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Fill out the message form below and our administration will reply promptly.
              </p>
            </div>

            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-semibold flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    {...register('email', { required: 'Email is required' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="01700-000000"
                    {...register('phone')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    {...register('subject')}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Admission Information">Admission Information</option>
                    <option value="Fees Structure">Fees Structure</option>
                    <option value="Syllabus & Routine">Syllabus & Routine</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Message *
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your query or message here..."
                  {...register('message', { required: 'Message body cannot be empty' })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                ></textarea>
                {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-purple-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-200 dark:shadow-purple-950/60 hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <span>Send Message to School</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
