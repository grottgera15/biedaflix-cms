import authService from '@/services/authService';

import { Module, GetterTree, MutationTree, ActionTree } from 'vuex';
import { RootState } from '../types';
import { ClientState } from './types';
import UserData from '@/classes/UserData';
import ServiceError from '@/services/errors/ServiceError';
import { AxiosResponse } from 'axios';

import cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const state: ClientState = {
    account: undefined,
    errors: new Array<ServiceError>()
}

const getters: GetterTree<ClientState, RootState> = {
    account(state: ClientState): UserData | null | undefined {
        return state.account;
    },
    getErrors(state: ClientState) {
        return state.errors;
    },
    getNewestError(state: ClientState) {
        return state.errors[state.errors.length - 1];
    }
}

const mutations: MutationTree<ClientState> = {
    setAccount(state: ClientState, account: UserData) {
        state.account = account;
    },
    setLoginFailure(state: ClientState) {
        state.account = null;
    },
    addError(state: ClientState, error: ServiceError) {
        state.errors.push(error);
    },
    clearErrors(state: ClientState) {
        state.errors = new Array<ServiceError>();
    }
}

const jwtCookie = 'jwt_token';
const jwtExpiryCookie = 'jwt_token_expiry';
const actions: ActionTree<ClientState, RootState> = {
    auth({ commit, dispatch }) {
        authService.refreshToken((response: AxiosResponse) => {
            const token = cookies.get(jwtCookie);
            if (!token)
                throw new ReferenceError(`Something went wrong with auth! Could not get ${jwtCookie}!`);
            const payload = jwt.decode(token);
            if (!(payload instanceof Object))
                throw new ReferenceError(`${jwtCookie} payload is invalid!`);
            const account = new UserData(payload.user);
            dispatch('startTokenRefreshing');
            commit('setAccount', account);
        }, (response: AxiosResponse) => {
            commit('addError', response.data);
            commit('setLoginFailure');
        })
    },
    startTokenRefreshing({ dispatch }) {
        const tokenExpiry = Number(cookies.get(jwtExpiryCookie));
        if (!tokenExpiry)
            throw new ReferenceError();
        setTimeout(() => {
            dispatch('auth');
        }, tokenExpiry - Date.now() - 60 * 100)
    }
}

const namespaced = true;
export const client: Module<ClientState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions
}