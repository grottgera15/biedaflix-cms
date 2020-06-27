import Service from './Service';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { StreamingSourceRequestBody, createFormData, StreamingSourceResponse, StreamingSourceRemoveResponse } from '@/classes/Responses/StreamingSourceData';

const streamingSourceEndPoint = '/streamingSources';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export async function create(body: StreamingSourceRequestBody): Promise<StreamingSourceResponse> {
    const formData = createFormData(body);
    const response: AxiosResponse = await Service.post(streamingSourceEndPoint, formData, { headers });
    return response.data as StreamingSourceResponse;
}

export async function update(body: StreamingSourceRequestBody, id: string): Promise<StreamingSourceResponse> {
    const formData = createFormData(body);
    const response: AxiosResponse = await Service.patch(`${streamingSourceEndPoint}/${id}`, formData, axiosRequestConfig);
    return response.data as StreamingSourceResponse;
}

export async function getAll(): Promise<Array<StreamingSourceResponse>> {
    const response: AxiosResponse = await Service.get(`${streamingSourceEndPoint}`, axiosRequestConfig);
    return response.data as Array<StreamingSourceResponse>;
}

export async function get(id: string) {
    const response = await getAll();
    const index = response.findIndex(source => source.id === id);
    if (index !== -1)
        return response[index];
    throw new Error(`There is no streaming Source that match id: ${id}!`);
}

export async function remove (id: String): Promise<StreamingSourceRemoveResponse | null> {
    const customConfig: AxiosRequestConfig = {};
    Object.assign(customConfig, axiosRequestConfig);
    customConfig.validateStatus = (status => status >= 200 || status < 300 || status === 400);

    const response: AxiosResponse = await Service.delete(`${streamingSourceEndPoint}/${id}`, customConfig);
    if (response.status === 400) 
        return response.data as StreamingSourceRemoveResponse;
    return null;
    
}