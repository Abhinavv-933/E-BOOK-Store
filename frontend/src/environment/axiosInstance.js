import axios from "axios";
import {getToken} from "../utils/common";

const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL)
  ? import.meta.env.VITE_API_URL
  : 'https://e-book-store-etyo.onrender.com';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if(token)
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
   return Promise.reject(error);
})

export default instance;