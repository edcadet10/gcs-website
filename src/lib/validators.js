// Email validation
export const isValidEmail = (email) => {
  if (!email) return false;
  
  // Basic email regex pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Phone number validation (Haiti)
export const isValidHaitianPhone = (phone) => {
  if (!phone) return false;
  
  // Remove any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Haitian phone numbers are 8 digits (sometimes with country code +509)
  if (digitsOnly.length === 8) {
    return true;
  }
  
  // With country code (509)
  if (digitsOnly.length === 11 && digitsOnly.startsWith('509')) {
    return true;
  }
  
  // With international prefix (+509)
  if (digitsOnly.length === 12 && digitsOnly.startsWith('5099')) {
    return true;
  }
  
  return false;
};

// URL validation
export const isValidUrl = (url) => {
  if (!url) return false;
  
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

// Password strength validation
export const validatePassword = (password) => {
  if (!password) return { valid: false, message: 'Password is required' };
  
  // Password should be at least 8 characters
  if (password.length < 8) {
    return { 
      valid: false, 
      message: 'Password should be at least 8 characters long'
    };
  }
  
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      valid: false,
      message: 'Password should contain at least one uppercase letter'
    };
  }
  
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      valid: false,
      message: 'Password should contain at least one lowercase letter'
    };
  }
  
  // Check for at least one number
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: 'Password should contain at least one number'
    };
  }
  
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      message: 'Password should contain at least one special character'
    };
  }
  
  return { valid: true, message: 'Password is strong' };
};

// Form validation helper
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.entries(rules).forEach(([field, fieldRules]) => {
    const value = values[field];
    
    // Required validation
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = fieldRules.requiredMessage || 'This field is required';
      return; // Skip other validations if field is empty and required
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !fieldRules.required) {
      return;
    }
    
    // Minimum length validation
    if (fieldRules.minLength && value.length < fieldRules.minLength) {
      errors[field] = fieldRules.minLengthMessage || 
        `This field should be at least ${fieldRules.minLength} characters`;
    }
    
    // Maximum length validation
    if (fieldRules.maxLength && value.length > fieldRules.maxLength) {
      errors[field] = fieldRules.maxLengthMessage || 
        `This field should not exceed ${fieldRules.maxLength} characters`;
    }
    
    // Email validation
    if (fieldRules.isEmail && !isValidEmail(value)) {
      errors[field] = fieldRules.emailMessage || 'Please enter a valid email address';
    }
    
    // URL validation
    if (fieldRules.isUrl && !isValidUrl(value)) {
      errors[field] = fieldRules.urlMessage || 'Please enter a valid URL';
    }
    
    // Phone validation
    if (fieldRules.isPhone && !isValidHaitianPhone(value)) {
      errors[field] = fieldRules.phoneMessage || 'Please enter a valid phone number';
    }
    
    // Password validation
    if (fieldRules.isPassword) {
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.valid) {
        errors[field] = fieldRules.passwordMessage || passwordValidation.message;
      }
    }
    
    // Match another field validation (e.g., password confirmation)
    if (fieldRules.matches && values[fieldRules.matches] !== value) {
      errors[field] = fieldRules.matchesMessage || 'Fields do not match';
    }
    
    // Custom validation
    if (fieldRules.custom && typeof fieldRules.custom === 'function') {
      const customValidation = fieldRules.custom(value, values);
      if (customValidation) {
        errors[field] = customValidation;
      }
    }
  });
  
  return errors;
};