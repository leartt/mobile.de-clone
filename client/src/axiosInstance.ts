
import axios, { AxiosInstance } from 'axios';
import store from './state/store';
import { logout } from './state/actions/authActions'

const axiosInstance: AxiosInstance = axios.create({
   baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.response.use((response) => {
   return response;
}, (error) => {
   if (error.response.status === 401) {

      store.dispatch((logout()))
      throw new Error('Session has expired or an error has occurred. Please log in again.')
   }
   throw error;
});

export default axiosInstance;