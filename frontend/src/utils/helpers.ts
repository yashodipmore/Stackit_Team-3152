export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one letter' };
  }
  return { isValid: true };
};

export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  if (!/^[a-zA-Z0-9_\s]+$/.test(username)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and spaces' };
  }
  return { isValid: true };
};

export const validateQuestionTitle = (title: string): { isValid: boolean; message?: string } => {
  if (!title.trim()) {
    return { isValid: false, message: 'Title is required' };
  }
  if (title.length < 10) {
    return { isValid: false, message: 'Title must be at least 10 characters long' };
  }
  if (title.length > 200) {
    return { isValid: false, message: 'Title must be less than 200 characters' };
  }
  return { isValid: true };
};

export const validateQuestionDescription = (description: string): { isValid: boolean; message?: string } => {
  const textContent = sanitizeHtml(description);
  if (!textContent.trim()) {
    return { isValid: false, message: 'Description is required' };
  }
  if (textContent.length < 20) {
    return { isValid: false, message: 'Description must be at least 20 characters long' };
  }
  return { isValid: true };
};

export const sanitizeHtml = (html: string): string => {
  const temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.textContent || temp.innerText || '';
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
};

export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
