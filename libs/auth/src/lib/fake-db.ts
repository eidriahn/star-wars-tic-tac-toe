import type { User } from './types';

// Fake database with Star Wars themed users
export const FAKE_USERS_DB: Record<string, { password: string; user: User }> = {
  'luke': {
    password: 'force123',
    user: {
      id: '1',
      username: 'luke',
      email: 'luke@rebels.com',
      name: 'Luke Skywalker',
      avatar: 'https://ui-avatars.com/api/?name=Luke+Skywalker&background=00bfff&color=fff',
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  'leia': {
    password: 'rebel123',
    user: {
      id: '2',
      username: 'leia',
      email: 'leia@rebels.com',
      name: 'Princess Leia',
      avatar: 'https://ui-avatars.com/api/?name=Princess+Leia&background=ffd700&color=000',
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  'vader': {
    password: 'darkside123',
    user: {
      id: '3',
      username: 'vader',
      email: 'vader@empire.com',
      name: 'Darth Vader',
      avatar: 'https://ui-avatars.com/api/?name=Darth+Vader&background=ff0000&color=fff',
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  'yoda': {
    password: 'dothereisnotry',
    user: {
      id: '4',
      username: 'yoda',
      email: 'yoda@jedi.com',
      name: 'Master Yoda',
      avatar: 'https://ui-avatars.com/api/?name=Master+Yoda&background=00ff00&color=000',
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
  'han': {
    password: 'solo123',
    user: {
      id: '5',
      username: 'han',
      email: 'han@smugglers.com',
      name: 'Han Solo',
      avatar: 'https://ui-avatars.com/api/?name=Han+Solo&background=8b4513&color=fff',
      createdAt: '2024-01-01T00:00:00Z',
    },
  },
};

export const validateCredentials = (username: string, password: string): User | null => {
  const userRecord = FAKE_USERS_DB[username.toLowerCase()];
  if (userRecord && userRecord.password === password) {
    return userRecord.user;
  }
  return null;
};

export const getUserById = (id: string): User | null => {
  const userRecord = Object.values(FAKE_USERS_DB).find(record => record.user.id === id);
  return userRecord ? userRecord.user : null;
};

export const createUser = (username: string, password: string, email: string, name: string): User => {
  const newUser: User = {
    id: String(Object.keys(FAKE_USERS_DB).length + 1),
    username,
    email,
    name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    createdAt: new Date().toISOString(),
  };

  FAKE_USERS_DB[username.toLowerCase()] = {
    password,
    user: newUser,
  };

  return newUser;
};