import Service from './Service';
import { AxiosResponse } from 'axios';


const loginEndPoint = '/login';
const loginStatus = 200;

const refreshTokenEndPoint = '/refreshToken';
const refreshTokenStatus = 200;

const contentType = 'multipart/form-data';
const headers = {
    'content-type': contentType
}

export default {
    async login(formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(loginEndPoint, formData, {
            headers
        });
        (response.status === loginStatus) ? callback(response) : errorCallback(response);
    },
    
    async refreshToken(callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(refreshTokenEndPoint, {}, {
            withCredentials: true
        });
        (response.status === refreshTokenStatus) ? callback(response) : errorCallback(response);
    }
}