import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const streamingSourceEndPoint = '/streamingSources';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export default {
    async create(body: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(streamingSourceEndPoint, body, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async update(body: FormData, streamingSourceId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${streamingSourceEndPoint}/${streamingSourceId}`, body, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async get(streamingSourceId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${streamingSourceEndPoint}/${streamingSourceId}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(streamingSourceId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${streamingSourceEndPoint}/${streamingSourceId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    }
}