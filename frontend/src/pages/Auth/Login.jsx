import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Flower2,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  GraduationCap,
  Users,
  BadgeDollarSign,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('parent');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const roles = [
    { id: 'parent', label: 'Parent', icon: Users },
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'teacher', label: 'Teacher', icon: UserCheck },
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'accountant', label: 'Accountant', icon: BadgeDollarSign },
  ];

  const onSubmit = async (data) => {
    setAuthError('');
    setAuthSuccess('');

    const result = await login(data.email, data.password);
    if (result.error) {
      setAuthError(result.error.replace('Firebase: ', ''));
    } else {
      setAuthSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        const targetRole = result.backendUser?.role || selectedRole;
        navigate(`/${targetRole}/dashboard`);
      }, 1000);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSuccess('');
    const result = await googleLogin();
    if (result.error) {
      setAuthError(result.error.replace('Firebase: ', ''));
    } else {
      setAuthSuccess('Google sign-in successful!');
      setTimeout(() => {
        navigate(`/${selectedRole}/dashboard`);
      }, 1000);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-7">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-950/60 mb-2">
            <Flower2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Welcome to <span className="text-purple-600 dark:text-purple-400">sp!k</span>
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Sign in to access your institutional portal
          </p>
        </div>

        {/* Card Box */}
        <div className="dashboard-card p-8 border border-slate-100 dark:border-slate-800 space-y-6">
          {/* Role Selection Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2.5">
              Select Your Role Portal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const IconComponent = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{role.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Messages */}
          {authError && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-sm font-semibold flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-sm font-semibold flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Login Form with React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@spikacademy.edu"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address format',
                    },
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                    errors.email
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950'
                      : 'border-slate-200 dark:border-slate-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-950'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-semibold text-rose-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                    errors.password
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200 dark:focus:ring-rose-950'
                      : 'border-slate-200 dark:border-slate-800 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-950'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs font-semibold text-rose-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-200 dark:shadow-purple-950 hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Sign In as {selectedRole.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400">
              <span className="bg-white dark:bg-[#0F172A] px-3">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-3 shadow-xs"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Footer Prompt */}
        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}
