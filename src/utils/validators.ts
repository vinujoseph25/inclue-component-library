export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid email address',
  };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string, countryCode?: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Basic phone validation (10-15 digits)
  const isValid = cleanPhone.length >= 10 && cleanPhone.length <= 15;

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid phone number',
  };
};

/**
 * Validate required field
 */
export const validateRequired = (value: any, fieldName?: string): ValidationResult => {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0);

  return {
    isValid: !isEmpty,
    error: isEmpty ? `${fieldName || 'This field'} is required` : undefined,
  };
};

/**
 * Validate minimum length
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName?: string
): ValidationResult => {
  if (!value) {
    return { isValid: false, error: `${fieldName || 'This field'} is required` };
  }

  const isValid = value.length >= minLength;

  return {
    isValid,
    error: isValid
      ? undefined
      : `${fieldName || 'This field'} must be at least ${minLength} characters`,
  };
};

/**
 * Validate maximum length
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName?: string
): ValidationResult => {
  if (!value) {
    return { isValid: true }; // Empty is valid for max length
  }

  const isValid = value.length <= maxLength;

  return {
    isValid,
    error: isValid
      ? undefined
      : `${fieldName || 'This field'} must be no more than ${maxLength} characters`,
  };
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required' };
  }

  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return { isValid: false, error: `Password must be at least ${minLength} characters` };
  }

  if (!hasUpperCase) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  if (!hasLowerCase) {
    return { isValid: false, error: 'Password must contain at least one lowercase letter' };
  }

  if (!hasNumbers) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  if (!hasSpecialChar) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true };
};

/**
 * Validate URL
 */
export const validateUrl = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true };
  } catch {
    return { isValid: false, error: 'Please enter a valid URL' };
  }
};

/**
 * Validate number range
 */
export const validateNumberRange = (
  value: number,
  min?: number,
  max?: number,
  fieldName?: string
): ValidationResult => {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: `${fieldName || 'This field'} must be a valid number` };
  }

  if (min !== undefined && value < min) {
    return { isValid: false, error: `${fieldName || 'Value'} must be at least ${min}` };
  }

  if (max !== undefined && value > max) {
    return { isValid: false, error: `${fieldName || 'Value'} must be no more than ${max}` };
  }

  return { isValid: true };
};

/**
 * Validate date
 */
export const validateDate = (date: string | Date, fieldName?: string): ValidationResult => {
  if (!date) {
    return { isValid: false, error: `${fieldName || 'Date'} is required` };
  }

  const dateObj = new Date(date);
  const isValid = !isNaN(dateObj.getTime());

  return {
    isValid,
    error: isValid ? undefined : `Please enter a valid ${fieldName?.toLowerCase() || 'date'}`,
  };
};

/**
 * Validate date range
 */
export const validateDateRange = (
  startDate: string | Date,
  endDate: string | Date
): ValidationResult => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { isValid: false, error: 'Please enter valid dates' };
  }

  if (start >= end) {
    return { isValid: false, error: 'End date must be after start date' };
  }

  return { isValid: true };
};

/**
 * Validate credit card number (basic Luhn algorithm)
 */
export const validateCreditCard = (cardNumber: string): ValidationResult => {
  if (!cardNumber) {
    return { isValid: false, error: 'Credit card number is required' };
  }

  const cleanNumber = cardNumber.replace(/\s/g, '');

  if (!/^\d+$/.test(cleanNumber)) {
    return { isValid: false, error: 'Credit card number must contain only digits' };
  }

  if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    return { isValid: false, error: 'Credit card number must be 13-19 digits' };
  }

  // Luhn algorithm
  let sum = 0;
  let alternate = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }

    sum += digit;
    alternate = !alternate;
  }

  const isValid = sum % 10 === 0;

  return {
    isValid,
    error: isValid ? undefined : 'Please enter a valid credit card number',
  };
};
