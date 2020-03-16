import { ActionTree } from "vuex";
import { SeriesState } from './types';
import { RootState } from '../types';

import episodeService from '@/services/episodeService';
import EpisodeData from '@/classes/EpisodeData';
import { AxiosResponse } from 'axios';
import router from '@/router';



interface CreateEpisodePayload {
    body: FormData;
    routeOnSuccess?: string;
}

interface DeleteEpisodePayload {
    episodeId: string;
}

const actionEpisode: ActionTree<SeriesState, RootState> = {
    async createEpisode({ commit }, { body, routeOnSuccess }: CreateEpisodePayload) {
        episodeService.create(body, (response: AxiosResponse) => {
            routeOnSuccess ? router.push({ path: routeOnSuccess }) : commit('appendEpisode', new EpisodeData(response.data));
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    },

    async deleteEpisode({ commit }, { episodeId }: DeleteEpisodePayload) {
        episodeService.delete(episodeId, () => {
            commit('deleteEpisode', episodeId);
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        })
    }

}

export { actionEpisode };