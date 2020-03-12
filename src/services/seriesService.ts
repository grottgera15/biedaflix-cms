import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import querify from './querify';

const seriesEndPoint = '/series';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

class SeriesGetParams {
    public showSeasons?: boolean
}

import SeriesStatus from '@/enums/SeriesStatus';
class SeriesGetAllParams {
    public showSeasons?: boolean
    public status?: SeriesStatus
    public sourceId?: string
}


export default {
    async create(formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.post(seriesEndPoint, formData, { headers });
        response.status === 201 ? callback() : errorCallback(response);
    },

    async get(seriesId: string, params: SeriesGetParams, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.get(`${seriesEndPoint}/${seriesId}?${querify(params)}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async getAll(callback: Function, params: SeriesGetAllParams, errorCallback: Function) {
        console.log(querify(params));
        const response: AxiosResponse = await Service.get(`${seriesEndPoint}?${querify(params)}`, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async update(seriesId: string, formData: FormData, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.patch(`${seriesEndPoint}/${seriesId}`, formData, axiosRequestConfig);
        response.status === 200 ? callback(response) : errorCallback(response);
    },

    async delete(seriesId: string, callback: Function, errorCallback: Function) {
        const response: AxiosResponse = await Service.delete(`${seriesEndPoint}/${seriesId}`, axiosRequestConfig);
        response.status === 204 ? callback(response) : errorCallback(response);
    }
}