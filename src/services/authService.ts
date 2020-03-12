import Service from './Service';
import { AxiosResponse } from 'axios';


const loginEndPoint = '/login';
const refreshTokenEndPoint = '/refreshToken';

const headers = {
    'content-type': 'multipart/form-data'
}

export default {
    async login(formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(loginEndPoint, formData, { headers });
        (response.status === 200) ? callback(response) : errorCallback(response);
    },

    async refreshToken(callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(refreshTokenEndPoint, {}, { withCredentials: true });
        (response.status === 200) ? callback(response) : errorCallback(response);
    }
}