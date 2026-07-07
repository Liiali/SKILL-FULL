import { CurriculumLevel, PricingPlan } from './types';

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    id: 'A1',
    name: 'Beginner',
    title: 'Breakthrough English',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    bgGradient: 'from-emerald-500/20 to-teal-500/10',
    accentColor: 'emerald',
    description: 'Establish foundational grammar, essential survival vocabulary, and high-frequency expressions. Gain the confidence to introduce yourself, ask directions, and describe your daily life with complete ease.',
    stats: {
      hours: 60,
      lessons: 40,
      vocabWords: 800
    },
    keyTopics: [
      'Present Simple & Continuous',
      'Greetings & High-Frequency Phrases',
      'Linguistic Numerals & Dates',
      'Fundamental Everyday Dialogues'
    ],
    sampleQuiz: {
      question: "Complete the sentence: 'She ___ to our global class every morning.'",
      options: ['go', 'goes', 'going', 'went'],
      correctIndex: 1,
      explanation: "We use the third-person singular present form 'goes' for habitual routines."
    }
  },
  {
    id: 'A2',
    name: 'Elementary',
    title: 'Essential Speaker',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    bgGradient: 'from-blue-500/20 to-indigo-500/10',
    accentColor: 'blue',
    description: 'Engage in fluid conversations about your life story, immediate environment, shopping, and travel. Easily structure past events and express complex personal preferences.',
    stats: {
      hours: 80,
      lessons: 50,
      vocabWords: 1500
    },
    keyTopics: [
      'Narrating with Past Simple & Continuous',
      'Comparative & Superlative Structures',
      'Global Dining & Hospitality Dialogues',
      'Descriptive Scenarios & Adjectives'
    ],
    sampleQuiz: {
      question: "Which option is correct? 'We ___ a wonderful presentation on international cultures yesterday.'",
      options: ['see', 'seen', 'saw', 'have seen'],
      correctIndex: 2,
      explanation: "For events completed in the past at a specific time ('yesterday'), the Past Simple form 'saw' is required."
    }
  },
  {
    id: 'B1',
    name: 'Intermediate',
    title: 'Confident Communicator',
    badgeColor: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10',
    bgGradient: 'from-indigo-500/20 to-purple-500/10',
    accentColor: 'indigo',
    description: 'Express dreams, describe occurrences, explain plans, and defend opinions on abstract issues. Travel confidently through English-speaking nations with fluid command.',
    stats: {
      hours: 100,
      lessons: 60,
      vocabWords: 2500
    },
    keyTopics: [
      'Present Perfect vs Past Simple Nuances',
      'Modal Verbs of Advice & Speculation',
      'The Second Conditional (Hypotheticals)',
      'Constructing Clear Opinions & Critiques'
    ],
    sampleQuiz: {
      question: "Complete the statement: 'If I ___ more time, I would join the live speaking rooms every day.'",
      options: ['have', 'had', 'would have', 'will have'],
      correctIndex: 1,
      explanation: "The second conditional uses 'if + Past Simple' to express an imaginary or hypothetical present scenario."
    }
  },
  {
    id: 'B2',
    name: 'Upper-Intermediate',
    title: 'Fluid Practitioner',
    badgeColor: 'border-violet-500/30 text-violet-400 bg-violet-500/10',
    bgGradient: 'from-violet-500/20 to-fuchsia-500/10',
    accentColor: 'violet',
    description: 'Understand the concrete and abstract nuances of complex texts. Interact with native speakers spontaneously and express complex arguments without prior preparation.',
    stats: {
      hours: 120,
      lessons: 75,
      vocabWords: 4000
    },
    keyTopics: [
      'Passive Voice for Refined Reports',
      'Indirect & Reported Speech structures',
      'Gerunds vs Infinitives distinctions',
      'Phrasal Verbs & Advanced Idiomatic Expressions'
    ],
    sampleQuiz: {
      question: "Choose the correct phrase: 'I had to ___ smoking for my health and stamina.'",
      options: ['give up', 'give in', 'take up', 'run out'],
      correctIndex: 0,
      explanation: "'Give up' is the precise phrasal verb meaning to quit or cease an active habit."
    }
  },
  {
    id: 'C1',
    name: 'Advanced',
    title: 'Professional Master',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    bgGradient: 'from-purple-500/20 to-pink-500/10',
    accentColor: 'purple',
    description: 'Use the English language flexibly and effectively for social, academic, and demanding professional contexts. Produce clear, well-structured, and highly persuasive speech.',
    stats: {
      hours: 140,
      lessons: 90,
      vocabWords: 6000
    },
    keyTopics: [
      'Linguistic Inversion for Focus',
      'Cleft Sentences for Rhetoric',
      'Advanced Collocations & Prepositions',
      'Persuasive Global Negotiations'
    ],
    sampleQuiz: {
      question: "Choose the correct preposition: 'The directors acquitted the manager ___ all charges.'",
      options: ['from', 'of', 'with', 'about'],
      correctIndex: 1,
      explanation: "The verb 'acquit' is paired with the preposition 'of' in professional English."
    }
  },
  {
    id: 'C2',
    name: 'Proficiency',
    title: 'Native Prestige',
    badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    bgGradient: 'from-rose-500/20 to-amber-500/10',
    accentColor: 'rose',
    description: 'Comprehend virtually everything heard or read with absolute ease. Formulate thoughts and arguments flawlessly, with subtle nuances and native-level speed.',
    stats: {
      hours: 160,
      lessons: 100,
      vocabWords: 8000
    },
    keyTopics: [
      'Sophisticated Native Idioms & Irony',
      'Nuanced Metaphors & Editorial Devices',
      'Mastering Regional & Professional Accents',
      'Perfect Intuitive Spontaneous Dialogue'
    ],
    sampleQuiz: {
      question: "What does the common native idiom 'to spill the beans' mean?",
      options: ['To cook a meal', 'To reveal confidential information', 'To make an accidental mistake', 'To harvest crops'],
      correctIndex: 1,
      explanation: "'To spill the beans' is an English idiom meaning to reveal a secret prematurely."
    }
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Individual Explorer',
    priceMonthly: 29,
    priceYearly: 19,
    description: 'Perfect for motivated learners seeking a world-class self-paced curriculum.',
    ctaText: 'Unlock Explorer Path',
    features: [
      'Complete 6-Level curated CEFR syllabus access',
      'Spaced repetition vocabulary engine (8,000+ words)',
      'Automated grammar correction & performance stats',
      'Interactive reading & listening training libraries',
      'Official downloadable digital competency certificates'
    ],
    tier: 'student'
  },
  {
    name: 'Premium Immersion',
    priceMonthly: 79,
    priceYearly: 59,
    description: 'The ultimate path to native fluency with continuous feedback and active speech.',
    ctaText: 'Start Premium Immersion',
    features: [
      'Everything included in the Individual Explorer plan',
      '24/7 Unlimited Interactive AI Speaking Coach feedback',
      'Weekly live small-group workshops with native tutors',
      'Personalized essay grading and speaking review logs',
      'Priority CEFR-aligned certification program',
      'Direct expert mentorship chat for continuous guidance'
    ],
    isPopular: true,
    tier: 'student'
  }
];
