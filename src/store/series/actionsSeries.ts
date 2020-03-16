import { SeriesGetAllParams, SeriesGetParams } from '@/services/params/SeriesParams';
import seriesService from '@/services/seriesService';
import { AxiosResponse } from 'axios';
import router from '@/router/index';
import { ActionTree } from 'vuex';
import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';


interface LoadAllSeriesPayload {
    params: SeriesGetAllParams;
}

interface LoadSeriesPayload {
    seriesId: string;
    params: SeriesGetParams;
}

interface CreateSeriesPayload {
    body: FormData;
    routeOnSuccess?: string;
}

interface UpdateSeriesPayload {
    body: FormData;
    seriesId: string;
    routeOnSuccess?: string;
}

interface DeleteSeriesPayload {
    seriesId: string;
    routeOnSuccess?: string;
}

const actionsSeries: ActionTree<SeriesState, RootState> = {
    async loadAllSeries({ commit }, { params }: LoadAllSeriesPayload) {
        await seriesService.getAll(params,
            (response: AxiosResponse) => {
                commit('setAllSeries', response.data as SeriesData[]);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    async loadSeries({ commit }, { seriesId, params }: LoadSeriesPayload) {
        await seriesService.get(params, seriesId,
            (response: AxiosResponse) => {
                commit('setSeries', response.data as SeriesData);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    async createSeries({ commit }, { body, routeOnSuccess }: CreateSeriesPayload) {
        await seriesService.create(body,
            () => {
                if (routeOnSuccess)
                    router.push({ path: `${routeOnSuccess}` });
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    async updateSeries({ commit }, { body, seriesId, routeOnSuccess }: UpdateSeriesPayload) {
        await seriesService.update(body, seriesId,
            () => {
                if (routeOnSuccess)
                    router.push({ path: `${routeOnSuccess}` });
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    async deleteSeries({ commit }, { seriesId, routeOnSuccess }: DeleteSeriesPayload) {
        await seriesService.delete(seriesId,
            () => {
                if (routeOnSuccess)
                    router.push({ path: `${routeOnSuccess}` });
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    }
}

export { actionsSeries };