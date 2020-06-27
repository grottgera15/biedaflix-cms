import { LightEpisodeResponse } from './EpisodeResponses';

export interface StreamingSourceResponse {
    id: string;
    name: string;
    path: string;
}   

export interface StreamingSourceRequestBody extends Pick<StreamingSourceResponse, 'name'>{
    logo: Blob;
}

export interface StreamingSourceRemoveResponse {
    associatedSeries: Array<LightEpisodeResponse>;
    message: string;
}

export function createFormData(body: StreamingSourceRequestBody): FormData {
    const formData = new FormData();
    formData.set('name', body.name);
    formData.set('logo', body.logo);
    return formData;
}