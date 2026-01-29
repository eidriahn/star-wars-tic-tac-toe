import type { Cookie } from '@builder.io/qwik-city';
import { validateCredentials, getUserById, createUser } from './fake-db';
import type { User, LoginCredentials, RegisterData } from './types';

const SESSION_COOKIE_NAME = 'session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Simple session store (in production, use Redis or a database)
const sessions = new Map<string, { userId: string; expiresAt: number }>();

export class AuthService {
  /**
   * Generate a session token
   */
  private static generateSessionToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Login user with credentials
   */
  static async login(credentials: LoginCredentials, cookie: Cookie): Promise<User | null> {
    const user = validateCredentials(credentials.username, credentials.password);

    if (!user) {
      return null;
    }

    // Create session
    const token = this.generateSessionToken();
    const expiresAt = Date.now() + SESSION_DURATION;

    sessions.set(token, {
      userId: user.id,
      expiresAt,
    });

    // Set cookie
    cookie.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION / 1000,
    });

    return user;
  }

  /**
   * Register a new user
   */
  static async register(data: RegisterData, cookie: Cookie): Promise<User> {
    const user = createUser(data.username, data.password, data.email, data.name);

    // Auto-login after registration
    const token = this.generateSessionToken();
    const expiresAt = Date.now() + SESSION_DURATION;

    sessions.set(token, {
      userId: user.id,
      expiresAt,
    });

    cookie.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_DURATION / 1000,
    });

    return user;
  }

  /**
   * Logout user
   */
  static async logout(cookie: Cookie): Promise<void> {
    const token = cookie.get(SESSION_COOKIE_NAME)?.value;

    if (token) {
      sessions.delete(token);
    }

    cookie.delete(SESSION_COOKIE_NAME, {
      path: '/',
    });
  }

  /**
   * Get current user from session
   */
  static async getCurrentUser(cookie: Cookie): Promise<User | null> {
    const token = cookie.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      return null;
    }

    const session = sessions.get(token);

    if (!session) {
      return null;
    }

    // Check if session is expired
    if (session.expiresAt < Date.now()) {
      sessions.delete(token);
      cookie.delete(SESSION_COOKIE_NAME, { path: '/' });
      return null;
    }

    return getUserById(session.userId);
  }

  /**
   * Check if user is authenticated
   */
  static async isAuthenticated(cookie: Cookie): Promise<boolean> {
    const user = await this.getCurrentUser(cookie);
    return user !== null;
  }
}