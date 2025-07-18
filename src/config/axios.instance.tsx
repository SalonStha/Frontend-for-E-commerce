import axios, {AxiosError, type AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_V1_URL, 
  timeout: 30000, // 30 seconds timeout
  timeoutErrorMessage: 'Request timed out. Please try again later.',
  responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.error('Request error:', error);
  }
);

export interface SuccessResponse {
  //eslint-disable-next-line
  data: any,
  message: string,
  status: string,
  //eslint-disable-next-line
  options: any,
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data as AxiosResponse; // This will ensure the response is typed correctly
    },
    (exception: AxiosError) => {
        if(exception.response){
            throw exception.response?.data;
        }else{
            throw exception;
        }
    }
);
