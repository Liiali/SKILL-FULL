import { useAuth } from '../../context/AuthContext';
import { motion } from 'motion/react';
import StudentPortal from './StudentPortal';
import ParentPortal from './ParentPortal';
import LecturerPortal from './LecturerPortal';
import SchoolAdminPortal from './SchoolAdminPortal';
import SuperAdminPortal from './SuperAdminPortal';
import { GraduationCap, LogOut, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, navigateTo } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-4 shadow-sm">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-xl font-black font-display text-slate-900">Portal Security Guard</h2>
        <p className="text-xs text-slate-500 font-light mt-1 max-w-sm text-center">
          You are not currently logged into any active portal session logs. Please sign in to verify.
        </p>
        <button
          onClick={() => navigateTo('login')}
          className="mt-5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  // Choose sub-portal matching role
  const renderPortal = () => {
    switch (user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminPortal userName={`${user.firstName} ${user.lastName}`} />;
      case 'SCHOOL_ADMIN':
        return <SchoolAdminPortal userName={`${user.firstName} ${user.lastName}`} schoolName={user.schoolName} />;
      case 'LECTURER':
        return <LecturerPortal userName={`${user.firstName} ${user.lastName}`} />;
      case 'PARENT':
        return <ParentPortal userName={`${user.firstName} ${user.lastName}`} />;
      case 'STUDENT':
      default:
        return <StudentPortal userName={`${user.firstName} ${user.lastName}`} />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-violet-50 text-violet-700 border-violet-100';
      case 'SCHOOL_ADMIN':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'LECTURER':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'PARENT':
        return 'bg-pink-50 text-pink-700 border-pink-100';
      case 'STUDENT':
      default:
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" id="dashboard-layout-main">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/80 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('landing')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-md flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black font-display text-slate-900 tracking-tight">
                Skill<span className="text-indigo-600">Full</span>
              </span>
              <span className="block text-[7px] font-bold text-indigo-600/60 uppercase tracking-widest font-mono leading-none">
                Global Academy
              </span>
            </div>
          </div>

          {/* User Details & Sign Out */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-bold text-slate-800 leading-none">
                {user.firstName} {user.lastName}
              </span>
              <span className="text-[10px] text-slate-400 font-light mt-0.5 leading-none">
                {user.email}
              </span>
            </div>

            {/* Role Badge */}
            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${getRoleBadgeColor(user.role)} font-mono`}>
              {user.role.replace('_', ' ')}
            </span>

            <div className="h-6 w-px bg-slate-200" />

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('landing')}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                title="Return to Landing Page"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={logout}
                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                title="Logout session"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {renderPortal()}
        </motion.div>
      </main>
    </div>
  );
}
