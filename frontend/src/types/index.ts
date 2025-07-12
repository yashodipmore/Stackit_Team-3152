export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: User;
  votes: number;
  createdAt: string;
  updatedAt: string;
  answersCount: number;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  votes: number;
  isAccepted: boolean;
  questionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  questionId?: string;
  answerId?: string;
}

export interface CreateQuestionData {
  title: string;
  description: string;
  tags: string[];
}

export interface CreateAnswerData {
  content: string;
  questionId: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}
