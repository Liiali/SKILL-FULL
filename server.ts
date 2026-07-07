import express from 'express';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { PrismaClient, Role } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Lazy-initialized Prisma Client to prevent crash on startup if database is unreachable or missing
let prismaClient: PrismaClient | null = null;
function getPrisma() {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  return prismaClient;
}

const JWT_SECRET = process.env.JWT_SECRET || 'skill_full_secret_jwt_key_2026';

interface LocalUser {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: Role;
  level?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LocalClassroom {
  id: string;
  name: string;
  room: string;
  studentCount: number;
  averageScore: number;
  createdAt: Date;
}

interface LocalFeedbackLog {
  id: string;
  studentName: string;
  category: string;
  feedbackText: string;
  status: string;
  authorName: string;
  authorRole: string;
  createdAt: Date;
}

let useLocalDbFallback = false;
let localUsers: LocalUser[] = [];
let localClassrooms: LocalClassroom[] = [];
let localFeedbackLogs: LocalFeedbackLog[] = [];

// Initialize local DB fallback data synchronously
function initLocalDb() {
  const defaultPasswordHash = bcrypt.hashSync('password123', 10);
  
  localUsers = [
    {
      id: 'usr-student-1',
      email: 'student@skillfull.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Hiro',
      lastName: 'Pendelton',
      role: 'STUDENT' as Role,
      level: 'B2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-lecturer-1',
      email: 'lecturer@skillfull.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Sarah',
      lastName: 'Jameson',
      role: 'LECTURER' as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-parent-1',
      email: 'parent@skillfull.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Arthur Sr.',
      lastName: 'Pendelton',
      role: 'PARENT' as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr-admin-1',
      email: 'admin@skillfull.com',
      passwordHash: defaultPasswordHash,
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'SCHOOL_ADMIN' as Role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];

  localClassrooms = [
    { id: '1', name: 'Advanced English B2', room: 'Room 401', studentCount: 18, averageScore: 88, createdAt: new Date() },
    { id: '2', name: 'Business Communication', room: 'Room 102', studentCount: 15, averageScore: 92, createdAt: new Date() },
    { id: '3', name: 'CEFR Foundation A2', room: 'Room 205', studentCount: 22, averageScore: 79, createdAt: new Date() },
    { id: '4', name: 'Intermediate Speaking C1', room: 'Room 303', studentCount: 14, averageScore: 85, createdAt: new Date() },
  ];

  localFeedbackLogs = [
    {
      id: 'f1',
      studentName: 'Hiro Pendelton',
      category: 'Speaking Practice',
      feedbackText: 'Great fluency during the debates. Needs to polish pronunciation of vowel sounds.',
      status: 'APPROVED',
      authorName: 'Dr. Sarah Jameson',
      authorRole: 'LECTURER',
      createdAt: new Date('2026-07-05T09:00:00.000Z')
    },
    {
      id: 'f2',
      studentName: 'Elena Pendelton',
      category: 'Vocabulary Expansion',
      feedbackText: 'Superb command over idiomatic expressions. Keeps a robust daily vocabulary register.',
      status: 'COMPLETED',
      authorName: 'Prof. Lucas Vance',
      authorRole: 'LECTURER',
      createdAt: new Date('2026-07-06T09:00:00.000Z')
    },
    {
      id: 'f3',
      studentName: 'Arthur Pendelton',
      category: 'Daily Study Track',
      feedbackText: 'Arthur is enjoying the speech training module. Thank you for the positive reinforcement.',
      status: 'PENDING',
      authorName: 'Arthur Pendelton Sr.',
      authorRole: 'PARENT',
      createdAt: new Date('2026-07-07T09:00:00.000Z')
    },
  ];
}

initLocalDb();

// Unified database runner with automatic transparent fallback
async function runDbQuery<T>(prismaFn: () => Promise<T>, fallbackFn: () => T | Promise<T>): Promise<T> {
  if (useLocalDbFallback) {
    return await fallbackFn();
  }
  try {
    const prisma = getPrisma();
    return await prismaFn();
  } catch (error: any) {
    const errorMsg = error.message || '';
    if (
      error.code === 'P1001' ||
      error.code === 'P2002' ||
      errorMsg.includes('Can\'t reach database') ||
      errorMsg.includes('PrismaClientInitializationError') ||
      errorMsg.includes('unreachable') ||
      errorMsg.includes('connection')
    ) {
      console.warn('⚠️ Database server is unreachable. Gracefully switching to memory-based local database fallback...');
      useLocalDbFallback = true;
      return await fallbackFn();
    }
    throw error;
  }
}

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), fallbackActive: useLocalDbFallback });
});

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  const { email, role, firstName, lastName, password } = req.body;

  if (!email || !role || !firstName || !lastName || !password) {
    return res.status(400).json({ error: 'Please provide email, role, firstName, lastName, and password.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.$transaction(async (tx) => {
          const existingUser = await tx.user.findUnique({
            where: { email: email.toLowerCase() }
          });

          if (existingUser) {
            throw new Error('An account with this email address already exists.');
          }

          const userObj = await tx.user.create({
            data: {
              email: email.toLowerCase(),
              passwordHash,
              firstName,
              lastName,
              role: role,
            }
          });

          if (role === 'STUDENT') {
            await tx.studentProfile.create({
              data: {
                userId: userObj.id,
                grade: 'A1',
                streak: 0,
              }
            });
          } else if (role === 'PARENT') {
            await tx.parentProfile.create({
              data: {
                userId: userObj.id,
              }
            });
          } else if (role === 'LECTURER') {
            await tx.lecturerProfile.create({
              data: {
                userId: userObj.id,
                department: 'English & Communications',
              }
            });
          }

          return userObj;
        });
      },
      () => {
        const existingUser = localUsers.find(u => u.email === email.toLowerCase());
        if (existingUser) {
          throw new Error('An account with this email address already exists.');
        }

        const newUser: LocalUser = {
          id: 'usr-' + Math.random().toString(36).substr(2, 9),
          email: email.toLowerCase(),
          passwordHash,
          firstName,
          lastName,
          role: role as Role,
          level: role === 'STUDENT' ? 'A1' : undefined,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        localUsers.push(newUser);
        return newUser;
      }
    );

    // Sign JWT Token
    const token = jwt.sign(
      { userId: result.id, email: result.email, role: result.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const responseUser = {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      role: result.role,
      level: result.role === 'STUDENT' ? 'A1' : undefined,
      children: result.role === 'PARENT' ? ['Arthur Pendelton'] : undefined,
      classrooms: result.role === 'LECTURER' ? ['Newbie Speaking A1 (Room 101)'] : undefined,
      schoolName: result.role === 'SCHOOL_ADMIN' ? 'Skill Full Secondary Institute' : undefined,
    };

    res.status(201).json({ token, user: responseUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ error: 'Please provide email, role, and password.' });
  }

  try {
    const dbUser = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        });
      },
      () => {
        const user = localUsers.find(u => u.email === email.toLowerCase());
        return user || null;
      }
    );

    if (dbUser === null) {
      return res.status(401).json({ error: 'No account registered with this email address.' });
    }

    if (dbUser.role !== role) {
      return res.status(401).json({ error: 'Selected role does not match the registered user role.' });
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { userId: dbUser.id, email: dbUser.email, role: dbUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const responseUser = {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
      role: dbUser.role,
      level: dbUser.role === 'STUDENT' ? 'B2' : undefined,
      children: dbUser.role === 'PARENT' ? ['Hiro Pendelton', 'Elena Pendelton'] : undefined,
      classrooms: dbUser.role === 'LECTURER' ? ['Advanced English B2 (Room 401)', 'Business Communication (Room 102)'] : undefined,
      schoolName: dbUser.role === 'SCHOOL_ADMIN' ? 'San Francisco Global Academy' : undefined,
    };

    res.json({ token, user: responseUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Login failed' });
  }
});

// GET /api/classrooms
app.get('/api/classrooms', async (req, res) => {
  try {
    const rooms = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.classroom.findMany({
          orderBy: { createdAt: 'desc' }
        });
      },
      () => {
        return [...localClassrooms].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
    );
    res.json(rooms);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve classrooms' });
  }
});

