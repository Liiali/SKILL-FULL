export interface Classroom {
  id: string;
  name: string;
  room: string;
  studentCount: number;
  averageScore: number;
}

export interface StudentProgress {
  id: string;
  name: string;
  email: string;
  level: string;
  streak: number;
  progress: number;
}

export interface FeedbackLog {
  id: string;
  studentName: string;
  category: string;
  feedbackText: string;
  status: string;
  authorName: string;
  authorRole: string;
  createdAt?: string;
}

export const initialClassrooms: Classroom[] = [
  { id: '1', name: 'Advanced English B2', room: 'Room 401', studentCount: 18, averageScore: 88 },
  { id: '2', name: 'Business Communication', room: 'Room 102', studentCount: 15, averageScore: 92 },
  { id: '3', name: 'CEFR Foundation A2', room: 'Room 205', studentCount: 22, averageScore: 79 },
  { id: '4', name: 'Intermediate Speaking C1', room: 'Room 303', studentCount: 14, averageScore: 85 },
];

export const initialStudents: StudentProgress[] = [
  { id: 's1', name: 'Hiro Pendelton', email: 'hiro@skillfull.com', level: 'B2', streak: 12, progress: 75 },
  { id: 's2', name: 'Elena Pendelton', email: 'elena@skillfull.com', level: 'C1', streak: 18, progress: 88 },
  { id: 's3', name: 'Arthur Pendelton', email: 'arthur@skillfull.com', level: 'A2', streak: 4, progress: 45 },
  { id: 's4', name: 'Amina Ali', email: 'amina@skillfull.com', level: 'B1', streak: 21, progress: 92 },
  { id: 's5', name: 'Yusuf Nur', email: 'yusuf@skillfull.com', level: 'A1', streak: 9, progress: 60 },
];

export const initialFeedbackLogs: FeedbackLog[] = [
  {
    id: 'f1',
    studentName: 'Hiro Pendelton',
    category: 'Speaking Practice',
    feedbackText: 'Great fluency during the debates. Needs to polish pronunciation of vowel sounds.',
    status: 'APPROVED',
    authorName: 'Dr. Sarah Jameson',
    authorRole: 'LECTURER',
    createdAt: '2026-07-05T09:00:00.000Z'
  },
  {
    id: 'f2',
    studentName: 'Elena Pendelton',
    category: 'Vocabulary Expansion',
    feedbackText: 'Superb command over idiomatic expressions. Keeps a robust daily vocabulary register.',
    status: 'COMPLETED',
    authorName: 'Prof. Lucas Vance',
    authorRole: 'LECTURER',
    createdAt: '2026-07-06T09:00:00.000Z'
  },
  {
    id: 'f3',
    studentName: 'Arthur Pendelton',
    category: 'Daily Study Track',
    feedbackText: 'Arthur is enjoying the speech training module. Thank you for the positive reinforcement.',
    status: 'PENDING',
    authorName: 'Arthur Pendelton Sr.',
    authorRole: 'PARENT',
    createdAt: '2026-07-07T09:00:00.000Z'
  },
];
