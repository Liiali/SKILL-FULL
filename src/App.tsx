import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginView from './components/auth/LoginView';
import RegisterView from './components/auth/RegisterView';
import LecturerPortal from './components/dashboard/LecturerPortal';
import SchoolAdminPortal from './components/dashboard/SchoolAdminPortal';
import StudentPortal from './components/dashboard/StudentPortal';
import ParentPortal from './components/dashboard/ParentPortal';
import SuperAdminPortal from './components/dashboard/SuperAdminPortal';
import { useState } from 'react';
import { GraduationCap, Flame, Sparkles, BookOpen, Users, Compass, ChevronRight, Award, Trophy } from 'lucide-react';

export default function App() {
  const { user, activePage, navigateTo } = useAuth();
  const [selectedCefr, setSelectedCefr] = useState<'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'>('B2');

  const cefrInfo = {
    A1: { title: 'Beginner / Breakthrough', vocab: '500+ words', focus: 'Acoustic Sound Recognition & Greetings', typical: 'Never studied English previously.' },
    A2: { title: 'Elementary / Waystage', vocab: '1,200+ words', focus: 'Basic Conversations & Personal Info', typical: 'Can read simple signs and give basic directions.' },
    B1: { title: 'Intermediate / Threshold', vocab: '2,500+ words', focus: 'Routine Discussions & Sentence Structures', typical: 'Can communicate clearly during travel.' },
    B2: { title: 'Vantage / Upper Intermediate', vocab: '4,000+ words', focus: 'Complex Debates & Idiomatic Expressions', typical: 'Can work or study in English environments.' },
    C1: { title: 'Effective Operational Proficiency', vocab: '6,000+ words', focus: 'Fluency Contours & Academic Discourse', typical: 'Can express ideas without searching for words.' },
    C2: { title: 'Mastery / Near-Native', vocab: '10,000+ words', focus: 'Nuanced Accents & Sophisticated Writing', typical: 'Has complete fluent mastery matching native speakers.' },
  };

  const currentCefr = cefrInfo[selectedCefr];

  const renderDashboard = () => {
    if (!user) return <LoginView />;
    switch (user.role) {
      case 'SUPER_ADMIN':
        return <SuperAdminPortal />;
      case 'SCHOOL_ADMIN':
        return <SchoolAdminPortal />;
      case 'LECTURER':
        return <LecturerPortal />;
      case 'STUDENT':
        return <StudentPortal />;
      case 'PARENT':
        return <ParentPortal />;
      default:
        return <StudentPortal />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans" id="app-root">
      <Navbar />

      <main className="flex-grow">
        {activePage === 'landing' && (
          <div className="space-y-20 pb-20" id="landing-page">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 text-center space-y-6" id="hero">
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                Now Integrated with Live PostgreSQL database
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none max-w-4xl mx-auto">
                Track Real Academic <span className="text-indigo-600">CEFR Proficiency</span>
              </h1>
              <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
                Connect Students, Parents, Lecturers, and School Administrators in a unified environment backed by database transactions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => navigateTo('register')}
                  className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/10 cursor-pointer flex items-center gap-2"
                  id="hero-register-btn"
                >
                  Create Academic Profile
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all cursor-pointer"
                  id="hero-login-btn"
                >
                  Sign In to Workspace
                </button>
              </div>
            </section>

            {/* Interactive Curriculum Widget */}
            <section className="max-w-5xl mx-auto px-4" id="cefr-overview">
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 md:p-10 space-y-8">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    Interactive CEFR Curriculum Hub
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    Click any CEFR benchmark tier below to inspect primary language trajectories.
                  </p>
                </div>

                {/* CEFR Buttons Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedCefr(level)}
                      className={`py-3 rounded-xl text-sm font-black transition-all cursor-pointer border ${
                        selectedCefr === level
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/10'
                          : 'bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>

                {/* Info Card */}
                <div className="p-6 md:p-8 rounded-2xl bg-indigo-50/40 border border-indigo-100 flex flex-col md:flex-row gap-6 items-start">
                  <div className="p-4 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 shrink-0">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800 text-lg">Level {selectedCefr}</span>
                      <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {currentCefr.vocab} Target
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-700">{currentCefr.title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">
                      <strong className="text-slate-700">Primary Curriculum Focus:</strong> {currentCefr.focus}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      <strong className="text-slate-700">Target Fluency:</strong> {currentCefr.typical}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Features */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6" id="features">
              {[
                { title: 'Certified Lecturers', desc: 'Manage digital classrooms, write transaction logs, and review daily streaking rosters.' },
                { title: 'Supportive Parents', desc: 'Track weekly progress records, inspect learning speed graphs, and send mentor notes.' },
                { title: 'Immersive Students', desc: 'Complete speech exercises, claim streak bonuses, and practice listening modules.' },
                { title: 'School Administrators', desc: 'Monitor curriculums, organize teachers rosters, and evaluate quarterly scores.' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 hover:shadow-md transition-all">
                  <span className="text-xs font-bold text-indigo-600">0{i + 1}.</span>
                  <h3 className="font-extrabold text-slate-800 text-base mt-2 tracking-tight">{f.title}</h3>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </section>
          </div>
        )}

        {activePage === 'login' && <LoginView />}
        {activePage === 'register' && <RegisterView />}
        {activePage === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="dashboard-container">
            {renderDashboard()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/60 py-8 text-center text-xs text-slate-400" id="global-footer">
        <p>&copy; 2026 Skill Full. Implemented with live PostgreSQL database storage. All rights reserved.</p>
      </footer>
    </div>
  );
}
