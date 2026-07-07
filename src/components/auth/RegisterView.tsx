import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { User, Mail, Lock, Sparkles, ArrowRight, GraduationCap, AlertCircle, CheckCircle2, ChevronDown, Award } from 'lucide-react';

export default function RegisterView() {
  const { signUp, isLoading, navigateTo } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const rolesAvailable: { value: UserRole; label: string; tag: string; desc: string; icon: string }[] = [
    { value: 'STUDENT', label: 'Immersive Student', tag: 'CEFR Study Track', desc: 'Unlock active streaks, daily vocabulary logs, and customized speaking challenges.', icon: '🎓' },
    { value: 'PARENT', label: 'Supportive Parent', tag: 'Progress & Logs Monitor', desc: 'Track childrens test scores, CEFR progression graphs, and review mentor logs.', icon: '🏡' },
    { value: 'LECTURER', label: 'Academy Lecturer', tag: 'Classroom Operations', desc: 'Grade oral communication submissions, check attendance, and issue custom logs.', icon: '👔' },
    { value: 'SCHOOL_ADMIN', label: 'School Admin', tag: 'Syllabus & Admin Oversight', desc: 'Inspect school metrics, coordinate active lecturers, and control registration logs.', icon: '🏫' },
  ];

  const selectedRoleObj = rolesAvailable.find((r) => r.value === role) || rolesAvailable[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!firstName) {
      setError('Please provide your first name.');
      return;
    }
    if (!lastName) {
      setError('Please provide your last name.');
      return;
    }
    if (!email) {
      setError('Please provide your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!password) {
      setError('Please define a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
       await signUp(email, role, firstName, lastName, password);
     } catch (err: any) {
       setError(err.message || 'Failed to create account. Please try again.');
     }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="register-view-container">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Header Branding back button */}
      <div className="absolute top-6 left-6 flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('landing')} id="register-back-btn">
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10" id="register-header">
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> 14-Day Free Trial
          </div>
        </div>
        <h2 className="text-center text-3xl font-black font-display text-slate-900 tracking-tight">
          Initiate Immersive Trajectory
        </h2>
        <p className="mt-2 text-center text-xs sm:text-sm text-slate-500 font-light">
          Already registered in our global system?{' '}
          <button
            onClick={() => navigateTo('login')}
            className="font-bold text-indigo-600 hover:text-indigo-500 underline focus:outline-none cursor-pointer"
          >
            Sign in here
          </button>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-10"
        id="register-card-container"
      >
        <div className="bg-white py-8 px-6 shadow-2xl rounded-3xl border border-slate-200/80 sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3.5 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-xs flex items-center gap-2.5 font-semibold animate-pulse" id="register-error-msg">
                <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* First & Last Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                  First Name *
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Arthur"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                  Last Name *
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Pendelton"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="reg-email" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                Academy Email Address *
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="reg-email"
                  name="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arthur.pendelton@domain.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                Define Secret Password *
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="reg-password"
                  name="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-800 font-semibold"
                />
              </div>
            </div>

            {/* Custom Dropdown/Grouped Selector */}
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-450 uppercase tracking-wider font-mono mb-1.5">
                Select Academic Role *
              </label>
              
              {/* Dropdown Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4.5 text-left rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-350 transition-all flex items-center justify-between shadow-sm cursor-pointer"
                id="role-custom-dropdown-btn"
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{selectedRoleObj.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900">{selectedRoleObj.label}</span>
                      <span className="text-[8px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold font-mono uppercase">{selectedRoleObj.tag}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 font-light leading-snug truncate max-w-[240px]">
                      {selectedRoleObj.desc}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-350 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div className="relative z-20 mt-2 left-0 right-0 rounded-2xl bg-white border border-slate-200 shadow-xl p-2.5 space-y-1.5" id="role-custom-dropdown-options">
                  {rolesAvailable.map((r) => {
                    const isSelected = role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setRole(r.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex gap-3.5 ${
                          isSelected
                            ? 'bg-indigo-50 border border-indigo-150 shadow-sm'
                            : 'bg-white hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        <span className="text-2xl mt-0.5 shrink-0">{r.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>{r.label}</span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5 font-light leading-snug">
                            {r.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
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
                    Creating premium portal logs...
                  </span>
                ) : (
                  <>
                    Unlock Immersive Syllabus
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
