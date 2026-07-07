import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight, Award, CheckCircle2, Star, Flame, Trophy, Volume2, Globe } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({ onStartLearning, scrollToSection }: HeroProps) {
  const [interactiveStreak, setInteractiveStreak] = useState(128);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (option === 'seeing') {
      setAnsweredCorrectly(true);
      setInteractiveStreak(129);
      setShowExplanation(true);
    } else {
      setAnsweredCorrectly(false);
      setInteractiveStreak(128);
      setShowExplanation(true);
    }
  };

  const resetHeroInteractive = () => {
    setSelectedOption(null);
    setAnsweredCorrectly(null);
    setShowExplanation(false);
  };

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden bg-slate-50/50">
      {/* Dynamic Background Mesh Grid & Glow Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Radial Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-violet-600/10 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
        
        {/* Subtle Cyber Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text / Marketing Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Premium Starburst Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-xs font-semibold text-indigo-600 shadow-sm"
              id="hero-premium-pill"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="tracking-wide">PRESTIGIOUS GLOBAL ENGLISH ACADEMY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] text-slate-900"
                id="hero-main-title"
              >
                Master English. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                  Unlock the World.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-light"
                id="hero-subtitle"
              >
                A premium 6-level structured curriculum designed by global linguists to take you from absolute beginner to native-level fluency. Gain confidence, speak flawlessly, and accelerate your global career.
              </motion.p>
            </div>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
              id="hero-cta-buttons"
            >
              <button
                id="btn-hero-learn-free"
                onClick={onStartLearning}
                className="relative px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5 duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Award className="w-4.5 h-4.5 text-amber-300" />
                Start Learning Now (Free)
              </button>
              
              <button
                id="btn-hero-view-results"
                onClick={() => scrollToSection('reviews')}
                className="px-8 py-4 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all hover:-translate-y-0.5 duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Globe className="w-4.5 h-4.5 text-indigo-600" />
                View Student Results
              </button>
            </motion.div>

            {/* Premium Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-200 max-w-lg"
              id="hero-trust-metrics"
            >
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900">150K+</span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Learners Globally</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900">6 Levels</span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">A1 to C2 CEFR</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 / 5</span>
                <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Average Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Interactive HUD Simulator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-5 relative"
            id="hero-interactive-hud"
          >
            {/* Ambient Background Gradient for the Simulator Card */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl blur-xl opacity-20 animate-pulse" style={{ animationDuration: '6s' }} />

            {/* Interactive HUD Card Frame */}
            <div className="relative rounded-2xl bg-white text-slate-900 shadow-2xl border border-indigo-100 p-6 overflow-hidden">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                    Live Lesson HUD Simulator
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" style={{ animationDuration: '2s' }} />
                  <span className="text-xs font-black text-indigo-600 font-mono">
                    STREAK: {interactiveStreak}D
                  </span>
                </div>
              </div>

              {/* Course Progression Tracker */}
              <div className="flex items-center gap-3.5 mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                  <Trophy className="w-5.5 h-5.5 text-indigo-600" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase font-black text-indigo-600/80 tracking-widest text-left">Active Level Target</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black font-display text-slate-900">B2 Upper-Intermediate</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100 font-mono">CEFR</span>
                  </div>
                </div>
              </div>

              {/* Question UI Box */}
              <div className="bg-slate-50/50 rounded-xl p-4.5 border border-slate-200/80 mb-4">
                <div className="flex items-center gap-2 text-indigo-600 mb-2">
                  <Volume2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-[9px] font-bold font-mono tracking-wider uppercase">Advanced Grammar Challenge</span>
                </div>
                
                <p className="text-sm text-slate-700 font-medium leading-relaxed text-left">
                  Choose the correct verb form for perfect English syntax:
                </p>
                
                <p className="my-3.5 text-md font-bold text-slate-900 bg-white py-3 px-4 rounded-lg border border-slate-200 text-center font-mono shadow-sm">
                  &quot;I am really looking forward to <span className="underline decoration-indigo-600 decoration-2 underline-offset-4 text-indigo-600 font-black">       ?       </span> you tomorrow.&quot;
                </p>

                {/* Question Options */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { id: 'see', label: 'see (Infinitive)' },
                    { id: 'seeing', label: 'seeing (Gerund)' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold font-mono transition-all border text-center cursor-pointer ${
                        selectedOption === opt.id
                          ? opt.id === 'seeing'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm scale-[1.02]'
                            : 'bg-red-50 border-red-300 text-red-700 shadow-sm scale-[0.98]'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-350'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Explanation Output */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-200/80 overflow-hidden"
                      id="hero-quiz-explanation"
                    >
                      {answeredCorrectly ? (
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-1.5">
                            <CheckCircle2 className="w-4 h-4 fill-emerald-500/10 text-emerald-500" />
                            <span>Correct! Streak incremented! 🎉</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            We use the gerund <strong className="text-emerald-600">seeing</strong> because &quot;to&quot; in the expression &quot;looking forward to&quot; acts as a preposition, not an infinitive marker.
                          </p>
                        </div>
                      ) : (
                        <div className="text-left">
                          <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold mb-1.5">
                            <span className="w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[10px] font-extrabold">X</span>
                            <span>Incorrect choice</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Excellent try! But in &quot;looking forward to&quot;, &quot;to&quot; is a preposition. Hence, it must be followed by a gerund noun form: <strong className="text-emerald-600 font-semibold">seeing</strong>.
                          </p>
                        </div>
                      )}
                      
                      <button
                        onClick={resetHeroInteractive}
                        className="mt-3.5 w-full py-2 bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-600 hover:text-slate-900 font-bold uppercase tracking-wider rounded-lg border border-slate-200 transition-colors cursor-pointer"
                      >
                        Try Diagnostic Placement Test instead
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mini Real-time Diagnostics Indicator */}
              <div className="grid grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500 animate-pulse" />
                  <div className="text-left">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Linguistic Rating</span>
                    <span className="block text-xs font-bold text-slate-700">Native Grade A+</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-500 animate-bounce" style={{ animationDuration: '3s' }} />
                  <div className="text-left">
                    <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">AI Speech Score</span>
                    <span className="block text-xs font-bold text-slate-700">98% Accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Float badge 1 */}
            <div className="absolute -top-6 -left-6 bg-white text-slate-800 border border-slate-200 rounded-xl p-3 shadow-xl flex items-center gap-2.5 md:flex hidden animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-8.5 h-8.5 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500">
                <Flame className="w-4.5 h-4.5 fill-emerald-500 text-transparent" />
              </div>
              <div className="text-left">
                <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">SUCCESS RATE</span>
                <span className="block text-xs font-black text-emerald-600">99.2% Score</span>
              </div>
            </div>

            {/* Float badge 2 */}
            <div className="absolute -bottom-6 -right-6 bg-white text-slate-800 border border-slate-200 rounded-xl p-3 shadow-xl flex items-center gap-2.5 md:flex hidden animate-bounce" style={{ animationDuration: '5s' }}>
              <div className="w-8.5 h-8.5 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Globe className="w-4.5 h-4.5 text-indigo-600" />
              </div>
              <div className="text-left">
                <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">NATIVE COACHES</span>
                <span className="block text-xs font-black text-indigo-300">CEFR Certified</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
