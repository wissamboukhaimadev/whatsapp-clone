import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://whatsapp-app-api.herokuapp.com/',
});
export default instance;
