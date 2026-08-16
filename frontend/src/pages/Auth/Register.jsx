import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Flower2,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Users,
  UserCheck,
  Shield,
  BadgeDollarSign,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const { register: registerAuth, googleLogin } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'student',
      phone: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data) => {
    setAuthError('');
    setAuthSuccess('');

    const result = await registerAuth({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
    });

    if (result.error) {
      setAuthError(result.error.replace('Firebase: ', ''));
    } else {
      setAuthSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        const targetRole = result.backendUser?.role || data.role;
        navigate(`/${targetRole}/dashboard`);
      }, 1200);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSuccess('');
    const result = await googleLogin();
    if (result.error) {
      setAuthError(result.error.replace('Firebase: ', ''));
    } else {
      setAuthSuccess('Google registration successful!');
      setTimeout(() => {
        navigate('/student/dashboard');
      }, 1000);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-7">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-200 mb-2">
            <Flower2 className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-sm font-medium text-slate-500">
            Join Spik International Academy portal ecosystem
          </p>
        </div>

        {/* Form Card */}
        <div className="dashboard-card p-8 border border-slate-100 space-y-6">
          {/* Error / Success Feedback */}
          {authError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register('name', {
                    required: 'Full Name is required',
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                    errors.name
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-xs font-semibold text-rose-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address format',
                    },
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-semibold text-rose-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role Selection Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Account Role
              </label>
              <select
                {...register('role', { required: 'Please select a role' })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 focus:outline-none bg-white"
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="accountant">Accountant</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  placeholder="+1 (800) 000-0000"
                  {...register('phone')}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:border-purple-600 focus:ring-2 focus:ring-purple-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Password
              </label>
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
                  className={`w-full pl-11 pr-11 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                    errors.password
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === passwordValue || 'Passwords do not match',
                  })}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none transition-all ${
                    errors.confirmPassword
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs font-semibold text-rose-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-purple-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-slate-400">
              <span className="bg-white px-3">Or sign up with</span>
            </div>
          </div>

          {/* Google Registration */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white text-slate-700 border border-slate-200 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-xs"
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
            <span>Register with Google</span>
          </button>
        </div>

        {/* Footer Prompt */}
        <p className="text-center text-sm font-semibold text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
