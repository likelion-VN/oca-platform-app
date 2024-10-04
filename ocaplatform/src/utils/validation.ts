const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber: string) => {
  const phoneRegex = /^\+?[0-9]{10,15}$/;
  
  return phoneRegex.test(phoneNumber);
};

export { validateEmail, validatePhoneNumber };
