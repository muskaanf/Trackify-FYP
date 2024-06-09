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

// export const getUserBaggages = (userId) => API.get(`/baggage/user/${userId}`);
export const getUserBaggages = (userId) => {
  const role = store.getState().auth.user.role;
  console.log(role);
  if (role === 'Admin') {
    return API.get('/baggage/admin/all');
  }
  return API.get(`/baggage/user/${userId}`);
};
// export const getBaggageById = (id) => API.get(`/baggage/${id}`);
export const createBaggage = (formData) => API.post('/baggage', formData);
// export const uploadBaggageImages = (id, formData) => API.patch(`/baggage/${id}`, formData);
// export const deleteBaggageImage = (baggageId, imageId) => API.delete(`/baggage/${baggageId}/images/${imageId}`);
export const deleteBaggage = (id) => API.delete(`/baggage/${id}`);
export const updateBaggage = (id, formData) => API.patch(`/baggage/${id}`, formData);