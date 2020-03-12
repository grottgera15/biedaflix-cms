import axios from 'axios';

const baseURL = 'http://api.biedaflix.pl';

export default axios.create({
    baseURL
});