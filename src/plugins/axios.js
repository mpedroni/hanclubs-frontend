import axios from 'axios';

const server = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

server.interceptors.response.use(
  (response) => response.data,
  (error) => {
    throw new Error(error.response.data.message).message;
  }
);

export default server;
