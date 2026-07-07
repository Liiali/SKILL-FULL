export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'LECTURER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  level?: string; // For Students (e.g., B2, C1)
  children?: string[]; // For Parents (e.g., ["Hiro Pendelton", "Elena Pendelton"])
  classrooms?: string[]; // For Lecturers
  schoolName?: string; // For School Admins
}

export type ActivePage = 'landing' | 'login' | 'register' | 'dashboard';
