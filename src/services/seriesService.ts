import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { SeriesGetAllParams, SeriesGetParams } from './params/SeriesParams';
import querify from './methods/querify';

const seriesEndPoint = '/series';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export default {
    async create(body: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(seriesEndPoint, body, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async update(body: FormData, seriesId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${seriesEndPoint}/${seriesId}`, body, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async get(params: SeriesGetParams, seriesId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${seriesEndPoint}/${seriesId}?${querify(params)}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async getAll(params: SeriesGetAllParams, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${seriesEndPoint}?${querify(params)}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(seriesId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${seriesEndPoint}/${seriesId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    }
}