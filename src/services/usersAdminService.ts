import Service from './Service';
import querify from './methods/querify';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersAdminGetAllParams } from './params/UsersAdminParams';

const usersEndPoint = '/admin/users';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export default {
    async update(body: FormData, userId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${usersEndPoint}/${userId}`, body, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async getAll(params: UsersAdminGetAllParams, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${usersEndPoint}?${querify(params)}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async get(userId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${usersEndPoint}/${userId}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

}