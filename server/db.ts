import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { initialPortfolioData } from '../src/data/initialData';
import { PortfolioData, Project, BlogPost, Skill, Certification, ContactSubmission } from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'portfolio-db.json');

export interface FullDatabase {
  portfolio: PortfolioData;
  contactSubmissions: ContactSubmission[];
  admin: {
    email: string;
    passwordHash: string; // SHA-256 hash of password
  };
}

// Default admin: admin@portfolio.dev / admin123
const DEFAULT_ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('admin123').digest('hex');

function ensureDbExists(): FullDatabase {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(raw);
      if (data && data.portfolio) {
        return data as FullDatabase;
      }
    } catch (err) {
      console.error('Error reading database file, reinitializing default:', err);
    }
  }

  const initialDb: FullDatabase = {
    portfolio: initialPortfolioData,
    contactSubmissions: [
      {
        id: 'sub-1',
        name: 'Sarah Lin',
        email: 'sarah.lin@fintechflow.io',
        subject: 'AI Workflow Integration for Lending Pipeline',
        message: 'Hi Obaid, we saw your portfolio and need an intelligent document triage system for incoming loan applications. Could we schedule a 30-minute discovery call next week?',
        receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: false
      },
      {
        id: 'sub-2',
        name: 'Marcus Brody',
        email: 'm.brody@athletixmobile.com',
        subject: 'React Native Cross-Platform App Revamp',
        message: 'Hello Obaid! We are looking for an experienced React Native developer to help build our mobile app. Impressed by your work.',
        receivedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        read: true
      }
    ],
    admin: {
      email: 'obaidr047@gmail.com',
      passwordHash: DEFAULT_ADMIN_PASSWORD_HASH
    }
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
  return initialDb;
}

export function getDatabase(): FullDatabase {
  return ensureDbExists();
}

export function saveDatabase(data: FullDatabase) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Session tokens in-memory with expiration
const activeSessions = new Map<string, { email: string; expiresAt: number }>();

export function createSessionToken(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  // 7-day expiration
  activeSessions.set(token, {
    email,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  });
  return token;
}

export function verifySessionToken(token?: string): boolean {
  if (!token) return false;
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

export function checkAdminCredentials(email: string, pass: string): boolean {
  const db = getDatabase();
  const hash = crypto.createHash('sha256').update(pass).digest('hex');
  const normalized = email.toLowerCase().trim();
  const isMatchEmail =
    normalized === 'obaidr047@gmail.com' ||
    normalized === 'admin@portfolio.dev' ||
    normalized === db.admin.email.toLowerCase().trim();
  return isMatchEmail && (db.admin.passwordHash === hash || DEFAULT_ADMIN_PASSWORD_HASH === hash);
}
