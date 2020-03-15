import { SeriesGetAllParams, SeriesGetParams } from '@/services/params/seriesParams';
import seriesService from '@/services/seriesService';
import { AxiosResponse } from 'axios';
import router from '@/router/index';
import { ActionTree } from 'vuex';
import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import ServiceError from '@/services/errors/ServiceError';

interface LoadAllSeriesPayload {
    params: SeriesGetAllParams;
}

interface LoadSeriesPayload {
    seriesId: string;
    params: SeriesGetParams;
}

const createSeriesSuccessRoute = '/series';
interface CreateSeriesPayload {
    formData: FormData;
    RouteOnSuccess: boolean;
}

interface UpdateSeriesPayload {
    seriesId: string;
    formData: FormData;
}

interface DeleteSeriesPayload {
    seriesId: string;
}

const actionsSeries: ActionTree<SeriesState, RootState> = {
    async loadAllSeries({ commit }, { params }: LoadAllSeriesPayload) {
        await seriesService.getAll(params,
            (response: AxiosResponse) => {
                commit('setAllSeries', response.data as SeriesData[]);
                commit('clearErrors');
            }, (error: AxiosResponse) => {
                commit('addError', error.data, { root: true });
            });
    },
    async loadSeries({ commit }, { seriesId, params }: LoadSeriesPayload) {
        await seriesService.get(seriesId, params,
            (response: AxiosResponse) => {
                commit('setSeries', response.data as SeriesData);
            }, (error: AxiosResponse) => {
                commit('addError', error.data, { root: true });
            });
    },
    async createSeries({ commit }, { formData, RouteOnSuccess }: CreateSeriesPayload) {
        await seriesService.create(formData,
            (response: AxiosResponse) => {
                const series = new SeriesData(response.data);
                commit('setSeries', series);
                if (RouteOnSuccess)
                    router.push({ path: `${createSeriesSuccessRoute}/${series.id}` });
            }, (error: AxiosResponse) => {
                commit('addError', error.data, { root: true });
            });
    },
    async updateSeries({ commit }, { seriesId, formData }: UpdateSeriesPayload) {
        await seriesService.update(seriesId, formData,
            (response: AxiosResponse) => {
                const series = new SeriesData(response.data);
                commit('setSeries', series);
            }, (error: AxiosResponse) => {
                commit('addError', error.data, { root: true });
            });
    },
    async deleteSeries({ commit }, { seriesId }: DeleteSeriesPayload) {
        await seriesService.delete(seriesId,
            (response: AxiosResponse) => {
                commit('deleteSeries', seriesId);
            }, (error: AxiosResponse) => {
                commit('addError', error.data, { root: true });
            });
    }
}

export { actionsSeries };