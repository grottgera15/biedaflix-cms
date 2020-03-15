import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, Getter, GetterTree } from 'vuex'
import { RootState } from './types';
import { client } from './client/index';
import { series } from './series/index';
import ServiceError from '@/services/errors/ServiceError';

Vue.use(Vuex)

const state: RootState = {
    errors: Array<ServiceError>()
}

const getters: GetterTree<RootState, RootState> = {
    getErrors(state: RootState) {
        return state.errors;
    },
    getNewestError(state: RootState) {
        return state.errors[state.errors.length - 1];
    }
}

const mutations: MutationTree<RootState> = {
    addError(state: RootState, error: ServiceError) {
        state.errors.push(error);
    },
    clearErrors(state: RootState) {
        state.errors = new Array<ServiceError>();
    },
}

const store: StoreOptions<RootState> = {
    state,
    getters,
    mutations,
    modules: { client, series }
}

export default new Vuex.Store<RootState>(store);