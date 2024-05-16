// DRF_Backend/API.js

// Define the base API URL
const baseAPI = 'http://127.0.0.1:8000';
// const baseAPI = 'http://127.0.0.1:8000'; // For Local Networks

// Define individual endpoints
const loginAPI = `${baseAPI}/api/token/`;
const refreshAPI = `${baseAPI}/api/refresh/`;
const verifyAPI = `${baseAPI}/api/verify/`;
const registerAPI = `${baseAPI}/register/`;
const faqsAPI = `${baseAPI}/faqs/`;
const slidersAPI = `${baseAPI}/sliders/`;

// Export the constants
export { baseAPI, loginAPI, refreshAPI, verifyAPI, registerAPI, faqsAPI, slidersAPI };