import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});


// Request interceptor for adding auth token and handling requests
api.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common responses and errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('authToken');
      // You can also redirect to login page here if needed
      // window.location.href = '/login';
    }
    
    // Log errors but don't expose them
    console.error('API Error:', error.response || error.message);
    
    // Pass the error back to be handled by the component
    return Promise.reject(error);
  }
);

// Contact API endpoints
export const sendContactRequest = (contactData) => {
  return api.post('/api/contact', contactData);
};

// Property API endpoints
export const getProperties = (filters = {}) => {
  return api.get('/api/properties', { params: filters });
};

export const getPropertyDetails = (propertyId) => {
  return api.get(`/api/properties/${propertyId}`);
};

// User API endpoints
export const login = (credentials) => {
  return api.post('/api/auth/login', credentials);
};

export const register = (userData) => {
  return api.post('/api/auth/register', userData);
};

export const getUserProfile = () => {
  return api.get('/api/user/profile');
};

// Export the api instance for direct use if needed
export default api;