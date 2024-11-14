import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8463/",
});

export default instance;