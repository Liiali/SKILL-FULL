import { createContext, useContext, useState, ReactNode } from 'react';

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

interface AuthContextType {
  user: User | null;
  activePage: ActivePage;
  isLoading: boolean;
  token: string | null;
  login: (email: string, role: UserRole, password?: string) => Promise<boolean>;
  signUp: (email: string, role: UserRole, firstName: string, lastName: string, password?: string) => Promise<boolean>;
  logout: () => void;
  navigateTo: (page: ActivePage) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('skillfull_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('skillfull_token');
  });
  const [activePage, setActivePage] = useState<ActivePage>(() => {
    const storedUser = localStorage.getItem('skillfull_user');
    return storedUser ? 'dashboard' : 'landing';
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Real backend login handler
  const login = async (email: string, role: UserRole, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Authentication failed');
      }

      const data = await response.json();
      
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('skillfull_user', JSON.stringify(data.user));
      localStorage.setItem('skillfull_token', data.token);
      setActivePage('dashboard');
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      console.error('Login error:', error);
      throw error;
    }
  };

  // Real backend registration handler
  const signUp = async (
    email: string,
    role: UserRole,
    firstName: string,
    lastName: string,
    password?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, firstName, lastName, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('skillfull_user', JSON.stringify(data.user));
      localStorage.setItem('skillfull_token', data.token);
      setActivePage('dashboard');
      setIsLoading(false);
      return true;
    } catch (error: any) {
      setIsLoading(false);
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillfull_user');
    localStorage.removeItem('skillfull_token');
    setActivePage('landing');
  };

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        activePage,
        isLoading,
        token,
        login,
        signUp,
        logout,
        navigateTo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
