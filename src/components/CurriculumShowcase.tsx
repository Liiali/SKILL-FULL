import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURRICULUM_LEVELS } from '../data';
import { Award, Clock, BookOpen, Layers, CheckCircle, RefreshCw, XCircle, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

interface CurriculumShowcaseProps {
  onStartLearning: () => void;
  selectedLevelId?: string;
}

export default function CurriculumShowcase({ onStartLearning, selectedLevelId = 'A1' }: CurriculumShowcaseProps) {
  const [activeLevelId, setActiveLevelId] = useState(selectedLevelId);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    setActiveLevelId(selectedLevelId);
    setSelectedAns(null);
    setQuizSubmitted(false);
  }, [selectedLevelId]);

  const activeLevel = CURRICULUM_LEVELS.find((l) => l.id === activeLevelId) || CURRICULUM_LEVELS[0];

  const handleLevelChange = (id: string) => {
    setActiveLevelId(id);
    setSelectedAns(null);
    setQuizSubmitted(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (quizSubmitted) return;
    setSelectedAns(idx);
    setQuizSubmitted(true);
  };

  const isCorrect = selectedAns === activeLevel.sampleQuiz.correctIndex;

  return (
    <section id="levels" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block"
            id="curriculum-badge"
          >
            CEFR STANDARDIZED CURRICULUM
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 mt-4 leading-tight"
            id="curriculum-title"
          >
            Syllabus Engineered for Native Fluency
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-600 leading-relaxed font-light"
            id="curriculum-subtitle"
          >
            Progress systematically across 6 internationally recognized levels. Each tier is color-coded with customized milestones, hours, expected vocabulary, and real-time interactive diagnostics.
          </motion.p>
        </div>

        {/* Horizontal Level Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12" id="curriculum-tabs-container">
          {CURRICULUM_LEVELS.map((level) => {
            const isActive = level.id === activeLevelId;
            return (
              <button
                key={level.id}
                id={`btn-level-${level.id}`}
                onClick={() => handleLevelChange(level.id)}
                className={`relative px-4.5 py-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-350 shadow-sm'
                }`}
              >
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {level.id}
                </span>
                <span>{level.name}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Level Display Dashboard Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevelId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            id="curriculum-dashboard-grid"
          >
            {/* Left Column: Level details & stats & topics */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl text-left flex flex-col justify-between backdrop-blur-sm">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${activeLevel.badgeColor}`}>
                    LEVEL {activeLevel.id}
                  </span>
                  <span className="text-sm font-bold text-slate-400">•</span>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900">
                    {activeLevel.name} &mdash; <span className="text-indigo-600 font-bold">{activeLevel.title}</span>
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8 font-light">
                  {activeLevel.description}
                </p>

                {/* Hour and Topic Metrics */}
                <div className="grid grid-cols-3 gap-3.5 mb-8">
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                    <Clock className="w-5.5 h-5.5 text-indigo-600 mb-1.5" />
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Average Hours</span>
                    <span className="block text-md font-black text-slate-900 mt-0.5">{activeLevel.stats.hours} hrs</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                    <BookOpen className="w-5.5 h-5.5 text-emerald-600 mb-1.5" />
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Lectures</span>
                    <span className="block text-md font-black text-slate-900 mt-0.5">{activeLevel.stats.lessons} Modules</span>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                    <Layers className="w-5.5 h-5.5 text-violet-600 mb-1.5" />
                    <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-wider">Vocab Limit</span>
                    <span className="block text-md font-black text-slate-900 mt-0.5">{activeLevel.stats.vocabWords}+ Words</span>
                  </div>
                </div>

                {/* Core Syllabus Key Topics */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">CORE SYLLABUS TOPICS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLevel.keyTopics.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs font-medium text-slate-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start learning navigation button */}
              <button
                id={`btn-curriculum-enroll-${activeLevel.id}`}
                onClick={onStartLearning}
                className="mt-6 w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/15 cursor-pointer self-start"
              >
                Enroll in {activeLevel.id} Syllabus
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Interactive level diagnostic quiz */}
            <div className="lg:col-span-5 bg-slate-50 text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xl text-left flex flex-col justify-between backdrop-blur-sm">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                      Level {activeLevel.id} Sample Quiz
                    </span>
                  </div>
                  <span className="text-[9px] font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-mono">
                    DIAGNOSTIC
                  </span>
                </div>

                <p className="text-sm text-slate-800 font-bold mb-5 leading-relaxed">
                  {activeLevel.sampleQuiz.question}
                </p>

                {/* Quiz options */}
                <div className="space-y-3">
                  {activeLevel.sampleQuiz.options.map((opt, oIdx) => {
                    const isSelected = selectedAns === oIdx;
                    const isCorrectOption = oIdx === activeLevel.sampleQuiz.correctIndex;
                    
                    let btnClass = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm';
                    if (quizSubmitted) {
                      if (isSelected) {
                        btnClass = isCorrectOption 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-sm scale-[1.01]' 
                          : 'bg-red-50 border-red-400 text-red-800 shadow-sm scale-[0.99]';
                      } else if (isCorrectOption) {
                        btnClass = 'bg-emerald-50/50 border-emerald-300 text-emerald-700';
                      } else {
                        btnClass = 'bg-slate-50 border-slate-100 text-slate-400';
                      }
                    } else if (isSelected) {
                      btnClass = 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleOptionSelect(oIdx)}
                        className={`w-full p-3.5 text-left rounded-xl border text-xs font-semibold font-mono transition-all duration-300 flex justify-between items-center cursor-pointer ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isSelected && (
                          isCorrectOption 
                            ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            : <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedbacks of quiz */}
              <AnimatePresence>
                {quizSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-5 border-t border-slate-200"
                    id="curriculum-quiz-feedback"
                  >
                    <div className="flex gap-3 items-start bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h5 className={`text-xs font-bold flex items-center gap-1.5 ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                          <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                          {isCorrect ? 'Excellent! Perfect answer!' : 'Incorrect option'}
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1">
                          {activeLevel.sampleQuiz.explanation}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5 mt-4">
                      <button
                        onClick={() => {
                          setSelectedAns(null);
                          setQuizSubmitted(false);
                        }}
                        className="py-2 px-3 border border-slate-250 hover:border-slate-350 bg-white text-[10px] text-slate-600 font-bold uppercase tracking-wider rounded-lg hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <RefreshCw className="w-3 h-3 text-indigo-600" />
                        Retry Level Question
                      </button>
                      <button
                        onClick={onStartLearning}
                        className="py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-100 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        Full Diagnostic Test
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
