import axios from 'axios';

const BASE_URL = 'https://api.example.com';
const BASE_TIMEOUT = 120000; // 2 minutes

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // Do something before the request is sent like
    // config.headers.Authorization = 'Bearer + token';
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('⛔️⛔️⛔️ API Request: ', JSON.stringify(config, null, ' '));
    }
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Do something with response data
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(
        '⛔️⛔️⛔️ API Response: ',
        JSON.stringify(response, null, ' '),
      );
    }
    return response;
  },
  error => {
    // Do something with response error like
    /* if (error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    } */
    return Promise.reject(error);
  },
);
