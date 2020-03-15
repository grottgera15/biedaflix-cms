import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import { MutationTree, Module, GetterTree } from 'vuex';

const state: SeriesState = {
    series: new Array<SeriesData>()
}

const getters: GetterTree<SeriesState, RootState> = {
    getAllSeries(state: SeriesState) {
        return state.series;
    },

    getSeries: (state: SeriesState) => (seriesId: string) => {
        return state.series.find(series => series.id === seriesId);
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
    }
}

import { actionsSeries } from './actionsSeries';
import { actionEpisode } from './actionsEpisode';
import EpisodeData from '@/classes/EpisodeData';

const namespaced = true;

export const series: Module<SeriesState, RootState> = {
    namespaced,
    getters,
    state,
    mutations,
    actions: Object.assign(actionsSeries, actionEpisode)
}