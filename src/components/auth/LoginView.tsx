import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { Mail, Lock, Sparkles, ArrowRight, GraduationCap, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginView() {
  const { login, isLoading, navigateTo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const rolesList: { value: UserRole; label: string; desc: string }[] = [
    { value: 'STUDENT', label: 'Student', desc: 'Daily logs & AI lessons' },
    { value: 'PARENT', label: 'Parent', desc: 'Syllabus & child metrics' },
    { value: 'LECTURER', label: 'Lecturer', desc: 'Class logs & scoring tools' },
    { value: 'SCHOOL_ADMIN', label: 'School Admin', desc: 'Enrollment & teacher metrics' },
    { value: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Global platform metrics' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await login(email, selectedRole, password);
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="login-view-container">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Header Branding back button */}
      <div className="absolute top-6 left-6 flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('landing')} id="login-back-btn">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm group-hover:border-slate-350 transition-all">
          <GraduationCap className="w-5.5 h-5.5 text-indigo-600" />
        </div>
        <div>
          <span className="text-md font-black tracking-tight font-display text-slate-900">
            Skill<span className="text-indigo-600">Full</span>
          </span>
          <span className="block text-[8px] font-bold text-indigo-600/60 uppercase tracking-widest leading-none font-mono">
            Back to landing
          </span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10" id="login-header">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Secure Gatekeeper
          </div>
        </div>
        <h2 className="text-center text-3xl font-black font-display text-slate-900 tracking-tight">
          Welcome Back to Fluency
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-500 font-light">
          Or{' '}
          <button
            onClick={() => navigateTo('register')}
            className="font-bold text-indigo-600 hover:text-indigo-500 underline focus:outline-none cursor-pointer"
          >
            create a premium academy account
          </button>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-10"
        id="login-card-container"
      >
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl border border-slate-200/80 sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-xs flex items-center gap-2.5 font-semibold" id="login-error-msg">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                Academy Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arthur@skillfull.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                Secret Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Premium Role Selection tabs */}
            <div className="pt-2">
              <label className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-2">
                Simulated Sandbox Role (Choose to preview)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5" id="login-role-selector-grid">
                {rolesList.map((r) => {
                  const isSelected = selectedRole === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setSelectedRole(r.value)}
                      className={`px-2 py-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-350 text-slate-650 hover:bg-slate-100'
                      }`}
                      title={r.desc}
                    >
                      <span className="text-[10px] font-black font-display truncate leading-none">
                        {r.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Authenticating credentials...
                  </span>
                ) : (
                  <>
                    Sign In to Portal
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
