import { useState } from 'react';
import { Award, BookOpen, Flame, Headphones, Mic, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';

export default function StudentPortal() {
  const [streak, setStreak] = useState(12);
  const [completedChallenge, setCompletedChallenge] = useState(false);
  const [score, setScore] = useState(380);

  const handleChallengeSubmit = () => {
    setStreak(streak + 1);
    setScore(score + 50);
    setCompletedChallenge(true);
  };

  return (
    <div className="space-y-8" id="student-workspace">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Flame className="w-3.5 h-3.5 text-violet-500 animate-pulse" />
            Immersive Student Profile
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Language Learning Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Increase your streak, review speaking challenges, and sharpen your CEFR level metrics.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl shrink-0">
          <div className="text-center px-4 border-r border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Streak</span>
            <span className="text-2xl font-black text-rose-500 flex items-center justify-center gap-1 mt-0.5 animate-bounce">
              🔥 {streak}
            </span>
          </div>
          <div className="text-center px-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Skill Points</span>
            <span className="text-2xl font-black text-indigo-600 block mt-0.5">{score} pts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Practice tracks */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Active Practice Challenges
          </h2>

          <div className="space-y-4" id="practice-cards">
            {/* Pronunciation block */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shrink-0">
                  <Mic className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">CEFR Speech Pronunciation</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Practice correct vowel voicing and tone contours. Click record to analyze acoustic outputs.
                  </p>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider block mt-3 w-fit">
                    Est. Time: 5 Mins
                  </span>
                </div>
              </div>
              <button
                onClick={handleChallengeSubmit}
                disabled={completedChallenge}
                className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs shrink-0 transition-all cursor-pointer ${
                  completedChallenge
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center gap-1.5'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/10'
                }`}
                id="btn-pronunciation-challenge"
              >
                {completedChallenge ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Completed!
                  </>
                ) : (
                  'Start Challenge (+1 Streak)'
                )}
              </button>
            </div>

            {/* Listening module */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 flex flex-col sm:flex-row items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="p-4 rounded-2xl bg-violet-50 border border-violet-100 text-violet-600 shrink-0">
                  <Headphones className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Acoustic Comprehension Drill</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Listen to natural idiomatic speakers and answer contextual comprehension questionnaires.
                  </p>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider block mt-3 w-fit">
                    Est. Time: 8 Mins
                  </span>
                </div>
              </div>
              <button className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs shrink-0 cursor-pointer transition-all">
                Launch Audio
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar performance metrics */}
        <div className="space-y-6">
          <h2 className="text-lg font-extrabold text-slate-800 tracking-tight">
            Target CEFR Roadmap
          </h2>
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                <span>Intermediate (B2) Progress</span>
                <span className="text-indigo-600">75% Complete</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Vocabulary count</span>
                <span className="font-bold text-slate-800">1,240 Words</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Grammar score</span>
                <span className="font-bold text-slate-800">88% (Excellent)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Average fluency</span>
                <span className="font-bold text-indigo-600">B2 Mastery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
