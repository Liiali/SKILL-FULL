import express from 'express';
import cors from 'cors';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Lazy-initialized Prisma Client to prevent crash on startup if DATABASE_URL is missing
let prismaClient: PrismaClient | null = null;
function getPrisma() {
  if (!prismaClient) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.warn('WARNING: DATABASE_URL environment variable is not defined. Database queries will fail.');
    }
    prismaClient = new PrismaClient();
  }
  return prismaClient;
}

const JWT_SECRET = process.env.JWT_SECRET || 'skill_full_secret_jwt_key_2026';

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
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
    const prisma = getPrisma();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email address already exists.' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create User along with the specified profile based on role
    const createdUser = await prisma.$transaction(async (tx) => {
      const userObj = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          firstName,
          lastName,
          role: role,
        }
      });

      // Create profile depending on role
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

    // Sign JWT Token
    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email, role: createdUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Prepare clean response user
    const responseUser = {
      id: createdUser.id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      role: createdUser.role,
      level: createdUser.role === 'STUDENT' ? 'A1' : undefined,
      children: createdUser.role === 'PARENT' ? ['Junior Pendelton'] : undefined,
      classrooms: createdUser.role === 'LECTURER' ? ['Newbie Speaking A1 (Room 101)'] : undefined,
      schoolName: createdUser.role === 'SCHOOL_ADMIN' ? 'Skill Full Secondary Institute' : undefined,
    };

    res.status(201).json({
      token,
      user: responseUser,
    });
  } catch (error: any) {
    console.error('Registration failed:', error);
    res.status(500).json({ error: 'Database transaction failed: ' + error.message });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  const { email, role, password } = req.body;

  if (!email || !role || !password) {
    return res.status(400).json({ error: 'Please provide email, role, and password.' });
  }

  try {
    const prisma = getPrisma();

    // Find User
    const dbUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!dbUser) {
      return res.status(401).json({ error: 'No account registered with this email address.' });
    }

    if (dbUser.role !== role) {
      return res.status(401).json({ error: 'Selected role does not match the registered user role.' });
    }

    // Verify password
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

    // Prepare default mockup/profile attributes for dashboard views
    const responseUser = {
      id: dbUser.id,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      email: dbUser.email,
      role: dbUser.role,
      level: dbUser.role === 'STUDENT' ? 'B2' : undefined,
      children: dbUser.role === 'PARENT' ? ['Hiro Pendelton', 'Arthur Pendelton'] : undefined,
      classrooms: dbUser.role === 'LECTURER' ? ['Advanced English B2 (Room 401)', 'Business Communication (Room 102)'] : undefined,
      schoolName: dbUser.role === 'SCHOOL_ADMIN' ? 'San Francisco Global Academy' : undefined,
    };

    res.json({
      token,
      user: responseUser,
    });
  } catch (error: any) {
    console.error('Login failed:', error);
    res.status(500).json({ error: 'Authentication failed: ' + error.message });
  }
});

// Initialize server and handle Vite middleware OR static distribution
async function initServer() {
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
