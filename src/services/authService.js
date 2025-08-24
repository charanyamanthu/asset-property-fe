import api from './apiService';

// Token management
const TOKEN_KEY = 'authToken';
const USER_KEY = 'userData';

/**
 * Authentication service with token management
 */
export const authService = {
  /**
   * Login user and store token
   * @param {Object} credentials - User credentials
   * @returns {Promise} - Login response
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        
        // Store user data if available
        if (response.data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Registration response
   */
  register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      
      // If registration also returns a token, store it
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
        
        if (response.data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Logout user and clear storage
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Optional: Call logout endpoint if your API requires it
    // return api.post('/api/auth/logout');
  },
  
  /**
   * Get current stored authentication token
   * @returns {string|null} - Auth token or null
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean} - Auth status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  /**
   * Get current user data
   * @returns {Object|null} - User data or null
   */
  getCurrentUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  
  /**
   * Refresh the authentication token
   * @returns {Promise} - New token response
   */
  refreshToken: async () => {
    try {
      const response = await api.post('/api/auth/refresh');
      
      if (response.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      
      return response.data;
    } catch (error) {
      // If refresh fails, log the user out
      authService.logout();
      throw error;
    }
  }
};

export default authService;