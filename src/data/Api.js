import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const headers = {
    'Content-Type': 'application/json'
};

const Api = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers
});

export default Api;
