import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, Getter, GetterTree } from 'vuex'
import { RootState } from './types';
import { client } from './client/index';
import { series } from './series/index';
import ServiceError from '@/services/errors/ServiceError';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    modules: { client, series }
}

export default new Vuex.Store<RootState>(store);