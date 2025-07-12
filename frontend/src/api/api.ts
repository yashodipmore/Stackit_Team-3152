import axios from "axios";
import { mockApiResponses } from "./mockData";

const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || true; // Set to true for development

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock API wrapper
const mockApiWrapper = {
  get: async (url: string, config?: any) => {
    const params = config?.params || {};
    
    // Parse URL and route to appropriate mock function
    if (url.startsWith('/questions?')) {
      const result = await mockApiResponses.getQuestions(
        parseInt(params.page) || 1,
        parseInt(params.limit) || 10,
        params.search,
        params.sort
      );
      return { data: result };
    } else if (url.match(/^\/questions\/\d+$/)) {
      const id = url.split('/')[2];
      const data = await mockApiResponses.getQuestion(id);
      return { data };
    } else if (url.match(/^\/questions\/\d+\/answers$/)) {
      const id = url.split('/')[2];
      const data = await mockApiResponses.getAnswers(id);
      return { data };
    } else if (url === '/tags') {
      const data = await mockApiResponses.getTags();
      return { data };
    } else if (url === '/notifications') {
      const data = await mockApiResponses.getNotifications();
      return { data };
    } else if (url === '/auth/me') {
      const data = await mockApiResponses.getMe();
      return { data };
    }
    
    throw { response: { status: 404, data: { message: 'Mock endpoint not found' } } };
  },
  
  post: async (url: string, data?: any) => {
    if (url === '/auth/login') {
      const result = await mockApiResponses.login(data.email, data.password);
      return { data: result };
    } else if (url === '/auth/register') {
      const result = await mockApiResponses.register(data.email, data.password, data.username);
      return { data: result };
    } else if (url === '/questions') {
      const author = await mockApiResponses.getMe();
      return { 
        data: { 
          id: String(Date.now()), 
          ...data,
          author,
          votes: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          answersCount: 0
        } 
      };
    } else if (url.match(/^\/questions\/\d+\/answers$/)) {
      const author = await mockApiResponses.getMe();
      return { 
        data: { 
          id: String(Date.now()), 
          ...data,
          author,
          votes: 0,
          isAccepted: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        } 
      };
    }
    
    return { data: { success: true } };
  },
  
  patch: async (url: string, data?: any) => {
    return { data: { success: true } };
  }
};

export default USE_MOCK_DATA ? mockApiWrapper : api;
