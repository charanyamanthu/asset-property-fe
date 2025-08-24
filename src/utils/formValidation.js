/**
 * Validates a contact form submission
 * @param {Object} formData - The form data to validate
 * @returns {Object} Result with isValid and message properties
 */
export const validateContactForm = (formData) => {
    // Check required fields
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      return {
        isValid: false,
        message: "Please fill all required fields"
      };
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address"
      };
    }
    
    // Phone number validation (basic)
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      return {
        isValid: false,
        message: "Please enter a valid phone number"
      };
    }
    
    // If all validations pass
    return {
      isValid: true
    };
  };
  
  /**
   * Validates a login form submission
   * @param {Object} formData - The form data to validate
   * @returns {Object} Result with isValid and message properties
   */
  export const validateLoginForm = (formData) => {
    if (!formData.email || !formData.password) {
      return {
        isValid: false,
        message: "Email and password are required"
      };
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return {
        isValid: false,
        message: "Please enter a valid email address"
      };
    }
    
    // Password validation (minimum length)
    if (formData.password.length < 6) {
      return {
        isValid: false,
        message: "Password must be at least 6 characters long"
      };
    }
    
    return {
      isValid: true
    };
  };
  
  /**
   * Generic field validation function
   * @param {string} type - Type of validation to perform
   * @param {string} value - Value to validate
   * @returns {boolean} Whether the value is valid
   */
  export const isFieldValid = (type, value) => {
    switch (type) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      
      case 'phone':
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value);
      
      case 'notEmpty':
        return value.trim() !== '';
      
      case 'password':
        // At least 6 characters, one uppercase, one lowercase, one number
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
      
      default:
        return true;
    }
  };