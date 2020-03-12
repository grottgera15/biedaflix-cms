import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const usersEndPoint = '/users';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export default {
    async create(formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(usersEndPoint, formData, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async get(userId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${usersEndPoint}/${userId}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async getAll(callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(usersEndPoint, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async update(userId: string, formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${usersEndPoint}/${userId}`, formData, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(userId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${usersEndPoint}/${userId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    }
}