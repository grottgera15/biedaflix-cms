import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const rolesEndPoint = '/roles';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}


export default {
    async create(body: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(rolesEndPoint, body, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async update(body: FormData, roleId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.put(`${rolesEndPoint}/${roleId}`, body, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async getAll(callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${rolesEndPoint}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(roleId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${rolesEndPoint}/${roleId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    },

}