import { useState, FormEvent } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { Mail, Lock, User, UserCheck, ChevronDown, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function RegisterView() {
  const { signUp, loginDemo, navigateTo, isLoading } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const rolesAvailable: { value: UserRole; label: string; desc: string }[] = [
    { value: 'STUDENT', label: 'Immersive Student', desc: 'Study tracks, streaks, speaking metrics' },
    { value: 'PARENT', label: 'Supportive Parent', desc: 'Track performance and progression graphs' },
    { value: 'LECTURER', label: 'Certified Lecturer', desc: 'Submit evaluations and manage classrooms' },
    { value: 'SCHOOL_ADMIN', label: 'School Administrator', desc: 'Manage curriculums, classes, and teachers' },
    { value: 'SUPER_ADMIN', label: 'System Owner', desc: 'Supervise global tenant schools and system logs' },
  ];

  const currentRoleObj = rolesAvailable.find((r) => r.value === selectedRole)!;

  const handleBypassLogin = () => {
    loginDemo(selectedRole);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password) {
      setError('Please provide all requested registration details.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long for optimal system security.');
      return;
    }

    try {
      await signUp(email, selectedRole, firstName, lastName, password);
    } catch (err: any) {
      setError(err.message || 'Failed to create academic profile. Please try again.');
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12" id="register-container">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 md:p-10" id="register-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900" id="register-title">
            Register Account
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Configure your professional CEFR workspace and unlock tracking metrics
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm flex flex-col gap-3" id="register-error-alert">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-rose-700">Error:</span>
              <span className="text-rose-700">{error}</span>
            </div>
            {(error.includes('unreachable') || error.includes('connection') || error.includes('Prisma')) && (
              <div className="mt-2 pt-3 border-t border-rose-200/50 flex flex-col gap-2">
                <p className="text-[11px] text-rose-500 font-medium leading-relaxed">
                  Note: Outbound connections to external PostgreSQL databases are often restricted in sandbox environments.
                </p>
                <button
                  type="button"
                  onClick={handleBypassLogin}
                  className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  ⚡ Enter App via Local Database (Demo Mode)
                </button>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" id="register-form">
          {/* Names Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                First Name *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Arthur"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white placeholder:text-slate-300 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Last Name *
              </label>
              <div className="relative">
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Pendelton"
                  className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white placeholder:text-slate-300 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Academic Role Dropdown */}
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Academic Role *
            </label>
            <button
              type="button"
              id="register-role-dropdown"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <UserCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-800 text-sm block">{currentRoleObj.label}</span>
                  <span className="text-xs text-slate-400 block truncate">{currentRoleObj.desc}</span>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-20 mt-2 left-0 right-0 rounded-2xl bg-white border border-slate-200 shadow-xl p-2.5 space-y-1"
                    id="register-dropdown-options"
                  >
                    {rolesAvailable.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setSelectedRole(r.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all cursor-pointer flex flex-col ${
                          selectedRole === r.value ? 'bg-indigo-50 border-l-4 border-indigo-600 pl-3' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-bold text-slate-800 text-xs">{r.label}</span>
                        <span className="text-[11px] text-slate-400">{r.desc}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Email input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Academy Email Address *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arthur.pendelton@domain.com"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white placeholder:text-slate-300 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Define Secret Password *
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl border border-slate-200 bg-white placeholder:text-slate-300 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            id="btn-register-submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                Create Academic Profile
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBypassLogin}
            className="w-full py-3.5 rounded-2xl border border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            id="btn-register-demo"
          >
            ⚡ Quick Sandbox Demo Mode
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-slate-100">
          <p className="text-slate-500 text-xs">
            Already have an active profile?{' '}
            <button
              onClick={() => navigateTo('login')}
              className="text-indigo-600 hover:text-indigo-500 font-bold underline cursor-pointer"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
