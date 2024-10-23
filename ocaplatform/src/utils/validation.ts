import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const phoneNumberRegex = /^[0-9\s\-()]*$/;

const validatePhoneNumber = (phoneNumber: string, countryCode: CountryCode) => {
  
  const phoneNumberInstance = parsePhoneNumberFromString(phoneNumber, countryCode);
  
  return phoneNumberInstance?.isValid();
};

export { phoneNumberRegex, validateEmail, validatePhoneNumber };
