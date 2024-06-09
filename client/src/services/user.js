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

export const fetchUsers = () => API.get('/user/getUsers');
export const approveUser = (id) => API.patch(`/user/approve/${id}`);
export const deleteUser = (id) => API.delete(`/user/${id}`);
export const updateUser = (id, userData) => API.put(`/user/update/${id}`, userData);