import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LightEpisodeResponse, EpisodeRequestBody } from '@/classes/Responses/EpisodeResponses';

const episodeEndPoint = '/episodes';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export async function create(request: EpisodeRequestBody) {
    const response: AxiosResponse = await Service.post(episodeEndPoint, request, axiosRequestConfig);
    return response.data as LightEpisodeResponse;
}

export async function update(body: FormData, episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.patch(`${episodeEndPoint}/${episodeId}`, body, axiosRequestConfig);
    response.status === 200 ? callback(response) : errorCallback(response);
}

export async function get(episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.get(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
    response.status === 200 ? callback(response) : errorCallback(response);
}

export async function remove(episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.delete(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
    response.status === 204 ? callback(response) : errorCallback(response);
}

export async function addSubtitles(body: FormData, episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.post(`${episodeEndPoint}/${episodeId}/subtitles`, body, axiosRequestConfig);
    response.status === 201 ? callback(response) : errorCallback(response);
}
