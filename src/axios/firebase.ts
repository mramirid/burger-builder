import axios from "axios";

// Axios instance for Firebase Realtime Database
export const fireDBAxios = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
});

// Axios instance for Firebase Auth REST API
export const fireAuthAxios = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});
