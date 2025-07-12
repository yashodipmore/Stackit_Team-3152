import { Question, Answer, User, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'demo',
    email: 'demo@stackit.com',
    username: 'Demo User',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=667eea&color=fff&size=80'
  },
  {
    id: '1',
    email: 'john@example.com',
    username: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=f48024&color=fff&size=80'
  },
  {
    id: '2',
    email: 'jane@example.com',
    username: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=28a745&color=fff&size=80'
  },
  {
    id: '3',
    email: 'mike@example.com',
    username: 'Mike Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=dc3545&color=fff&size=80'
  }
];

// Mock Questions
export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to use React hooks effectively?',
    description: '<p>I\'m new to React hooks and wondering about best practices for using useState and useEffect. Can someone provide some guidance?</p>',
    tags: ['react', 'hooks', 'javascript'],
    author: mockUsers[0],
    votes: 15,
    createdAt: '2025-07-10T10:00:00Z',
    updatedAt: '2025-07-10T10:00:00Z',
    answersCount: 3
  },
  {
    id: '2',
    title: 'TypeScript vs JavaScript for large projects',
    description: '<p>What are the main advantages of using TypeScript over JavaScript for large-scale applications? Is the learning curve worth it?</p>',
    tags: ['typescript', 'javascript', 'best-practices'],
    author: mockUsers[1],
    votes: 8,
    createdAt: '2025-07-11T14:30:00Z',
    updatedAt: '2025-07-11T14:30:00Z',
    answersCount: 2
  },
  {
    id: '3',
    title: 'How to optimize React app performance?',
    description: '<p>My React application is getting slow as it grows. What are the best techniques for optimizing performance? Should I use React.memo everywhere?</p>',
    tags: ['react', 'performance', 'optimization'],
    author: mockUsers[2],
    votes: 22,
    createdAt: '2025-07-12T08:15:00Z',
    updatedAt: '2025-07-12T08:15:00Z',
    answersCount: 5
  },
  {
    id: '4',
    title: 'Best practices for API error handling',
    description: '<p>What are the recommended patterns for handling API errors in frontend applications? How do you show meaningful error messages to users?</p>',
    tags: ['api', 'error-handling', 'frontend'],
    author: mockUsers[0],
    votes: 12,
    createdAt: '2025-07-09T16:45:00Z',
    updatedAt: '2025-07-09T16:45:00Z',
    answersCount: 1
  }
];

// Mock Answers
export const mockAnswers: Answer[] = [
  {
    id: '1',
    content: '<p>Great question! Here are some best practices for React hooks:</p><ul><li>Always call hooks at the top level</li><li>Use custom hooks to share logic</li><li>Don\'t forget cleanup in useEffect</li></ul>',
    author: mockUsers[1],
    votes: 10,
    isAccepted: true,
    questionId: '1',
    createdAt: '2025-07-10T11:30:00Z',
    updatedAt: '2025-07-10T11:30:00Z'
  },
  {
    id: '2',
    content: '<p>I agree with the previous answer. Additionally, consider using useCallback and useMemo for performance optimization when needed.</p>',
    author: mockUsers[2],
    votes: 5,
    isAccepted: false,
    questionId: '1',
    createdAt: '2025-07-10T12:15:00Z',
    updatedAt: '2025-07-10T12:15:00Z'
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'Your answer was accepted on "How to use React hooks effectively?"',
    isRead: false,
    createdAt: '2025-07-12T09:00:00Z',
    questionId: '1'
  },
  {
    id: '2',
    message: 'New answer on your question "TypeScript vs JavaScript for large projects"',
    isRead: false,
    createdAt: '2025-07-11T15:30:00Z',
    questionId: '2'
  }
];

// Mock API responses
export const mockApiResponses = {
  // Questions
  getQuestions: (page: number = 1, limit: number = 10, search?: string, sort: string = 'newest') => {
    let filteredQuestions = [...mockQuestions];
    
    if (search) {
      filteredQuestions = filteredQuestions.filter(q => 
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.description.toLowerCase().includes(search.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    // Sort questions
    switch (sort) {
      case 'newest':
        filteredQuestions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filteredQuestions.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        filteredQuestions.sort((a, b) => b.votes - a.votes);
        break;
      case 'unanswered':
        filteredQuestions = filteredQuestions.filter(q => q.answersCount === 0);
        break;
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedQuestions = filteredQuestions.slice(startIndex, endIndex);
    
    return Promise.resolve({
      questions: paginatedQuestions,
      total: filteredQuestions.length,
      page,
      limit
    });
  },
  
  getQuestion: (id: string) => {
    const question = mockQuestions.find(q => q.id === id);
    if (!question) {
      return Promise.reject({ response: { status: 404 } });
    }
    return Promise.resolve(question);
  },
  
  getAnswers: (questionId: string) => {
    const answers = mockAnswers.filter(a => a.questionId === questionId);
    return Promise.resolve(answers);
  },
  
  getTags: () => {
    const allTags = mockQuestions.flatMap(q => q.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return Promise.resolve(uniqueTags);
  },
  
  getNotifications: () => {
    return Promise.resolve(mockNotifications);
  },
  
  // Auth
  login: (email: string, password: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      // Store the logged-in user for getMe function
      localStorage.setItem('mockCurrentUser', JSON.stringify(user));
      return Promise.resolve({
        user,
        token: 'mock-jwt-token'
      });
    }
    return Promise.reject({ response: { data: { message: 'Invalid credentials' } } });
  },
  
  register: (email: string, password: string, username: string) => {
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      username,
      avatar: ''
    };
    mockUsers.push(newUser);
    localStorage.setItem('mockCurrentUser', JSON.stringify(newUser));
    return Promise.resolve({
      user: newUser,
      token: 'mock-jwt-token'
    });
  },
  
  getMe: () => {
    const storedUser = localStorage.getItem('mockCurrentUser');
    if (storedUser) {
      return Promise.resolve(JSON.parse(storedUser));
    }
    return Promise.resolve(mockUsers[0]); // fallback to first user
  }
};
