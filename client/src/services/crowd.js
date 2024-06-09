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

export const getAll = () => API.get('/crowd/');
export const addCrowd = (data) => API.post('/crowd/addCrowd', data);
export const getByTime = (videoRef) => API.get('/crowd/getByTime', { params: { video_ref: videoRef } });
export const getPlaces = () => API.get('/crowd/getPlaces');