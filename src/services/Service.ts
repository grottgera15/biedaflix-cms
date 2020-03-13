import axios from 'axios';

const baseURL = 'http://api.biedaflix.pl';

export default axios.create({
    baseURL,
    validateStatus: (status: number) => {
        return status >= 200 && status < 500
    }
});