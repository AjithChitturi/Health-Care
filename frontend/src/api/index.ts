import axios from 'axios';

// FIXED: Added /api/ prefix based on your Django URL configuration
const API_BASE = 'http://127.0.0.1:8000/api/';

export const getToken = () => localStorage.getItem('token');

// Create axios instance with interceptor
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
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

// Handle auth errors and other response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Your complete API object
export const api = {
  // --- AUTHENTICATION ---
  login: async (data: { username: string; password: string }) => {
    try {
      const response = await apiClient.post('auth/login/', data);
      return response;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  register: async (data: { username: string; email: string; password: string; password2: string }) => {
    try {
      const response = await apiClient.post('auth/register/', data);
      return response;
    } catch (error: any) {
      console.error('Register error:', error.response?.data || error.message);
      throw error;
    }
  },

  // --- QUESTIONNAIRE SUBMISSION ---
  submitCompleteQuestionnaire: (data: any) =>
    apiClient.post('questionnaire/submit_complete/', data),

  // --- DATA FETCHING FOR DASHBOARDS ---
  getQuestionnaire: () => apiClient.get('questionnaire/'),
  
  // For AdminDashboard to get submissions needing review
  getPendingReviews: () => apiClient.get('questionnaire/pending/'),
  
  // Add review submission method for admin
  submitReview: (id: number, data: { admin_feedback: string; status: string }) =>
    apiClient.post(`questionnaire/${id}/review/`, data),

  // --- INDIVIDUAL GET/SAVE METHODS ---
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

  // General questionnaire submission (keeping for compatibility)
  submitQuestionnaire: (data: any) => apiClient.post('questionnaire/', data),
};