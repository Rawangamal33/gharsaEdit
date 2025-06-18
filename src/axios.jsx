import axios from "axios";

export const DEV_BASE_URL = "https://agricommerce.runasp.net";
const TOKEN_KEY = "userToken"; // مفتاح التوكن الموحد

const instance = axios.create({
  baseURL: DEV_BASE_URL + "/api/",
  headers: {
    "X-device": "web",
    "X-Language": localStorage.lang,
    "X-Portal": "patient",
    Accept: "application/json; charset=utf-8",
    "Accept-Language": localStorage.lang,
    "Content-Type": "application/json; charset=utf-8",
    ...(localStorage.getItem(TOKEN_KEY)
      ? { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }
      : {}),
  },
});

export const devInstance = axios.create({
  baseURL: DEV_BASE_URL + "/api",
  headers: {
    "X-device": "web",
    "X-Language": localStorage.lang,
    "X-Portal": "patient",
    Accept: "application/json; charset=utf-8",
    "Accept-Language": localStorage.lang,
    "Content-Type": "application/json; charset=utf-8",
  },
});

const handleUnauthorizedResponse = () => {
  localStorage.removeItem(TOKEN_KEY);
  instance.post(`logout`, {}).then(() => {
    console.log("Logged out");
  }).catch((e) => console.error(e.response?.data?.message || e.message));
};

// Interceptor for responses
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      handleUnauthorizedResponse();
    }
    return Promise.reject(error);
  }
);

export default instance;
