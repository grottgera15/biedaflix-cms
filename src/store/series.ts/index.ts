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
    series: new Map<String, SeriesData>(),
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
    setAllSeries(state: SeriesState, series: Map<String, SeriesData>) {
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

interface GetAllSeriesPayload {
    params: SeriesGetAllParams
}

interface GetSeriesPayload {
    seriesId: string,
    params: SeriesGetParams
}

interface createSeriesPayload {
    formData: FormData,
    RouteOnSuccess: boolean
}
const createSeriesSuccessRoute = '/series';

interface updateSeriesPayload {
    seriesId: string,
    formData: FormData
}

interface deleteSeriesPayload {
    seriesId: string
}

const actions: ActionTree<SeriesState, RootState> = {
    getAllSeries({ commit }, { params }: GetAllSeriesPayload) {
        seriesService.getAll(params,
            (response: AxiosResponse) => {
                const allSeries = new Map<string, SeriesData>();
                for (const seriesData of response.data) {
                    const series: SeriesData = new SeriesData(seriesData);
                    allSeries.set(series.id, series);
                }
                commit('setAllSeries', allSeries);
                commit('clearErrors');
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            })
    },

    getSeries({ commit }, { seriesId, params }: GetSeriesPayload) {
        seriesService.get(seriesId, params,
            (response: AxiosResponse) => {
                commit('setSeries', new SeriesData(response.data));
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },

    createSeries({ commit }, { formData, RouteOnSuccess }: createSeriesPayload) {
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

    updateSeries({ commit }, { seriesId, formData }: updateSeriesPayload) {
        seriesService.update(seriesId, formData,
            (response: AxiosResponse) => {
                const series = new SeriesData(response.data);
                commit('setSeries', series);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },

    deleteSeries({ commit }, { seriesId }: deleteSeriesPayload) {
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
    state,
    mutations,
    actions
}