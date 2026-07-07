import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle, HelpCircle, ArrowRight, Play, Compass, Check, AlertCircle } from 'lucide-react';

interface StudentPlacementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (levelId: string) => void;
}

export default function StudentPlacementModal({ isOpen, onClose, onSelectLevel }: StudentPlacementModalProps) {
  const [step, setStep] = useState(1); // 1: Intro, 2: Questions, 3: Recommendation
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const quizQuestions = [
    {
      id: 1,
      difficulty: 'A2-B1 level',
      question: "Choose the correct pronoun: 'I have a younger sister. ___ name is Jennifer.'",
      options: ['His', 'Her', 'Their', 'Its'],
      correct: 1,
      explanation: "We use the female possessive adjective 'Her' when referencing a sister."
    },
    {
      id: 2,
      difficulty: 'B1-B2 level',
      question: "Complete the sentence: 'I haven't traveled overseas ___ the pandemic started in 2020.'",
      options: ['for', 'since', 'during', 'while'],
      correct: 1,
      explanation: "'Since' is used to define a specific starting point in time in the past up to the present."
    },
    {
      id: 3,
      difficulty: 'C1-C2 level',
      question: "Which inversion is grammatically perfect? 'Hardly ___ entered the house when the storm began.'",
      options: ['I had', 'had I', 'did I', 'I did'],
      correct: 1,
      explanation: "In literary inversion with negative adverbs like 'hardly' or 'scarcely', auxiliary verb precedes subject: 'Hardly had I'."
    }
  ];

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setStep(3);
    }
  };

  const getPlacementResult = () => {
    const correctCount = answers.reduce((acc, ans, idx) => {
      return ans === quizQuestions[idx].correct ? acc + 1 : acc;
    }, 0);

    if (correctCount === 0) {
      return {
        level: 'A1-A2',
        title: 'Beginner / Elementary Path',
        description: 'You are ready to master the core structures, build sentence confidence, and express daily survival scenarios. Let\'s build the foundation!',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        gradient: 'from-emerald-500 to-teal-600',
        score: correctCount
      };
    } else if (correctCount === 1 || correctCount === 2) {
      return {
        level: 'B1-B2',
        title: 'Intermediate / Upper-Intermediate Path',
        description: 'You have solid English fundamentals! We will focus on native phrasal verbs, hypotheticals, advanced dialogue pacing, and smooth conversation.',
        badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
        gradient: 'from-indigo-500 to-blue-600',
        score: correctCount
      };
    } else {
      return {
        level: 'C1-C2',
        title: 'Advanced / Native Proficiency Path',
        description: 'Spectacular result! You grasp complex structures. We recommend C1 Business/Creative or C2 Nuanced idioms and inversion to reach ultimate native fluency.',
        badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
        gradient: 'from-violet-500 to-pink-600',
        score: correctCount
      };
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#04060b]/80 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-250"
          id="placement-modal"
        >
          {/* Top border decoration */}
          <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-indigo-500 to-violet-600" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          <div className="p-6 md:p-8">
            {step === 1 ? (
              <div className="text-center" id="placement-intro">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100">
                  <Compass className="w-5.5 h-5.5 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                
                <h2 className="text-2xl font-black font-display text-slate-900">Find Your Starting Level</h2>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-light leading-relaxed">
                  Take our 1-minute smart diagnostic to find out if you should start at Beginner A1 or Elite Advanced levels.
                </p>

                <div className="my-6 p-4.5 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-normal font-light">
                      <strong className="text-slate-900 font-semibold">3 Interactive Challenges</strong> exploring complex syntax, prepositions, and inversions.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-normal font-light">
                      <strong className="text-slate-900 font-semibold">Standardized CEFR Alignment</strong> mapped exactly to the European official guidelines.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-700 leading-normal font-light">
                      <strong className="text-slate-900 font-semibold">Immediate Syllabus Unlock</strong> corresponding directly to your diagnostic output.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
                  >
                    Start Smart Test
                    <Play className="w-3.5 h-3.5 fill-white text-transparent" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectLevel('A1');
                      onClose();
                    }}
                    className="flex-1 py-3 border border-slate-200 hover:border-slate-300 text-slate-650 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    I am a Beginner (A1)
                  </button>
                </div>
              </div>
            ) : step === 2 ? (
              <div id="placement-quiz">
                {/* Quiz HUD */}
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4.5 h-4.5 text-indigo-600" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">Linguistic Audit</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 font-mono">
                    CHALLENGE {currentQuestionIdx + 1} OF {quizQuestions.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-6 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all duration-300"
                    style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="mb-6">
                  <span className="inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-650 border border-indigo-100 mb-2.5 font-mono">
                    {quizQuestions[currentQuestionIdx].difficulty}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-display">
                    {quizQuestions[currentQuestionIdx].question}
                  </h3>
                </div>

                {/* Options List */}
                <div className="space-y-2.5">
                  {quizQuestions[currentQuestionIdx].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setSelectedOption(oIdx)}
                      className={`w-full p-3.5 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all flex justify-between items-center cursor-pointer ${
                        selectedOption === oIdx
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-900 font-semibold shadow-inner'
                          : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 bg-white shadow-sm'
                      }`}
                    >
                      <span>{opt}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedOption === oIdx
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}>
                        {selectedOption === oIdx && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end">
                  <button
                    disabled={selectedOption === null}
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
                  >
                    {currentQuestionIdx === quizQuestions.length - 1 ? 'Complete Assessment' : 'Next Challenge'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center" id="placement-results">
                {(() => {
                  const res = getPlacementResult();
                  return (
                    <div>
                      <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-5">
                        <Award className="w-5.5 h-5.5 animate-bounce" />
                      </div>

                      <h2 className="text-2xl font-black font-display text-slate-900">Linguistic Diagnostic Complete!</h2>
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mt-1.5">SUCCESSFULLY ASSESSED • ACCURACY: {res.score} / {quizQuestions.length}</p>

                      <div className="my-6 p-5 bg-slate-50 rounded-2xl text-left border border-slate-200 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex justify-between items-center mb-3.5">
                          <span className="text-[9px] uppercase font-black tracking-widest text-indigo-600 font-mono">RECOMMENDED PLACEMENT</span>
                          <span className="text-sm font-black bg-indigo-600 text-white px-2 py-0.5 rounded font-mono">
                            {res.level}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 mb-2 font-display">{res.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">{res.description}</p>
                      </div>

                      {/* Brief rationale for transparency */}
                      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 text-left mb-6 flex gap-3">
                        <AlertCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[10px] font-black text-indigo-700 uppercase tracking-widest font-mono">Why was I assigned here?</h5>
                          <p className="text-[10px] text-slate-600 mt-1 leading-relaxed font-light">
                            Our diagnostic measures advanced phonetic triggers and inversion patterns. Based on your scoring, this CEFR placement skips redundantly simple structures to optimize your path.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            const targetLvl = res.level.split('-')[0]; // A1, B1, C1
                            onSelectLevel(targetLvl);
                            onClose();
                          }}
                          className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10"
                        >
                          Unlock {res.level} Course
                        </button>
                        <button
                          onClick={resetQuiz}
                          className="flex-1 py-3 border border-slate-200 hover:border-slate-350 text-slate-650 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-all cursor-pointer"
                        >
                          Retake Test
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
