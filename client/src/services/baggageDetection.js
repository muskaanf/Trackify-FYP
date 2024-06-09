import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/luggage' });

export const getAllLuggage = () => API.get('/getAll');
export const getUnattendedLuggage = () => API.get('/getUnattended');
export const addLuggage = (data) => API.post('/addLuggage', data);
export const markUnattendedAsSafe = (id) => API.post('/markUnattendedAsSafe', { id });
