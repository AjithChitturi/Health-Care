// src/api.ts

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance with authentication
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
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

export const api = {
  // --- AUTHENTICATION ---
  login: (credentials: { username: string; password: string }) =>
    apiClient.post('/auth/login/', credentials),

  register: (userData: { username: string; email: string; password: string; password2: string }) =>
    apiClient.post('/auth/register/', userData),

  // --- USER QUESTIONNAIRES ---
  // Fixed: removed extra slash
  getQuestionnaire: () =>
    apiClient.get('/health-questionnaires/'),

  getQuestionnaireDetail: (id: number) =>
    apiClient.get(`/health-questionnaires/${id}/admin_detail/`),

  submitCompleteQuestionnaire: (data: any) =>
    apiClient.post('/health-questionnaires/submit_complete/', data),

  // --- ADMIN FUNCTIONALITY ---
  getPendingReviews: () =>
    apiClient.get('/health-questionnaires/pending/'),

  getAllReviews: () =>
    apiClient.get('/health-questionnaires/all_reviews/'),

  reviewQuestionnaire: (id: number, reviewData: { admin_feedback: string; status: string }) =>
    apiClient.post(`/health-questionnaires/${id}/review/`, reviewData),

  // --- INDIVIDUAL QUESTIONNAIRE SECTIONS (if needed) ---
  getPersonalInfo: () =>
    apiClient.get('/personal-info/'),

  createPersonalInfo: (data: any) =>
    apiClient.post('/personal-info/', data),

  updatePersonalInfo: (id: number, data: any) =>
    apiClient.put(`/personal-info/${id}/`, data),

  getLifestyle: () =>
    apiClient.get('/lifestyle/'),

  createLifestyle: (data: any) =>
    apiClient.post('/lifestyle/', data),

  updateLifestyle: (id: number, data: any) =>
    apiClient.put(`/lifestyle/${id}/`, data),

  getMedicalHistory: () =>
    apiClient.get('/medical-history/'),

  createMedicalHistory: (data: any) =>
    apiClient.post('/medical-history/', data),

  updateMedicalHistory: (id: number, data: any) =>
    apiClient.put(`/medical-history/${id}/`, data),

  getFamilyHistory: () =>
    apiClient.get('/family-history/'),

  createFamilyHistory: (data: any) =>
    apiClient.post('/family-history/', data),

  updateFamilyHistory: (id: number, data: any) =>
    apiClient.put(`/family-history/${id}/`, data),

  getMeasurements: () =>
    apiClient.get('/measurements/'),

  createMeasurements: (data: any) =>
    apiClient.post('/measurements/', data),

  updateMeasurements: (id: number, data: any) =>
    apiClient.put(`/measurements/${id}/`, data),

  getSymptoms: () =>
    apiClient.get('/symptoms/'),

  createSymptoms: (data: any) =>
    apiClient.post('/symptoms/', data),

  updateSymptoms: (id: number, data: any) =>
    apiClient.put(`/symptoms/${id}/`, data),

  getPreventiveCare: () =>
    apiClient.get('/preventive-care/'),

  createPreventiveCare: (data: any) =>
    apiClient.post('/preventive-care/', data),

  updatePreventiveCare: (id: number, data: any) =>
    apiClient.put(`/preventive-care/${id}/`, data),
};

export default apiClient;