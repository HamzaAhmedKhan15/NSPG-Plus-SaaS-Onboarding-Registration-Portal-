import axios from 'axios';
 const BASE_URL  = import.meta.env.VITE_API_BASE_URL;
const Axios = axios.create({
  baseURL: BASE_URL,
});

let logoutCallback = null;
export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem("FirebaseToken");
};

Axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {      

        // console.log("Unauthorized or Forbidden - Logging out...");
        // window.localStorage.removeItem("persist:root");
        // window.localStorage.removeItem("user");
        // window.localStorage.removeItem("FirebaseToken");

        // if (logoutCallback) {
        //   logoutCallback();
        // }

        // window.location.href = "/login";
      } else {
        console.error("API Error:", error.response);
      }
    } else {
      console.error("Network or Server Error:", error);
    }

    return Promise.reject(error);
  }
);

export default Axios;