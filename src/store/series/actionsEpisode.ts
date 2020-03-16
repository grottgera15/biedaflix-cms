import { ActionTree } from "vuex";
import { SeriesState } from './types';
import { RootState } from '../types';

import episodeService from '@/services/episodeService';
import EpisodeData from '@/classes/EpisodeData';
import { AxiosResponse } from 'axios';
import router from '@/router';
import SeriesData, { SeriesDataInterface } from '@/classes/SeriesData';



interface CreateEpisodePayload {
    body: FormData;
    routeOnSuccess?: string;
}

interface UpdateEpisodePayload {
    body: FormData;
    episodeId: string;
    routeOnSuccess?: string;
}

interface LoadEpisodePayload {
    episodeId: string
}

interface DeleteEpisodePayload {
    episodeId: string;
    routeOnSuccess?: string;
}

const actionEpisode: ActionTree<SeriesState, RootState> = {
    async loadEpisode({ commit }, { episodeId }: LoadEpisodePayload) {
        episodeService.get(episodeId, (response: AxiosResponse) => {
            commit('setEpisode', response.data as SeriesData);
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    },
    async createEpisode({ commit }, { body, routeOnSuccess }: CreateEpisodePayload) {
        episodeService.create(body, () => {
            if (routeOnSuccess)
                router.push({ path: routeOnSuccess });
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    },
    async updateEpisode({ commit }, { body, episodeId, routeOnSuccess }: UpdateEpisodePayload) {
        episodeService.update(body, episodeId, (response: AxiosResponse) => {
            routeOnSuccess ? router.push({ path: routeOnSuccess }) : commit('setEpisode', response.data as SeriesData);
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    },
    async deleteEpisode({ commit }, { episodeId, routeOnSuccess }: DeleteEpisodePayload) {
        episodeService.delete(episodeId, () => {
            if (routeOnSuccess)
                router.push({ path: routeOnSuccess });
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        })
    }

}

export { actionEpisode };