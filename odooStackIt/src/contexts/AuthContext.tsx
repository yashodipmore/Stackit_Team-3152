import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Generate mock daily activity data for the past year
const generateDailyActivity = () => {
  const activities = [];
  const today = new Date();
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Random activity count (0-8) with higher probability for recent days
    const recentBonus = i < 30 ? 2 : 0;
    const count = Math.floor(Math.random() * (6 + recentBonus));
    
    activities.push({
      date: date.toISOString().split('T')[0],
      count
    });
  }
  
  return activities;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Johnson',
    location: 'San Francisco, CA',
    rating: 4.8,
    reputation: 1247,
    skillsOffered: ['React', 'TypeScript', 'Node.js'],
    skillsWanted: ['Python', 'Machine Learning', 'UI/UX Design'],
    questionsAsked: 12,
    skillsSwapped: 8,
    joinedDate: '2024-01-15',
    currentStreak: 15,
    longestStreak: 42,
    dailyActivity: generateDailyActivity()
  });
  const [loading, setLoading] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};