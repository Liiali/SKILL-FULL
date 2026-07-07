import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Award, BarChart2, MessageSquare, GraduationCap, Check, Mic, Sparkles, TrendingUp, Users, CheckCircle2, Star } from 'lucide-react';

type PillarId = 'ai-lecturer' | 'student-hub' | 'progress-tracking' | 'speaking-rooms' | 'mentorship';

interface PillarDetail {
  id: PillarId;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  mockupTitle: string;
}

const PILLARS_DATA: PillarDetail[] = [
  {
    id: 'ai-lecturer',
    title: 'Interactive AI Lecturer',
    subtitle: 'Instant Pronunciation Scoring',
    description: 'Get immediate 24/7 voice feedback, grammar correction, and acoustic flow metrics powered by proprietary conversational modeling. Perfect your rhythm and tone on demand.',
    benefits: [
      'Real-time accent & phonetic analysis',
      'Instant syntax & sentence structure suggestions',
      'Bite-sized conversational practice drills',
      'Dynamic speed & cadence tracking metrics'
    ],
    mockupTitle: 'Acoustic AI Speech Trainer HUD'
  },
  {
    id: 'student-hub',
    title: 'Gamified Student Hub',
    subtitle: 'Keep Your Streaks Alive',
    description: 'Immerse yourself in a beautifully gamified workspace designed for daily commitment. Earn XP points, unlock CEFR level badges, and keep your daily streak alive.',
    benefits: [
      'Interactive visual quest roadmaps',
      'Vocab flashcards with spaced repetition',
      'Weekly global & regional leaderboards',
      'Daily challenge quests & skill badges'
    ],
    mockupTitle: 'Student Journey Workspace'
  },
  {
    id: 'progress-tracking',
    title: 'Visual Growth Portal',
    subtitle: 'Data-Driven Mastery',
    description: 'Track your linguistic development with pinpoint precision. Access real-time grading reports, speech recordings archive, and standardized level transcripts.',
    benefits: [
      'Comprehensive CEFR level progress graphs',
      'Speaking & vocabulary milestone tracking',
      'Detailed sub-skill grades (Listening, Speaking, Writing)',
      'Secure digital certificates of qualification'
    ],
    mockupTitle: 'Analytical Mastery Profile'
  },
  {
    id: 'speaking-rooms',
    title: 'Global Speaking Rooms',
    subtitle: 'Live Peer Collaboration',
    description: 'Connect instantly with thousands of motivated English learners at your exact CEFR level worldwide. Engage in fluid, structured topics and build cross-cultural friendships.',
    benefits: [
      'Level-locked round-table speaking sessions',
      'Curated topic guides & talking points',
      'Interactive peer feedback prompts',
      'Real-time collaborative group quizzes'
    ],
    mockupTitle: 'Peer-to-Peer Speaking Lounge'
  },
  {
    id: 'mentorship',
    title: 'Expert Human Guidance',
    subtitle: 'Elite Native Mentoring',
    description: 'Accelerate your transformation with weekly live reviews from expert native coaches. Receive detailed comments on complex essays and targeted coaching.',
    benefits: [
      'Personalized essay grading & grammar reviews',
      '1-on-1 virtual advice & goal alignment',
      'Tailored speaking diagnostic feedback',
      'Official accredited competency credentials'
    ],
    mockupTitle: 'Senior Academic Advisor Comments'
  }
];

