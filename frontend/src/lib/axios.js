import axios from 'axios';
import API from '../constants/api'

const BASE_URL = API.used;
const instance = axios.create({
	baseURL: BASE_URL,
});

export default instance;
