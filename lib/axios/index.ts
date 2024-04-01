import axios, { AxiosError } from 'axios';
import AuthUtility from '../auth/utils';
import { storageService } from '../client-storage/services';


const config = {
  ApiBaseUrl: '/api',
};

const http = axios.create({
  baseURL: config.ApiBaseUrl,
});
http.interceptors.request.use(
  request => {
    const token = AuthUtility.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      request.headers['Authorization'] = `Bearer ${token}`; // for Node.js Express back-end
    }
    return request;
  },
  axiosError => {
    const err = axiosError as AxiosError;
    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  },
);
console.log(storageService.getItem('user'))

export default http;
