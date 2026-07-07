import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, Sparkles, ChevronRight, GraduationCap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onStartLearning: () => void;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ onStartLearning, scrollToSection }: NavbarProps) {
  const { navigateTo, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'The 6 Levels', id: 'levels' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Pricing', id: 'pricing' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const handleSignIn = () => {
    alert("Welcome back to Skill Full!\n\nEntering your student portal would grant immediate access to your interactive classes, 24/7 AI Lecturer, and speaking logs.");
  };

  return (
    <>
      <nav
        id="navbar-sticky"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/85 backdrop-blur-lg border-b border-indigo-100 py-3.5 shadow-md shadow-slate-100/50'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group"
              id="navbar-logo-container"
            >
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-all duration-300">
                <GraduationCap className="w-6 h-6 text-white" />
                <Sparkles className="w-4 h-4 text-emerald-400 absolute -top-1.5 -right-1.5 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight font-display text-slate-950">
                  Skill<span className="text-indigo-600 font-extrabold">Full</span>
                </span>
                <span className="block text-[8px] font-bold text-indigo-600/60 uppercase tracking-widest leading-none font-mono">
                  GLOBAL ENGLISH ACADEMY
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5 bg-white/80 border border-slate-200/80 px-2.5 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <button
                  id="btn-nav-dashboard"
                  onClick={() => navigateTo('dashboard')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  Go to Dashboard <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    id="btn-nav-signin"
                    onClick={() => navigateTo('login')}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-indigo-600" />
                    Sign In
                  </button>
                  <button
                    id="btn-nav-trial"
                    onClick={() => navigateTo('register')}
                    className="relative px-5 py-2.5 rounded-xl overflow-hidden group cursor-pointer font-bold text-xs"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-size-200 animate-gradient-flow"></span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-1.5 text-white">
                      Start Free Trial
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              {user ? (
                <button
                  id="btn-nav-mobile-dashboard"
                  onClick={() => navigateTo('dashboard')}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  id="btn-nav-mobile-trial"
                  onClick={() => navigateTo('register')}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  Free Trial
                </button>
              )}
              <button
                id="btn-nav-mobile-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-indigo-600 transition-all cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden" id="mobile-nav-overlay">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-xs bg-white shadow-2xl flex flex-col p-6 z-50 border-l border-slate-200"
            >
              <div className="flex justify-between items-center pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold text-slate-950 font-display">Skill Full</span>
                </div>
                <button
                  id="btn-mobile-close"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 py-6 flex flex-col gap-2 overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block px-2">Navigation</span>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className="w-full text-left px-4 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 hover:text-indigo-600 transition-all cursor-pointer text-sm"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Action buttons footer */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                {user ? (
                  <button
                    id="btn-mobile-dashboard"
                    onClick={() => {
                      setIsOpen(false);
                      navigateTo('dashboard');
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Go to Dashboard
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <>
                    <button
                      id="btn-mobile-signin"
                      onClick={() => {
                        setIsOpen(false);
                        navigateTo('login');
                      }}
                      className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-100 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4 text-indigo-600" />
                      Sign In to Account
                    </button>
                    <button
                      id="btn-mobile-start"
                      onClick={() => {
                        setIsOpen(false);
                        navigateTo('register');
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Start Free Trial
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
