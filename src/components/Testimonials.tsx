import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  country: string;
  flag: string;
  image: string;
  rating: number;
  highlight: string;
  content: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Chloe Laurent',
    role: 'UX Designer at ParisTech',
    country: 'France',
    flag: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: 'Passed my IELTS with an 8.5 band score!',
    content: 'The 24/7 AI Lecturer completely changed how I practice speaking. I got instant pronunciation correction and went from struggling B1 to an elite C1 level. Unbelievable results.'
  },
  {
    name: 'Hiroshi Tanaka',
    role: 'Senior Software Engineer',
    country: 'Japan',
    flag: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: 'Secured a remote tech job at a US startup!',
    content: 'Communicating with international peers in the Live Speaking Rooms gave me the natural confidence to handle complex engineering interviews in English. This academy is stellar!'
  },
  {
    name: 'Elena Rostova',
    role: 'Academic Researcher',
    country: 'Brazil',
    flag: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: 'My paper was accepted by Oxford!',
    content: 'The custom essay grading and mentorship from native academic coaches took my academic writing from average to native-grade perfection. Aligned perfectly with CEFR C2 standards.'
  },
  {
    name: 'Sven Lindqvist',
    role: 'International Relations Specialist',
    country: 'Germany',
    flag: '🇩🇪',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: '100% fluent negotiations!',
    content: 'The systematic 6-level CEFR curriculum is so structured. The transition between intermediate and professional master (C1) is seamless. Highly recommended for busy executives.'
  },
  {
    name: 'Aisha Al-Mansoor',
    role: 'Global Business Coordinator',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: 'Promoted to International Lead!',
    content: 'The daily vocabulary streak and spaced repetition system kept me engaged. Learning English finally felt like an exciting daily quest instead of a boring chore.'
  },
  {
    name: 'Mateo Silva',
    role: 'Marketing Manager',
    country: 'Argentina',
    flag: '🇦🇷',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80',
    rating: 5,
    highlight: 'Bilingual confidence reached!',
    content: 'I tried countless courses before Skill Full, but none matched the sophistication of their live group classrooms and continuous AI scoring. Excellent value for money.'
  }
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-[-10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-emerald-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Trust Badge and Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700"
            id="testimonials-badge"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>RATED 4.9/5 BY OVER 150,000+ GLOBAL LEARNERS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 mt-4 leading-tight"
            id="testimonials-title"
          >
            Transformative Results. <br />
            Spoken by Our Students.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-slate-600 leading-relaxed font-light"
            id="testimonials-subtitle"
          >
            Read inspiring real stories of student transformation, confidence breakthroughs, international career accelerations, and test achievements.
          </motion.p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonials-grid">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-md"
              id={`testimonial-card-${idx}`}
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-4 right-4 text-indigo-600/5 pointer-events-none">
                <Quote className="w-12 h-12 rotate-180" />
              </div>

              <div className="space-y-4">
                {/* Stars Rating */}
                <div className="flex gap-1" id={`stars-container-${idx}`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                {/* Highlight */}
                <h4 className="text-sm font-black text-slate-900 font-display tracking-tight leading-snug">
                  &quot;{t.highlight}&quot;
                </h4>

                {/* Main Content */}
                <p className="text-xs text-slate-600 leading-relaxed font-light italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              {/* Student Metadata Profile */}
              <div className="pt-5 mt-5 border-t border-slate-200 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-bold text-slate-900 leading-none">{t.name}</span>
                    <span className="block text-[10px] text-slate-500 mt-1">{t.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-xs">{t.flag}</span>
                  <span className="text-[10px] font-mono text-slate-600 font-bold uppercase">{t.country}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Stat Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 p-6 rounded-2xl bg-indigo-50 border border-indigo-150 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
          id="testimonials-trust-banner"
        >
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
              <Sparkles className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900 font-display">Are you looking to take your English to native-level mastery?</span>
              <span className="block text-xs text-slate-600 mt-0.5">Take our standardized English level diagnostic test instantly in 5 minutes.</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span className="text-xs font-mono font-black text-indigo-700">GUARANTEED CEFR PROGRESSION</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
