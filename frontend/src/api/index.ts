import axios from 'axios';

// NOTE: I am assuming your Django URLs do NOT have a '/api' prefix
// based on the urls.py you showed me earlier. If they DO, then keep
// your original API_BASE. If not, this is the correct URL.
const API_BASE = 'http://127.0.0.1:8000/';

export const getToken = () => localStorage.getItem('token');

// Create axios instance with interceptor
// This is your configured client that knows the base URL and how to handle tokens.
const apiClient = axios.create({
  baseURL: API_BASE,
});

// Add token to all requests automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors - This is a great feature you built! It will be kept.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login
    }
    return Promise.reject(error);
  }
);


// Your complete API object
export const api = {
  // --- AUTHENTICATION ---
  // IMPROVED: Switched to use `apiClient` for consistency and to enable 401 error handling.
  login: (data: { username: string; password: string }) =>
    apiClient.post('auth/login/', data),

  register: (data: { username: string; email: string; password: string; password2: string }) =>
    apiClient.post('auth/register/', data),


  // --- QUESTIONNAIRE SUBMISSION ---
  submitCompleteQuestionnaire: (data: any) =>
    apiClient.post('questionnaire/submit_complete/', data),


  // --- DATA FETCHING FOR DASHBOARDS ---
  // This one already existed and is correct for UserDashboard
  getQuestionnaire: () => apiClient.get('questionnaire/'),

  // THIS IS THE NEW FUNCTION THAT FIXES YOUR ERROR
  // For AdminDashboard to get submissions needing review
  getPendingReviews: () => apiClient.get('questionnaire/pending/'),


  // --- INDIVIDUAL GET/SAVE (for future use - no changes needed) ---
  getPersonalInfo: () => apiClient.get('personal-info/'),
  savePersonalInfo: (data: any) => apiClient.post('personal-info/', data),

  getLifestyle: () => apiClient.get('lifestyle/'),
  saveLifestyle: (data: any) => apiClient.post('lifestyle/', data),

  getMedicalHistory: () => apiClient.get('medical-history/'),
  saveMedicalHistory: (data: any) => apiClient.post('medical-history/', data),

  getFamilyHistory: () => apiClient.get('family-history/'),
  saveFamilyHistory: (data: any) => apiClient.post('family-history/', data),

  getMeasurements: () => apiClient.get('measurements/'),
  saveMeasurements: (data: any) => apiClient.post('measurements/', data),

  getSymptoms: () => apiClient.get('symptoms/'),
  saveSymptoms: (data: any) => apiClient.post('symptoms/', data),

  getPreventiveCare: () => apiClient.get('preventive-care/'),
  savePreventiveCare: (data: any) => apiClient.post('preventive-care/', data),

  // Redundant but keeping it for now
  submitQuestionnaire: (data: any) => apiClient.post('questionnaire/', data),
};