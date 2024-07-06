import Axios from 'axios';

const axios = Axios.create({});


const serverUrl = import.meta.env.VITE_API_BASE_URL;

export const baseURL = `${serverUrl}`;

axios.interceptors.request.use(
    async function (config) {
      const token = window.localStorage.getItem('evaluate-project-token');
  
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
        config.baseURL = baseURL;
  
      return config;
    },

    function (error) {
      return Promise.reject(error);
    }
  );

export default axios;