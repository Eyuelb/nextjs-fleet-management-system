import axios, { AxiosError } from "axios";
import AuthUtility from "../auth/utils";
import { storageService } from "../client-storage/services";
import tokenService from "../token";
import { redirect } from "next/navigation";

const config = {
  ApiBaseUrl: "/api",
};

const http = axios.create({
  baseURL: config.ApiBaseUrl,
});
http.interceptors.request.use(
  (request) => {
    const token = AuthUtility.getLocalAccessToken();
    if (token) {
      // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      request.headers["Authorization"] = `Bearer ${token}`; // for Node.js Express back-end
    }
    return request;
  },
  (axiosError) => {
    const err = axiosError as AxiosError;

    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (axiosError) => {
    const originalRequest = axiosError.config;

    if (axiosError?.response?.status === 403 && !originalRequest._retry) {
      try {
        originalRequest._retry = true;
        await tokenService.refreshTokenRequest();
        return http(originalRequest);
      } catch (err: any) {
        if (err?.response && err?.response?.data) {
          return Promise.reject(err?.response?.data);
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(axiosError);

    // const err = axiosError as AxiosError;
    // const originalConfig = err.config;
    // if (
    //   originalConfig?.url === "/auth/login" ||
    //   originalConfig?.url === "auth/refresh-token"
    // ) {
    //   return Promise.reject(axiosError);
    // } else {
    //   console.log(originalConfig?.url);
    //   if (err.response.status === 401 && !originalConfig._retry) {
    //     originalConfig._retry = true;
    //     try {
    //       const token = await tokenService.refreshTokenRequest();
    //       console.log(token);
    //       // Retry the original request with the new token
    //       originalConfig.headers.Authorization = `Bearer ${token}`;
    //       return http(originalConfig);
    //     } catch (error) {
    //       return Promise.reject(error);
    //     }
    //   }
    // }

    // return Promise.reject(axiosError);
  }
);

export default http;
