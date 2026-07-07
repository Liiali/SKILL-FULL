import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Flame, BookOpen, Compass, CheckCircle2, ChevronRight, PlayCircle, Sparkles, MessageCircle, Volume2 } from 'lucide-react';

export default function StudentPortal({ userName }: { userName: string }) {
  const [streak, setStreak] = useState(128);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [vocabStep, setVocabStep] = useState<'question' | 'correct' | 'incorrect'>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleCheckIn = () => {
    if (!hasCheckedIn) {
      setStreak((prev) => prev + 1);
      setHasCheckedIn(true);
    }
  };

  const vocabularyChallenge = {
    word: 'Capricious',
    pronunciation: '/kəˈprɪʃəs/',
    partOfSpeech: 'adjective',
    definition: 'Given to sudden and unaccountable changes of mood or behavior.',
    options: [
      { id: 0, text: 'Extremely polite or graceful' },
      { id: 1, text: 'Fickle, unstable, or unpredictable' },
      { id: 2, text: 'Highly intellectual or scholarly' },
      { id: 3, text: 'Resistant to light or radiation' },
    ],
    correctId: 1,
    explanation: 'Capricious is derived from the Italian "capriccio" (sudden start), meaning unpredictable or impulsive changes.',
  };

  const handleVocabAnswer = (id: number) => {
    setSelectedAnswer(id);
    if (id === vocabularyChallenge.correctId) {
      setVocabStep('correct');
    } else {
      setVocabStep('incorrect');
    }
  };

  const resetVocab = () => {
    setSelectedAnswer(null);
    setVocabStep('question');
  };

  return (
    <div className="space-y-6" id="student-portal-container">
      {/* Top Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-xl font-display shadow-sm">
            {userName.charAt(0)}
          </div>
          <div className="text-left">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">Student Account</span>
            <h2 className="text-2xl font-black font-display text-slate-900 mt-0.5">Welcome, {userName}!</h2>
            <p className="text-xs text-slate-500 font-light mt-1">Excellent progress! Your B2 speaking diagnostic matches top 1% parameters.</p>
          </div>
        </div>

        {/* Live Streak Widget */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-3 rounded-2xl shrink-0 w-full sm:w-auto z-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500">
              <Flame className="w-5.5 h-5.5 fill-amber-500 animate-pulse" />
            </div>
            <div className="text-left">
              <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider font-mono">Study Streak</span>
              <span className="block text-sm font-black text-slate-900 font-mono">{streak} Days</span>
            </div>
          </div>
          <button
            onClick={handleCheckIn}
            disabled={hasCheckedIn}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              hasCheckedIn
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-150 cursor-default'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md hover:scale-[1.02]'
            }`}
          >
            {hasCheckedIn ? 'Checked In' : 'Log Daily Check-in'}
          </button>
        </div>
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Diagnostics & Daily Challenge */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Level Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm tracking-tight text-slate-900">Current English Level (CEFR)</h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded text-[9px] font-mono font-black">VERIFIED</span>
            </div>

            <div className="flex items-center gap-5 bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white font-black text-2xl font-mono flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                B2
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider font-mono">Advanced Intermediate</span>
                <h4 className="text-md font-bold text-slate-900 mt-0.5">Spontaneous Professional Speaker</h4>
                <p className="text-xs text-slate-500 font-light mt-1">Can understand main ideas of complex text, interact with native speakers without strain, and produce clear, detailed speech.</p>
              </div>
            </div>

            {/* Level metrics */}
            <div className="grid grid-cols-3 gap-3.5 mt-5 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Hours logged</span>
                <span className="block text-md font-black text-slate-900 font-mono mt-0.5">142 hr</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Vocabulary Words</span>
                <span className="block text-md font-black text-slate-900 font-mono mt-0.5">3,240</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-150">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Test Accuracy</span>
                <span className="block text-md font-black text-emerald-600 font-mono mt-0.5">94.8%</span>
              </div>
            </div>
          </div>

          {/* Daily Vocabulary Challenge */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm tracking-tight text-slate-900">Daily Vocabulary Challenge</h3>
              </div>
              <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-bold">15 XP BONUS</span>
            </div>

            <div className="mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-md font-extrabold text-indigo-600">{vocabularyChallenge.word}</span>
                <span className="text-xs text-slate-400 font-mono">{vocabularyChallenge.pronunciation}</span>
                <span className="text-[9px] bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.2 rounded uppercase font-mono">{vocabularyChallenge.partOfSpeech}</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 italic font-light">Question: What is the correct definition of this word?</p>
            </div>

            {vocabStep === 'question' && (
              <div className="space-y-2">
                {vocabularyChallenge.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleVocabAnswer(opt.id)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-slate-350 hover:bg-slate-50 transition-all cursor-pointer text-xs font-semibold text-slate-700 flex justify-between items-center"
                  >
                    <span>{opt.text}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}

            {vocabStep === 'correct' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-bold text-emerald-800">Correct Answer! (+15 XP)</span>
                    <p className="text-xs text-emerald-700 mt-0.5 font-light font-sans leading-relaxed">{vocabularyChallenge.definition}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 font-light italic bg-slate-50 p-3 rounded-xl border border-slate-150">
                  <strong>Explanation:</strong> {vocabularyChallenge.explanation}
                </p>
                <button
                  onClick={resetVocab}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-650 hover:bg-slate-50 cursor-pointer"
                >
                  Try Another Challenge
                </button>
              </div>
            )}

            {vocabStep === 'incorrect' && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-150 rounded-2xl flex items-start gap-3">
                  <span className="text-lg mt-0.5">⚠️</span>
                  <div>
                    <span className="block text-xs font-bold text-red-800">Incorrect Choice</span>
                    <p className="text-xs text-red-700 mt-0.5 font-light">Please try again to unlock the CEFR bonus XP logs!</p>
                  </div>
                </div>
                <button
                  onClick={resetVocab}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold uppercase cursor-pointer shadow-md"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Next Lesson & Live Rooms */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Next Lesson Schedule */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm tracking-tight text-slate-900">Next Live Lesson</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest font-mono">Advanced Grammar</span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">Subjective Inversions & Phonetic Shifts</h4>
                  </div>
                  <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded font-mono">15:00 UTC</span>
                </div>
                
                <div className="flex items-center gap-3.5 mt-4 pt-4 border-t border-slate-200">
                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-xs">
                    SA
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-xs font-bold text-slate-800">Dr. Sarah Adams</span>
                    <span className="block text-[10px] text-slate-500 font-light">Senior Academic Advisor</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                <PlayCircle className="w-4.5 h-4.5" />
                Launch Virtual Classroom
              </button>
            </div>
          </div>

          {/* Peer Speaking Rooms */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-left">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="font-black font-display text-sm tracking-tight text-slate-900">24/7 AI Speaking Lounge</h3>
              </div>
              <span className="px-1.5 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[8px] font-mono font-black rounded">UNLIMITED</span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
              Practicing with our real-time AI conversation partner handles native pronunciation accent coaching with instantaneous error review feedback.
            </p>

            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Volume2 className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <span className="block text-[8px] text-slate-400 font-mono font-bold uppercase">AI ASSISTANT IS ACTIVE</span>
                  <span className="block text-xs font-semibold text-slate-800">Ready to speak about "Tourism & Jobs"</span>
                </div>
              </div>
              <button className="p-2 bg-indigo-600 text-white rounded-lg shadow-md cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
