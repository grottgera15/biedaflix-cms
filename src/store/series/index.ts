import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import { MutationTree, Module, GetterTree } from 'vuex';

const state: SeriesState = {
    series: new Array<SeriesData>(),
    errors: new Array<ServiceError>(),
}

const getters: GetterTree<SeriesState, RootState> = {
    getAllSeries(state: SeriesState) {
        return state.series;
    },
    getSeries: (state: SeriesState) => (seriesId: string) => {
        return state.series.find(series => series.id === seriesId);
    },
    getErrors(state: SeriesState) {
        return state.errors;
    },
    getNewestError(state: SeriesState) {
        return state.errors[state.errors.length - 1];
    }
}

const mutations: MutationTree<SeriesState> = {
    setAllSeries(state: SeriesState, series: Array<SeriesData>) {
        state.series = series;
    },
    setSeries(state: SeriesState, series: SeriesData) {
        state.series.push(series);
    },
    deleteSeries(state: SeriesState, seriesId) {
        const seriesIndex = state.series.findIndex(series => series.id === seriesId);
        state.series.splice(seriesIndex, 1);
    },

    appendEpisode(state: SeriesState, params: { seriesId: string; episodeData: EpisodeData }) {
        const seasons = state.series.find(series => series.id === params.seriesId)?.seasons;
        if (!seasons)
            throw new ReferenceError(`Freeman you fool!`);
        if (!seasons?.has(params.episodeData.seasonNumber))
            seasons?.set(params.episodeData.seasonNumber, new Array<EpisodeData>());
        seasons?.get(params.episodeData.seasonNumber)?.push(params.episodeData);
    },
    
    addError(state: SeriesState, error: ServiceError) {
        state.errors.push(error);
    },
    clearErrors(state: SeriesState) {
        state.errors = new Array<ServiceError>();
    }
}

import { actionsSeries } from './actionsSeries';
import { actionEpisode } from './actionsEpisode';
import EpisodeData from '@/classes/EpisodeData';
import ServiceError from '@/services/errors/ServiceError';

const namespaced = true;

export const series: Module<SeriesState, RootState> = {
    namespaced,
    getters,
    state,
    mutations,
    actions: Object.assign(actionsSeries, actionEpisode)
}