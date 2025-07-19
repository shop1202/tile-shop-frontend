import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api'
});

// Purchase
export const addPurchase = (items) => API.post('/purchase', { items });
export const getPurchases = () => API.get('/purchase');

// Sale
export const addSale = (items) => API.post('/sale', { items });
export const getSales = () => API.get('/sale');

// Stock
export const getStock = () => API.get('/stock');
