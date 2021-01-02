import axios from "axios";

/*
 * Axios instance for Firebase Realtime Database
 */
const instance = axios.create({
  baseURL: process.env.REACT_APP_DB_URL,
});

export default instance;
