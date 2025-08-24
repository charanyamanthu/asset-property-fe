// src/services/propertyService.js

/**
 * Service to handle property API interactions
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL+"/api" || 'http://localhost:8090/api';

/**
 * Get all properties with optional filters
 * @param {Object} filters - Optional filters for properties
 * @returns {Promise<Array>} Properties array
 */
export const getProperties = async (filters = {}) => {
  try {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.beds) queryParams.append('beds', filters.beds);
    if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
    if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
    if (filters.propertyType) queryParams.append('propertyType', filters.propertyType);
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    
    const response = await fetch(`${API_BASE_URL}/properties${queryString}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw error;
  }
};

/**
 * Get a single property by its ID
 * @param {string} id - Property ID
 * @returns {Promise<Object>} Property details with images
 */
export const getPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch property: ${response.status}`);
    }
    
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    throw error;
  }
};