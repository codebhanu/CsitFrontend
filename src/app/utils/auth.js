import Cookies from 'js-cookie';

export const TOKEN_KEY = 'access_token';
export const API_BASE_URL = 'http://localhost:8000';

export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days
};

export const removeToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};