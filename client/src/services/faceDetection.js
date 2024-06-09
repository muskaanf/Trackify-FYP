import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/face' });

export const getAllFaces = () => API.get('/getAll');
export const getIntruders = () => API.get('/getIntruders');
export const addFace = (data) => API.post('/addFace', data);
export const markIntrudersAsSafe = (id) => API.post('/markIntrudersAsSafe', { id });
