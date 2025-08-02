import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

export const api = {
  // Auth
  login: (data: { username: string; password: string }) =>
    axios.post(`${API_BASE}/auth/login/`, data),
  register: (data: { username: string; email: string; password: string; password2: string }) =>
    axios.post(`${API_BASE}/auth/register/`, data),

  // Questionnaire sections
  getPersonalInfo: () => axios.get(`${API_BASE}/personal-info/`, authHeaders()),
  savePersonalInfo: (data: any) => axios.post(`${API_BASE}/personal-info/`, data, authHeaders()),

  getLifestyle: () => axios.get(`${API_BASE}/lifestyle/`, authHeaders()),
  saveLifestyle: (data: any) => axios.post(`${API_BASE}/lifestyle/`, data, authHeaders()),

  getMedicalHistory: () => axios.get(`${API_BASE}/medical-history/`, authHeaders()),
  saveMedicalHistory: (data: any) => axios.post(`${API_BASE}/medical-history/`, data, authHeaders()),

  getFamilyHistory: () => axios.get(`${API_BASE}/family-history/`, authHeaders()),
  saveFamilyHistory: (data: any) => axios.post(`${API_BASE}/family-history/`, data, authHeaders()),

  getMeasurements: () => axios.get(`${API_BASE}/measurements/`, authHeaders()),
  saveMeasurements: (data: any) => axios.post(`${API_BASE}/measurements/`, data, authHeaders()),

  getSymptoms: () => axios.get(`${API_BASE}/symptoms/`, authHeaders()),
  saveSymptoms: (data: any) => axios.post(`${API_BASE}/symptoms/`, data, authHeaders()),

  getPreventiveCare: () => axios.get(`${API_BASE}/preventive-care/`, authHeaders()),
  savePreventiveCare: (data: any) => axios.post(`${API_BASE}/preventive-care/`, data, authHeaders()),

  getQuestionnaire: () => axios.get(`${API_BASE}/questionnaire/`, authHeaders()),
  submitQuestionnaire: (data: any) => axios.post(`${API_BASE}/questionnaire/`, data, authHeaders()),
};
