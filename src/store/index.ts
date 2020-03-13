import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './types';
import { client } from './client/index';

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
    modules: { client }
}

export default new Vuex.Store<RootState>(store);