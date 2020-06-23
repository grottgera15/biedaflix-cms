import axios from 'axios';

const baseURL = 'https://my-json-server.typicode.com/grottgera15/biedaflix-test-server';

export default axios.create({
    baseURL
});