export default function LearningPillars() {
  const [activePillarId, setActivePillarId] = useState<PillarId>('ai-lecturer');

  const activePillar = PILLARS_DATA.find((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const getPillarIcon = (id: PillarId, className = 'w-5.5 h-5.5') => {
    switch (id) {
      case 'ai-lecturer':
        return <Bot className={className} />;
      case 'student-hub':
        return <Award className={className} />;
      case 'progress-tracking':
        return <BarChart2 className={className} />;
      case 'speaking-rooms':
        return <MessageSquare className={className} />;
      case 'mentorship':
        return <GraduationCap className={className} />;
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-12 right-12 w-[350px] h-[350px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-150 px-3 py-1 rounded-full inline-block" id="pillars-badge">
            The 5-Dimension Learning Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 mt-4 leading-tight" id="pillars-title">
            The Ultimate Learning Pillars
          </h2>
          <p className="mt-4 text-base text-slate-600 leading-relaxed font-light" id="pillars-subtitle">
            Say goodbye to dull memorization. Our award-winning ecosystem integrates conversational artificial intelligence, continuous gamified streaks, live international group rooms, and real-time human expertise.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Navigation: Pillar Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col gap-3" id="pillars-tabs-list">
            <span className="text-[10px] font-black text-indigo-600/80 uppercase tracking-widest text-left pl-2.5 mb-2 block">
              SELECT CORE METHODOLOGY
            </span>
            
            {PILLARS_DATA.map((pillar) => {
              const isActive = pillar.id === activePillarId;
              return (
                <button
                  key={pillar.id}
                  id={`btn-pillar-${pillar.id}`}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-xl scale-[1.01]'
                      : 'bg-white border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-white text-indigo-600 shadow-md' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}>
                    {getPillarIcon(pillar.id)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-sm font-bold font-display tracking-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>{pillar.title}</h4>
                      <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase border tracking-wider font-mono shrink-0 ${
                        isActive ? 'bg-white/20 text-white border-white/30' : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {pillar.subtitle}
                      </span>
                    </div>
                    <p className={`text-xs mt-1.5 leading-relaxed truncate ${isActive ? 'text-indigo-50' : 'text-slate-500 font-light'}`}>
                      {pillar.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Preview HUD / Simulator */}
          <div className="lg:col-span-7" id="pillars-preview-panel">
            <div className="h-full bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-250 shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

              {/* HUD Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-400">
                    {activePillar.mockupTitle}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                </div>
              </div>

              {/* Animated Core Simulation Area */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillarId}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="text-left space-y-6"
                  >
                    <div className="flex flex-wrap items-center gap-3.5">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                        {getPillarIcon(activePillarId, 'w-6 h-6')}
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase font-bold text-slate-400 tracking-widest font-mono">CORE SYSTEM PILLAR</span>
                        <h4 className="text-md sm:text-lg font-black text-slate-900 font-display tracking-tight">{activePillar.title}</h4>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      {activePillar.description}
                    </p>

                    {/* Features checklist inside simulator */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                      <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono mb-3.5">KEY TRANSFORMATION OUTCOMES</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {activePillar.benefits.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-xs font-semibold text-slate-700 leading-tight">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Simulated Interactive Component Widget */}
                    <div className="pt-2">
                      {activePillarId === 'ai-lecturer' && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3.5">
                            <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 shrink-0 animate-pulse">
                              <Mic className="w-5 h-5 text-indigo-600" />
                              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-[8px] text-indigo-600 font-bold uppercase tracking-wider font-mono">YOUR VOICE RECORDING</span>
                              <span className="block text-xs font-bold text-slate-700 truncate italic">&quot;This learning approach is incredibly rewarding.&quot;</span>
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest">AI ACCURACY</span>
                            <span className="block text-sm font-black text-emerald-600 font-mono">98.5% SCORE</span>
                          </div>
                        </div>
                      )}

                      {activePillarId === 'student-hub' && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono">DAILY VOCAB STREAK</span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-black text-slate-900 font-mono">🔥 128 DAYS</span>
                              <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-600 px-1.5 py-0.2 rounded-full font-bold">TOP 1%</span>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider font-mono">LEVEL MILESTONE PROGRESS</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full" style={{ width: '74%' }} />
                              </div>
                              <span className="text-[10px] font-black text-slate-600 font-mono">74%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePillarId === 'progress-tracking' && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider font-mono">SKILL PERFORMANCE BREAKDOWN</span>
                            <TrendingUp className="w-4.5 h-4.5 text-indigo-600" />
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                                <span>Speaking (Acoustics & Rhythm)</span>
                                <span className="text-emerald-600 font-bold font-mono">Grade: A+ (98%)</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '98%' }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] text-slate-500 font-medium mb-1">
                                <span>Grammar & Synonyms Diversity</span>
                                <span className="text-indigo-600 font-bold font-mono">Grade: A (92%)</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '92%' }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activePillarId === 'speaking-rooms' && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider font-mono">ACTIVE PEER PANEL (B2 LEVEL)</span>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[9px] font-mono">
                              <Users className="w-3.5 h-3.5" /> 24,190 Active Now
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { name: 'Chloe', country: '🇫🇷 France', status: 'Speaking...' },
                              { name: 'Hiro', country: '🇯🇵 Japan', status: 'Listening' },
                              { name: 'Elena', country: '🇧🇷 Brazil', status: 'Listening' },
                              { name: 'Sven', country: '🇩🇪 Germany', status: 'Waiting' }
                            ].map((peer, idx) => (
                              <div key={idx} className="bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-150 flex items-center justify-between gap-3 text-[11px]">
                                <span className="font-bold text-slate-800">{peer.name} <span className="text-[10px] text-slate-500">{peer.country}</span></span>
                                <span className={`text-[9px] font-bold ${peer.status === 'Speaking...' ? 'text-emerald-600' : 'text-slate-500'}`}>{peer.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {activePillarId === 'mentorship' && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200 text-left shadow-sm">
                          <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-bold text-indigo-600 shrink-0">
                              SA
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">Dr. Sarah Adams</span>
                                <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-150 px-1.5 py-0.2 rounded font-mono font-bold">SENIOR ACADEMIC MENTOR</span>
                              </div>
                              <span className="block text-[10px] text-slate-400 mt-0.5 font-medium">B2 Advanced Essay Review</span>
                              <p className="text-[11px] text-slate-600 leading-normal mt-2 italic">
                                &quot;Excellent syntax structure, Hiro! However, your use of the subjective mood could be slightly refined in the third paragraph to sound fully natural. I have unlocked a custom module for you.&quot;
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
