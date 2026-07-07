import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, BookOpen, Compass, CheckCircle2, RefreshCw, User, BarChart2, Mail, Users, Star, ArrowRight } from 'lucide-react';

export default function ParentPortal({ userName }: { userName: string }) {
  const childrenData = [
    {
      name: 'Hiro Pendelton',
      grade: 'B1 Intermediate',
      avatar: 'H',
      streak: '42 days',
      lessonsCompleted: '36 Lessons',
      recentScores: [
        { testName: 'Present Perfect Inversions', score: 98, date: 'June 28, 2026', type: 'Grammar' },
        { testName: 'Business Negotiations Oral', score: 92, date: 'June 14, 2026', type: 'Speaking' },
        { testName: 'Linguistic Tone Shift', score: 88, date: 'May 30, 2026', type: 'Listening' },
      ],
      overallAccuracy: '92.6%',
      feedback: 'Hiro is performing at an exceptional level, showing keen phonetic flexibility. He is ready to test for the B2 curriculum in weeks.',
      nextClass: 'July 8, 2026 at 14:00 UTC',
    },
    {
      name: 'Arthur Pendelton',
      grade: 'A2 Essential',
      avatar: 'A',
      streak: '18 days',
      lessonsCompleted: '14 Lessons',
      recentScores: [
        { testName: 'Essential Irregular Verbs', score: 90, date: 'June 25, 2026', type: 'Grammar' },
        { testName: 'Preposition Alignment Diagnostic', score: 85, date: 'June 10, 2026', type: 'Syntax' },
        { testName: 'Daily Greeting Pronunciation', score: 95, date: 'May 28, 2026', type: 'Phonetics' },
      ],
      overallAccuracy: '90.0%',
      feedback: 'Arthur has shown great persistence in foundational speech patterns. Recommended to log more speaking rooms practice.',
      nextClass: 'July 9, 2026 at 16:30 UTC',
    },
  ];

  const [activeChildIdx, setActiveChildIdx] = useState(0);
  const child = childrenData[activeChildIdx];

  return (
    <div className="space-y-6" id="parent-portal-container">
      {/* Welcome & Child Selectors */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="text-left z-10">
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">Parent Console</span>
          <h2 className="text-2xl font-black font-display text-slate-900 mt-0.5">Welcome Back, {userName}</h2>
          <p className="text-xs text-slate-500 font-light mt-1">Reviewing the educational trajectories of your registered children.</p>
        </div>

        {/* Children switcher selectors */}
        <div className="flex gap-2 w-full md:w-auto z-10" id="parent-child-selector-tabs">
          {childrenData.map((c, idx) => (
            <button
              key={c.name}
              onClick={() => setActiveChildIdx(idx)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeChildIdx === idx
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100'
              }`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px] ${
                activeChildIdx === idx ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {c.avatar}
              </div>
              {c.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Grid child metrics details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={child.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {/* Left Column: Metrics and Scores */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">CEFR Goal Track</span>
                <span className="block text-md font-black text-slate-900 mt-1">{child.grade}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Streak count</span>
                <span className="block text-md font-black text-indigo-600 mt-1">{child.streak}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Lessons Completed</span>
                <span className="block text-md font-black text-slate-900 mt-1">{child.lessonsCompleted}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-wider font-mono">Accredited Accuracy</span>
                <span className="block text-md font-black text-emerald-600 mt-1">{child.overallAccuracy}</span>
              </div>
            </div>

            {/* Test Performance Log */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-black font-display text-sm text-slate-900">Recent CEFR Exam Metrics</h3>
                </div>
                <button className="text-xs text-indigo-600 hover:text-indigo-500 font-bold flex items-center gap-1">
                  View full logs <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3.5" id="parent-score-list">
                {child.recentScores.map((score, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl gap-3 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {score.type.charAt(0)}
                      </div>
                      <div>
                        <span className="block text-[8px] font-black text-indigo-600 uppercase tracking-widest font-mono">{score.type} Evaluation</span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">{score.testName}</h4>
                        <span className="block text-[10px] text-slate-400 font-light font-mono">{score.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <span className="block text-[8px] font-bold text-slate-400 uppercase font-mono">Score Achieved</span>
                        <span className={`text-sm font-black font-mono ${score.score >= 90 ? 'text-emerald-600' : 'text-slate-800'}`}>
                          {score.score}%
                        </span>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                        score.score >= 90 ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {score.score >= 90 ? 'Excellent' : 'Good'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Feedback and Next Steps */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Lecturer Direct Message */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Mentor Evaluation Logs</h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 italic font-light">
                  "{child.feedback}"
                </p>

                <div className="flex items-center gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-xs font-black text-indigo-700 font-mono">
                    SA
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-800">Dr. Sarah Adams</span>
                    <span className="block text-[10px] text-slate-500 font-light">Skill Full Academic Mentor</span>
                  </div>
                </div>

                <button className="w-full py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  Connect with dr. Sarah
                </button>
              </div>
            </div>

            {/* Upcoming Live Class Calendar */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm text-slate-900">Upcoming Lesson Sync</h3>
              </div>

              <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl text-amber-900 mb-3 text-xs flex gap-2.5">
                <span className="text-md">📅</span>
                <div>
                  <strong className="block font-bold">Upcoming speaking exam booked:</strong>
                  <span className="block text-[10px] mt-0.5 font-mono">{child.nextClass}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer">
                Reschedule Sync Session
              </button>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
