import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

const episodeEndPoint = '/episodes';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export default {
    async create(body: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(episodeEndPoint, body, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async update(body: FormData, episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${episodeEndPoint}/${episodeId}`, body, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async get(episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    },

    async addSubtitles(body: FormData, episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(`${episodeEndPoint}/${episodeId}/subtitles`, body, axiosRequestConfig);
        response.status === 201 ? callback(response) : errorCallback(response);
    }
}