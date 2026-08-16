import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GraduationCap, CheckCircle2, FileCheck, Send, ShieldAlert, Phone, HelpCircle } from 'lucide-react';

export default function Admission() {
  const [formSuccess, setFormSuccess] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      studentName: '',
      gender: 'Male',
      targetClass: 'Class 6',
      parentName: '',
      parentPhone: '',
      guardianEmail: '',
      address: '',
    },
  });

  const onSubmit = async (data) => {
    // Simulate admission inquiry submission
    await new Promise((res) => setTimeout(res, 800));
    setFormSuccess(`Thank you ${data.parentName}! Your admission inquiry for ${data.studentName} (${data.targetClass}) has been received. Our admission officer will call ${data.parentPhone} shortly.`);
    reset();
  };

  const seats = [
    { class: 'Play & Nursery', seats: '15 Seats Available', age: '3.5 - 4.5 Years' },
    { class: 'Class 1 - Class 5', seats: '20 Seats Available', age: '6+ Years' },
    { class: 'Class 6 - Class 8', seats: '12 Seats Available', age: '11+ Years' },
    { class: 'Class 9 (Science)', seats: '10 Seats Available', age: '14+ Years' },
    { class: 'Class 9 (Business)', seats: '15 Seats Available', age: '14+ Years' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-9 py-10 space-y-12">
      {/* Header Banner */}
      <div className="dashboard-card p-8 md:p-12 border border-slate-100 dark:border-slate-800 bg-gradient-to-r from-purple-900 via-purple-950 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30">
            <GraduationCap className="w-4 h-4 text-purple-300" />
            <span>Academic Session 2026-2027</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Online Admission Circular & Application
          </h1>
          <p className="text-purple-100 text-sm md:text-base leading-relaxed">
            Welcome prospective parents and students! Submit your online admission inquiry below to secure a seat at Aladadpur Pioneer School.
          </p>
        </div>
      </div>

      {/* Main Grid: Seat Availability & Application Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Seats & Requirements */}
        <div className="lg:col-span-5 space-y-7">
          <div className="dashboard-card p-7 border border-slate-100 dark:border-slate-800 space-y-5">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Seat Availability (2026-2027)</h3>
            <div className="space-y-3">
              {seats.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.class}</h4>
                    <span className="text-xs text-slate-400">Age: {item.age}</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {item.seats}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card p-7 border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400">
              <FileCheck className="w-5 h-5" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Required Documents</h3>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Online Birth Registration Certificate (Copy)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Previous School Transfer Certificate (TC) & Marksheet
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                4 Passport Size Photographs of Student
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                Parent National ID (NID) Card Photocopy
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Admission Form */}
        <div className="lg:col-span-7">
          <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">Online Admission Inquiry Form</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Fill in student and guardian details for priority seat booking
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
                {/* Student Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Tanvir Hasan"
                    {...register('studentName', { required: 'Student name is required' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                  {errors.studentName && <p className="text-xs text-rose-500 mt-1">{errors.studentName.message}</p>}
                </div>

                {/* Target Class */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Desired Class *
                  </label>
                  <select
                    {...register('targetClass', { required: 'Please select class' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  >
                    <option value="Play">Play Group</option>
                    <option value="Nursery">Nursery</option>
                    <option value="KG">KG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9 (Science)">Class 9 (Science)</option>
                    <option value="Class 9 (Business)">Class 9 (Business)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Parent Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Md. Abdul Karim"
                    {...register('parentName', { required: 'Parent name is required' })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                  {errors.parentName && <p className="text-xs text-rose-500 mt-1">{errors.parentName.message}</p>}
                </div>

                {/* Parent Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="01700-000000"
                    {...register('parentPhone', {
                      required: 'Mobile number is required',
                      pattern: { value: /^01[3-9]\d{8}$/, message: 'Enter valid Bangladeshi mobile number (01xxxxxxxxx)' },
                    })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                  />
                  {errors.parentPhone && <p className="text-xs text-rose-500 mt-1">{errors.parentPhone.message}</p>}
                </div>
              </div>

              {/* Present Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Present Address / Village
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Village: Aladadpur, Post: Pioneer, Upazila/District..."
                  {...register('address')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-purple-600"
                ></textarea>
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
                    <span>Submit Admission Inquiry</span>
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
