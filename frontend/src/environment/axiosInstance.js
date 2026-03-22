import axios from "axios";
import {getToken} from "../utils/common";

const instance = axios.create({
   baseURL: process.env.VITE_API_URL || 'http://localhost:5000', // Change this to your backend port
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