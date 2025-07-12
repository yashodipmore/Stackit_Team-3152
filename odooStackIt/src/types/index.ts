export interface User {
  id: string;
  name: string;
  location: string;
  rating: number;
  reputation: number;
  skillsOffered: string[];
  skillsWanted: string[];
  questionsAsked: number;
  skillsSwapped: number;
  avatar?: string;
  joinedDate: string;
  currentStreak: number;
  longestStreak: number;
  dailyActivity: { date: string; count: number }[];
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  answers: number;
  votes: number;
  tags: string[];
  isResolved: boolean;
}

export interface LearningPath {
  id: string;
  skill: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextMilestone: string;
  estimatedTime: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}