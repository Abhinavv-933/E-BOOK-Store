import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const TOKEN = 'token';

export const saveToken = (token) => {
  Cookies.set(TOKEN, token);
};

export const getToken = () => {
   return Cookies.get(TOKEN) || null;
};

export const decodeToken = () => {
  const token = getToken();
  if(!token) return null;

  try {
     return jwtDecode(token);
  } catch (error) {
     console.error('failed to decode token', error);
     return null;
  }
};

export const isAdminLoggedin = () => {
   const decodeToken  = decodeToken();
   return decodeToken?.role === 'ADMIN';
}

export const isCustomerLoggedin = () => {
   const decodeToken  = decodeToken();
   return decodeToken?.role === 'CUSTOMER';
};

export const removeToken = () => {
   Cookies.remove(TOKEN);
}
