export type PlatformRole = 'super-admin' | 'admin' | 'lecturer' | 'student' | 'parent';

export interface CurriculumLevel {
  id: string; // 'A1', 'A2', etc.
  name: string;
  title: string;
  badgeColor: string;
  bgGradient: string;
  accentColor: string;
  description: string;
  stats: {
    hours: number;
    lessons: number;
    vocabWords: number;
  };
  keyTopics: string[];
  sampleQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface RoleDetail {
  id: PlatformRole;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  badgeColor: string;
  accentBg: string;
  mockupTitle: string;
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  ctaText: string;
  features: string[];
  isPopular?: boolean;
  tier: 'school' | 'student';
}