// POST /api/classrooms
app.post('/api/classrooms', async (req, res) => {
  const { name, room, studentCount, averageScore } = req.body;
  if (!name || !room) {
    return res.status(400).json({ error: 'Name and room number are required.' });
  }

  try {
    const newClassroom = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.classroom.create({
          data: {
            name,
            room,
            studentCount: studentCount ? parseInt(studentCount) : 0,
            averageScore: averageScore ? parseFloat(averageScore) : 80.0
          }
        });
      },
      () => {
        const item: LocalClassroom = {
          id: 'room-' + Math.random().toString(36).substr(2, 9),
          name,
          room,
          studentCount: studentCount ? parseInt(studentCount) : 0,
          averageScore: averageScore ? parseFloat(averageScore) : 80.0,
          createdAt: new Date()
        };
        localClassrooms.push(item);
        return item;
      }
    );
    res.status(201).json(newClassroom);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create classroom' });
  }
});

// GET /api/feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const logs = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.feedbackLog.findMany({
          orderBy: { createdAt: 'desc' }
        });
      },
      () => {
        return [...localFeedbackLogs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }
    );
    res.json(logs);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve feedback' });
  }
});

// POST /api/feedback
app.post('/api/feedback', async (req, res) => {
  const { studentName, category, feedbackText, status, authorName, authorRole } = req.body;
  if (!studentName || !category || !feedbackText || !authorName || !authorRole) {
    return res.status(400).json({ error: 'Missing feedback fields.' });
  }

  try {
    const log = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.feedbackLog.create({
          data: {
            studentName,
            category,
            feedbackText,
            status: status || 'PENDING',
            authorName,
            authorRole
          }
        });
      },
      () => {
        const item: LocalFeedbackLog = {
          id: 'fb-' + Math.random().toString(36).substr(2, 9),
          studentName,
          category,
          feedbackText,
          status: status || 'PENDING',
          authorName,
          authorRole,
          createdAt: new Date()
        };
        localFeedbackLogs.push(item);
        return item;
      }
    );
    res.status(201).json(log);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to submit feedback' });
  }
});

