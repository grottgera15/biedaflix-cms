import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import { MutationTree, Module, GetterTree } from 'vuex';
import ServiceError from '@/services/errors/ServiceError';

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
        return state.errors[state.errors.length - 1];
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

import { actionsSeries } from './actionsSeries';

const namespaced = true;

export const series: Module<SeriesState, RootState> = {
    namespaced,
    getters,
    state,
    mutations,
    actions: Object.assign(actionsSeries)
}