import { useState, ChangeEvent, FormEvent } from 'react';
import { Globe, ShieldCheck, Mail, ChevronUp, Github, Twitter, Linkedin, Sparkles, Send, GraduationCap } from 'lucide-react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [language, setLanguage] = useState('English');
  const [email, setEmail] = useState('');

  const sitemap = [
    {
      title: 'Academy',
      links: [
        { name: 'Home Portal', id: 'home' },
        { name: 'Core Pillars', id: 'how-it-works' },
        { name: 'The 6 Levels', id: 'levels' },
        { name: 'Student Reviews', id: 'reviews' },
      ],
    },
    {
      title: 'Curriculum',
      links: [
        { name: 'Beginner (A1-A2)', id: 'levels' },
        { name: 'Intermediate (B1-B2)', id: 'levels' },
        { name: 'Advanced (C1-C2)', id: 'levels' },
        { name: 'Syllabus FAQ', id: 'how-it-works' },
      ],
    },
    {
      title: 'Tuition',
      links: [
        { name: 'Explorer Path', id: 'pricing' },
        { name: 'Immersion Path', id: 'pricing' },
        { name: 'Live Workshops', id: 'pricing' },
        { name: 'Scholarships', id: 'pricing' },
      ],
    },
  ];

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    alert(`Language adjusted to ${e.target.value}!\n\nAll student lessons, interactive dialogs, and AI reports will dynamically update.`);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing!\n\nWe will send senior linguistic reports and advanced English study materials to ${email} weekly.`);
    setEmail('');
  };

  return (
    <footer className="bg-slate-50 text-slate-600 pt-20 pb-12 border-t border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Grid: Branding, Sitemap, and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          
          {/* Logo Column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')} id="footer-logo">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="text-xl font-black font-display text-slate-900 tracking-tight">
                  Skill<span className="text-indigo-600">Full</span>
                </span>
                <span className="block text-[8px] font-bold text-indigo-600/80 uppercase tracking-widest leading-none font-mono">
                  GLOBAL ENGLISH ACADEMY
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm font-light">
              Skill Full is a world-renowned global English academy. Aligned with official CEFR frameworks, we empower learners to master fluency from absolute foundation to native prestige.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2" id="footer-social-icons">
              <a href="#twitter" aria-label="Twitter" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#linkedin" aria-label="LinkedIn" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#github" aria-label="GitHub" className="p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-slate-500 hover:text-indigo-600 transition-all shadow-sm">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Sitemap Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            {sitemap.map((col, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-xs text-slate-500 hover:text-indigo-600 transition-colors text-left cursor-pointer hover:underline font-light"
                      >
                        {col.title === 'Curriculum' || col.title === 'Tuition' ? link.name : link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Micro Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono">
              Linguistic Reports
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Receive advanced English synonyms cheatsheets, grammar tips, and study milestones directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex rounded-xl bg-white border border-slate-200 p-1 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 transition-all shadow-sm">
              <div className="px-2.5 flex items-center text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-1.5 text-xs text-slate-800 focus:outline-none placeholder-slate-400 font-light"
                required
              />
              <button
                type="submit"
                id="btn-footer-subscribe"
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center cursor-pointer shadow-md"
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Lower Footer: Copyright & Controls */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400 font-medium">
            <span>&copy; {new Date().getFullYear()} Skill Full Academy. All rights reserved.</span>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Standard ISO 27001 Certified</span>
            </div>
          </div>

          {/* Language Selector & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
              <Globe className="w-3.5 h-3.5 text-indigo-600" />
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-xs text-slate-750 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="English" className="bg-white text-slate-900">English (US)</option>
                <option value="Spanish" className="bg-white text-slate-900">Español</option>
                <option value="Portuguese" className="bg-white text-slate-900">Português</option>
                <option value="French" className="bg-white text-slate-900">Français</option>
                <option value="Japanese" className="bg-white text-slate-900">日本語</option>
              </select>
            </div>

            <button
              onClick={() => scrollToSection('home')}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all cursor-pointer flex items-center justify-center border border-slate-200 shadow-sm"
              title="Back to Top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lower Tagline */}
        <div className="mt-8 pt-4 border-t border-slate-200/40 text-center flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-indigo-600" />
          <span>ACCREDITED CEFR EDUCATION PLATFORM</span>
        </div>

      </div>
    </footer>
  );
}
