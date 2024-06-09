import axios from 'axios';
import { store } from '../store/store';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = store.getState().auth.token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// export const getUserFaces = (userId) => API.get(`/faces/user/${userId}`);
export const getUserFaces = (userId) => {
  const role = store.getState().auth.user.role;
  if (role === 'Admin') {
    return API.get('/faces/admin/all');
  }
  return API.get(`/faces/user/${userId}`);
};
export const getFaceById = (id) => API.get(`/faces/${id}`);
export const createFace = (formData) => API.post('/faces', formData);
export const updateFace = (id, formData) => API.patch(`/faces/${id}`, formData);
export const deleteFace = (id) => API.delete(`/faces/${id}`);