import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { LightEpisodeResponse, EpisodeRequestBody, FullEpisodeResponse } from '@/classes/Responses/EpisodeResponses';

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

export async function get(episodeId: string) {
    const response: AxiosResponse = await Service.get(`${episodeEndPoint}`, axiosRequestConfig);
    const episodes = response.data as Array<FullEpisodeResponse>;
    const index = episodes.findIndex(episode => episode.id === episodeId);
    if (index !== -1) {
        const timestamp = (typeof episodes[index].releaseDate === 'string') ? parseInt(episodes[index].releaseDate as string) : episodes[index].releaseDate as number;
        const date = new Date();
        date.setUTCSeconds(timestamp);
        episodes[index].releaseDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        return episodes[index];
    }
    throw new Error('Episode with given id does not exist!');
}

export async function remove(episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.delete(`${episodeEndPoint}/${episodeId}`, axiosRequestConfig);
    response.status === 204 ? callback(response) : errorCallback(response);
}

export async function addSubtitles(body: FormData, episodeId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.post(`${episodeEndPoint}/${episodeId}/subtitles`, body, axiosRequestConfig);
    response.status === 201 ? callback(response) : errorCallback(response);
}
