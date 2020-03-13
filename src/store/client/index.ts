import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { RootState } from '../types';
import { ClientState } from './types';
import UserData from '@/classes/UserData';

const state: ClientState = {
    account: undefined
}

const getters: GetterTree<ClientState, RootState> = {
    account(state: ClientState): UserData | null | undefined {
        return state.account;
    }
}

const mutations: MutationTree<ClientState> = {
    setAccount(state: ClientState, account: UserData) {
        state.account = account;
    },
    setLoginFailure(state: ClientState) {
        state.account = null;
    }
}

const actions: ActionTree<ClientState, RootState> = {

}

const namespaced = true;
export const client: Module<ClientState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
}