import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { SeriesGetAllParams, SeriesGetParams } from './params/SeriesParams';
import querify from './methods/querify';
import { FullSeriesResponse } from '@/classes/Responses/SeriesResponse';

const seriesEndPoint = '/series';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}
export async function create(body: FormData, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.post(seriesEndPoint, body, { headers });
    response.status === 201 ? callback() : errorCallback(response);
}

export async function update(body: FormData, seriesId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.patch(`${seriesEndPoint}/${seriesId}`, body, axiosRequestConfig);
    response.status === 200 ? callback(response) : errorCallback(response);
}

export async function getAll(params: SeriesGetAllParams) {
    const response: AxiosResponse = await Service.get(`${seriesEndPoint}?${querify(params)}`, axiosRequestConfig);
    return response.data as Array<FullSeriesResponse>;
}

export async function get(seriesId: string, params: SeriesGetParams): Promise<FullSeriesResponse> {
    params;
    const response = await getAll({});
    const index = response.findIndex(series => series.id === seriesId);
    if (index === -1)
        throw new Error('There is no series with that id!');
    return response[index];
}

export async function remove (seriesId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.delete(`${seriesEndPoint}/${seriesId}`, axiosRequestConfig);
    response.status === 204 ? callback(response) : errorCallback(response);
}