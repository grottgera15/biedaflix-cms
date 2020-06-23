import Service from './Service';
import querify from './methods/querify';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UsersAdminGetAllParams } from './params/UsersAdminParams';
import { AdministrativeUserResponse } from '@/classes/Responses/UserResponse';

const usersEndPoint = '/users';

const headers = {
    'content-type': 'multipart/form-data'
}

const axiosRequestConfig: AxiosRequestConfig = {
    headers,
    withCredentials: true
}

export async function update(body: FormData, userId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.patch(`${usersEndPoint}/${userId}`, body, axiosRequestConfig);
    response.status === 200 ? callback(response) : errorCallback(response);
}

export async function getAll(params: UsersAdminGetAllParams) {
    const response: AxiosResponse = await Service.get(`${usersEndPoint}?${querify(params)}`, axiosRequestConfig);
    return response.data as Array<AdministrativeUserResponse>;
}

export async function get(userId: string, callback: Function, errorCallback: Function) {
    const response: AxiosResponse = await Service.get(`${usersEndPoint}/${userId}`, axiosRequestConfig);
    response.status === 200 ? callback(response) : errorCallback(response);
}