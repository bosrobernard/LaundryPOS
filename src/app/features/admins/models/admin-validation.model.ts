export const ADMIN_VALIDATION = {
    name: {
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-Z\s]*$/
    },
    email: {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phone: {
      pattern: /^\(\d{3}\)\s\d{3}-\d{4}$/
    },
    password: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecialChar: true
    }
  };
  