// DELETE /api/feedback/:id
app.delete('/api/feedback/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.feedbackLog.delete({
          where: { id }
        });
      },
      () => {
        const idx = localFeedbackLogs.findIndex(f => f.id === id);
        if (idx === -1) {
          throw new Error('Feedback log not found');
        }
        localFeedbackLogs.splice(idx, 1);
        return { id };
      }
    );
    res.json({ message: 'Feedback log deleted successfully', id });
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete feedback' });
  }
});

// GET /api/students
app.get('/api/students', async (req, res) => {
  try {
    const students = await runDbQuery(
      async () => {
        const prisma = getPrisma();
        return await prisma.user.findMany({
          where: { role: 'STUDENT' },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            studentProfile: {
              select: {
                grade: true,
                streak: true
              }
            }
          }
        });
      },
      () => {
        return localUsers
          .filter(u => u.role === 'STUDENT')
          .map(u => ({
            id: u.id,
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            studentProfile: {
              grade: u.level || 'B2',
              streak: 12
            }
          }));
      }
    );
    res.json(students);
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to retrieve students' });
  }
});

// Serve frontend assets
async function initServer() {
  // Catch-all for API routes to prevent falling through to Vite/static index.html
  app.all('/api/*', (req, res) => {
    res.status(404).json({ error: `API route ${req.method} ${req.originalUrl} not found.` });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('Failed to initialize server:', err);
});
