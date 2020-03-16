import { SeriesState } from './types';
import { RootState } from '../types';
import SeriesData from '@/classes/SeriesData';
import { MutationTree, Module, GetterTree } from 'vuex';

import { ErrorsModule } from '../errors/index';

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
        const index = state.series.findIndex(seriesData => seriesData.id === series.id)
        index ? state.series[index] = series : state.series.push(series);
    },
    deleteSeries(state: SeriesState, seriesId: string) {
        const seriesIndex = state.series.findIndex(series => series.id === seriesId);
        state.series.splice(seriesIndex, 1);
    },
    appendEpisode(state: SeriesState, episode: EpisodeData) {
        const series = state.series.find(series => series.id === episode.id);
        series?.seasons?.get(episode.seasonNumber)?.push(episode);
    },
    deleteEpisode(state: SeriesState, episodeId: string) {
        const series = state.series.find(series => series.id === episodeId);

    }
}

import { actionsSeries } from './actionsSeries';
import { actionEpisode } from './actionsEpisode';
import EpisodeData from '@/classes/EpisodeData';
import ServiceError from '@/services/errors/ServiceError';

const namespaced = true;

const errorsModule = new ErrorsModule<RootState>().module;

export const series: Module<SeriesState, RootState> = {
    namespaced,
    getters,
    state,
    mutations,
    actions: Object.assign(actionsSeries, actionEpisode),
    modules: { errorsModule }
}