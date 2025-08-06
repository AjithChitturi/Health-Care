import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const getToken = () => localStorage.getItem('token');

// Create axios instance with interceptor
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

// Handle auth errors
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

export const api = {
  // Auth
  login: (data: { username: string; password: string }) =>
    axios.post(`${API_BASE}/auth/login/`, data),
  register: (data: { username: string; email: string; password: string; password2: string }) =>
    axios.post(`${API_BASE}/auth/register/`, data),

  // NEW: Single endpoint for complete questionnaire
  submitCompleteQuestionnaire: (data: any) => 
    apiClient.post('/questionnaire/submit_complete/', data),

  // Keep individual endpoints for future use (optional)
  getPersonalInfo: () => apiClient.get('/personal-info/'),
  savePersonalInfo: (data: any) => apiClient.post('/personal-info/', data),

  getLifestyle: () => apiClient.get('/lifestyle/'),
  saveLifestyle: (data: any) => apiClient.post('/lifestyle/', data),

  getMedicalHistory: () => apiClient.get('/medical-history/'),
  saveMedicalHistory: (data: any) => apiClient.post('/medical-history/', data),

  getFamilyHistory: () => apiClient.get('/family-history/'),
  saveFamilyHistory: (data: any) => apiClient.post('/family-history/', data),

  getMeasurements: () => apiClient.get('/measurements/'),
  saveMeasurements: (data: any) => apiClient.post('/measurements/', data),

  getSymptoms: () => apiClient.get('/symptoms/'),
  saveSymptoms: (data: any) => apiClient.post('/symptoms/', data),

  getPreventiveCare: () => apiClient.get('/preventive-care/'),
  savePreventiveCare: (data: any) => apiClient.post('/preventive-care/', data),

  getQuestionnaire: () => apiClient.get('/questionnaire/'),
  submitQuestionnaire: (data: any) => apiClient.post('/questionnaire/', data),
};