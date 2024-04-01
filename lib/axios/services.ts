import { AxiosError } from 'axios';
import http from '.';

export async function httpGet<T>(url: string): Promise<T> {
  try {
    const response = await http.get(url);
    //  console.log(response)
    return response.data as T;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
  }
}

export async function httpPost<TResponse, TRequest>(
  url: string,
  options: TRequest,
): Promise<TResponse> {
  try {
    const response = await http.post(url, options);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    const errorData =
      (err.response?.data as {
        apierror: {
          message: string;
        };
      }) || null;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
      message:
        errorData.apierror && errorData.apierror.message
          ? errorData.apierror.message
          : null,
    };
    // console.error(error)
  }
}
export async function httpPut<TResponse, TRequest>(
  url: string,
  options: TRequest,
): Promise<TResponse> {
  try {
    const response = await http.put(url, options);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
    // console.error(error)
  }
}

export async function httpDelete<TResponse>(url: string): Promise<TResponse> {
  try {
    const response = await http.delete(url);
    return response.data as TResponse;
  } catch (error) {
    const err = error as AxiosError;
    throw {
      status: err.response?.status,
      data: err.response?.data,
      method: err.response?.config.method,
      url: err.response?.config.url,
    };
    // console.error(error)
  }
}
