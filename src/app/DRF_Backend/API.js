// DRF_Backend/API.js

// Define the base API URL
const baseAPI = 'http://127.0.0.1:8000';
// const baseAPI = 'http://192.168.1.101:8000'; // For Local Networks

// Define individual endpoints
const loginAPI = `${baseAPI}/api/token/`;
const refreshAPI = `${baseAPI}/api/refresh/`;
const verifyAPI = `${baseAPI}/api/verify/`;
const registerAPI = `${baseAPI}/register/`;
const faqsAPI = `${baseAPI}/faqs/`;
const slidersAPI = `${baseAPI}/sliders/`;


const profileDetailAPI = `${baseAPI}/profile/`;
const profileCreateAPI = `${baseAPI}/profile/create/`;



const quizAPI = `${baseAPI}/quizzes/`;
const validateResultAPI = `${baseAPI}/validate-result/`;
const userPerformanceAPI = `${baseAPI}/user-performance/`;
const spinAPI = `${baseAPI}/spin/`;



const subscribeDigimartAPI = `${baseAPI}/digimart/generate-api-endpoint/`;
const unsubscribeDigimartAPI = `${baseAPI}/digimart/unsubscribe/`;
const confirmNotificationDigimartAPI = `${baseAPI}/digimart/confirm-notification/`;
const noftifyMeDigimartAPI = `${baseAPI}/digimart/notify-me/`;
const checkSubscriptionDigimartAPI = `${baseAPI}/digimart/check-subscription/`;


// Export the constants
export { 
    baseAPI, 
    loginAPI, 
    refreshAPI, 
    verifyAPI, 
    registerAPI, 
    faqsAPI, 
    slidersAPI, 
    profileCreateAPI, 
    profileDetailAPI, 
    quizAPI, 
    validateResultAPI, 
    userPerformanceAPI,
    spinAPI,

    subscribeDigimartAPI,
    unsubscribeDigimartAPI,
    confirmNotificationDigimartAPI,
    noftifyMeDigimartAPI,
    checkSubscriptionDigimartAPI,


};