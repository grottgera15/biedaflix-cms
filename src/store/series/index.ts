import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import { SeriesGetAllParams, SeriesGetParams } from '@/services/params/seriesParams';
import { MutationTree, ActionTree, Module, GetterTree } from 'vuex';
import seriesService from '@/services/seriesService';
import { AxiosResponse } from 'axios';
import ServiceError from '@/services/errors/ServiceError';
import router from '@/router/index';

const state: SeriesState = {
    series: new Map<string, SeriesData>(),
    errors: new Array<ServiceError>()
}

const getters: GetterTree<SeriesState, RootState> = {
    getAllSeries(state: SeriesState) {
        return state.series;
    },

    getSeries(state: SeriesState, seriesId: string) {
        if (state.series.has(seriesId))
            return state.series.get(seriesId);
        return undefined;
    },

    getErrors(state: SeriesState) {
        return state.errors;
    },

    getNewestError(state: SeriesState) {
        return state.errors[state.errors.length-1];
    }
}

const mutations: MutationTree<SeriesState> = {
    setAllSeries(state: SeriesState, series: Map<string, SeriesData>) {
        state.series = series;
    },
    setSeries(state: SeriesState, series: SeriesData) {
        state.series.set(series.id, series);
    },
    deleteSeries(state: SeriesState, seriesId: string) {
        state.series.delete(seriesId);
    },
    addError(state: SeriesState, error: ServiceError) {
        state.errors.push(error);
    },
    clearErrors(state: SeriesState) {
        state.errors = new Array<ServiceError>();
    }
}

interface LoadAllSeriesPayload {
    params: SeriesGetAllParams;
}

interface LoadSeriesPayload {
    seriesId: string;
    params: SeriesGetParams;
}

interface CreateSeriesPayload {
    formData: FormData;
    RouteOnSuccess: boolean;
}
const createSeriesSuccessRoute = '/series';

interface UpdateSeriesPayload {
    seriesId: string;
    formData: FormData;
}

interface DeleteSeriesPayload {
    seriesId: string;
}

const actions: ActionTree<SeriesState, RootState> = {
    loadAllSeries({ commit }, { params }: LoadAllSeriesPayload) {
        seriesService.getAll(params,
            (response: AxiosResponse) => {
                commit('setAllSeries', response.data as SeriesData[]);
                commit('clearErrors');
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            })
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

const namespaced = true;
export const series: Module<SeriesState, RootState> = {
    namespaced,
    getters,
    state,
    mutations,
    actions
}