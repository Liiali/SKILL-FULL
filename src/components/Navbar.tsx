import { useAuth } from '../context/AuthContext';
import { LogOut, BookOpen, GraduationCap, Compass, ShieldAlert } from 'lucide-react';

export default function Navbar() {
  const { user, activePage, navigateTo, logout } = useAuth();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'System Owner';
      case 'SCHOOL_ADMIN':
        return 'School Admin';
      case 'LECTURER':
        return 'Certified Lecturer';
      case 'STUDENT':
        return 'Immersive Student';
      case 'PARENT':
        return 'Supportive Parent';
      default:
        return role;
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60" id="global-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 font-extrabold text-lg text-slate-900 cursor-pointer"
              id="navbar-logo-btn"
            >
              <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/10">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="tracking-tight">Skill <span className="text-indigo-600 font-medium">Full</span></span>
            </button>

            {/* Public Links */}
            <div className="hidden md:flex items-center ml-10 space-x-6">
              <button
                onClick={() => navigateTo('landing')}
                className={`text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activePage === 'landing' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Curriculum Hub
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4" id="navbar-user-section">
                {/* User badge */}
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wider">
                    {getRoleLabel(user.role)}
                  </span>
                </div>

                <button
                  onClick={() => navigateTo('dashboard')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activePage === 'dashboard'
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  My Workspace
                </button>

                <button
                  onClick={logout}
                  id="btn-navbar-logout"
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all cursor-pointer"
                  title="Logout Account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3" id="navbar-auth-buttons">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4.5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo('register')}
                  className="px-4.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md shadow-slate-900/10 cursor-pointer"
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
