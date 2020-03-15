import { ActionTree } from "vuex";
import { SeriesState } from './types';
import { RootState } from '../types';

import episodeService from '@/services/episodeService';
import EpisodeData from '@/classes/EpisodeData';
import { AxiosResponse, AxiosRequestConfig } from 'axios';



interface CreateEpisodePayload {
    episodeForm: {
        seriesId: string;
        seasonNumber: number;
        episodeNumber: number;
        name: string;
        releaseDate: Date;
        magnetLink?: string;
    };
}

const actionEpisode: ActionTree<SeriesState, RootState> = {
    async createEpisode({ dispatch, commit, getters }, { episodeForm }: CreateEpisodePayload) {
        await dispatch('loadSeries', { seriesId: episodeForm.seriesId });
        if (getters.getSeries(episodeForm.seriesId)) {
            episodeService.create(episodeForm, (response: AxiosResponse) => {
                commit('appendEpisode', { seriesId: episodeForm.seriesId, episodeData: new EpisodeData(response.data) });
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            })
        }
    }
}

export { actionEpisode };