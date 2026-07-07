import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'LECTURER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  level?: string;
  children?: string[];
  classrooms?: string[];
  schoolName?: string;
}

export type ActivePage = 'landing' | 'login' | 'register' | 'dashboard';

interface AuthContextType {
  user: User | null;
  activePage: ActivePage;
  isLoading: boolean;
  token: string | null;
  login: (email: string, role: UserRole, password?: string) => Promise<boolean>;
  signUp: (email: string, role: UserRole, firstName: string, lastName: string, password?: string) => Promise<boolean>;
  loginDemo: (role: UserRole) => void;
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

  const login = async (email: string, role: UserRole, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, password }),
      });

      if (!response.ok) {
        let errorMessage = 'Authentication failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            if (errorText.includes('Database server is unreachable') || errorText.includes('DATABASE_UNREACHABLE')) {
              errorMessage = 'Database server is unreachable. Please verify that the database server is running and firewall permissions allow connection.';
            } else {
              errorMessage = `Server returned error ${response.status}: ${response.statusText}`;
            }
          }
        } catch {
          errorMessage = `Server returned status code ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server returned an invalid JSON response.');
      }
      
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
        let errorMessage = 'Registration failed';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } else {
            const errorText = await response.text();
            if (errorText.includes('Database server is unreachable') || errorText.includes('DATABASE_UNREACHABLE')) {
              errorMessage = 'Database server is unreachable. Please verify that the database server is running and firewall permissions allow connection.';
            } else {
              errorMessage = `Server returned error ${response.status}: ${response.statusText}`;
            }
          }
        } catch {
          errorMessage = `Server returned status code ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error('Server returned an invalid JSON response.');
      }

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

  const loginDemo = (role: UserRole) => {
    const demoUser: User = {
      id: 'demo-user-id',
      firstName: 'Demo',
      lastName: role.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase()),
      email: `demo.${role.toLowerCase()}@skillfull.com`,
      role: role,
      level: role === 'STUDENT' ? 'B2' : undefined,
      children: role === 'PARENT' ? ['Hiro Pendelton', 'Elena Pendelton'] : undefined,
      classrooms: role === 'LECTURER' ? ['Advanced English B2 (Room 401)', 'Business Communication (Room 102)'] : undefined,
      schoolName: role === 'SCHOOL_ADMIN' ? 'San Francisco Global Academy' : undefined,
    };
    setUser(demoUser);
    setToken('demo-jwt-token');
    localStorage.setItem('skillfull_user', JSON.stringify(demoUser));
    localStorage.setItem('skillfull_token', 'demo-jwt-token');
    setActivePage('dashboard');
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
        loginDemo,
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
