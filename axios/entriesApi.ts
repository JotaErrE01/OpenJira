import axios from 'axios';

const entriesApi = axios.create({
  baseURL: '/api' // porque las peticiones van del mismo dominio
});

export default entriesApi;
