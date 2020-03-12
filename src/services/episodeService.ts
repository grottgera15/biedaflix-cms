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
    async create(formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(episodeEndPoint, formData, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async get(episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async update(episodeId: string, formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${episodeEndPoint}/${episodeId}`, formData, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(episodeId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    },

    async addSubtitles(episodeId: string, formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(`${episodeEndPoint}/${episodeId}/subtitles`, formData, axiosRequestConfig);
        response.status === 201 ? callback(response) : errorCallback(response);
    }
}