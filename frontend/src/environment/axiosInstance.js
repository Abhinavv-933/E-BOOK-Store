import axios from "axios"

const instance = axios.create({
   baseURL: 'http://localhost:5000', // Change this to your backend port
   headers: {
     'Content-Type': 'application/json',
   },
   timeout: 10000,
});

export default instance;