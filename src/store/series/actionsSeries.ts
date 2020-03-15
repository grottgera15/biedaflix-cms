import { SeriesGetAllParams, SeriesGetParams } from '@/services/params/seriesParams';
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
    loadAllSeries({ commit }, { params }: LoadAllSeriesPayload) {
        seriesService.getAll(params,
            (response: AxiosResponse) => {
                commit('setAllSeries', response.data as SeriesData[]);
                commit('clearErrors');
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    loadSeries({ commit }, { seriesId, params }: LoadSeriesPayload) {
        seriesService.get(seriesId, params,
            (response: AxiosResponse) => {
                commit('setSeries', response.data as SeriesData);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    createSeries({ commit }, { formData, RouteOnSuccess }: CreateSeriesPayload) {
        seriesService.create(formData,
            (response: AxiosResponse) => {
                const series = new SeriesData(response.data);
                commit('setSeries', series);
                if (RouteOnSuccess)
                    router.push({ path: `${createSeriesSuccessRoute}/${series.id}` });
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    updateSeries({ commit }, { seriesId, formData }: UpdateSeriesPayload) {
        seriesService.update(seriesId, formData,
            (response: AxiosResponse) => {
                const series = new SeriesData(response.data);
                commit('setSeries', series);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    deleteSeries({ commit }, { seriesId }: DeleteSeriesPayload) {
        seriesService.delete(seriesId,
            (response: AxiosResponse) => {
                commit('deleteSeries', seriesId);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    }
}

export { actionsSeries };