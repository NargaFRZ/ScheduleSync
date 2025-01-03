import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000/",
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default instance;
