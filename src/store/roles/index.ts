import { RolesState } from "./types";
import RoleData from '@/classes/RoleData';
import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '../types';

const state: RolesState = {
    roles: new Array<RoleData>()
}

const getters: GetterTree<RolesState, RootState> = {
    getRoles: (state: RolesState) => {
        return state.roles;
    },
    getRole: (state: RolesState) => (roleId: string) => {
        return state.roles.find(role => role.id === roleId);
    }
}

const mutations: MutationTree<RolesState> = {
    setAllRoles: (state: RolesState, roles: Array<RoleData>) => {
        state.roles = roles;
    },
    setRole: (state: RolesState, role: RoleData) => {
        const index = state.roles.findIndex(_role => _role.id === role.id);
        index ? state.roles[index] = role : state.roles.push(role);
    },
    deleteRole: (state: RolesState, roleId: string) => {
        const index = state.roles.findIndex(_role => _role.id === roleId);
        if (index)
            state.roles.splice(index, 1);
    }
}

interface CreateRolePayload {
    body: FormData;
    routeOnSuccess?: string;
}

interface UpdateRolePayload {
    body: FormData;
    roleId: string;
    routeOnSuccess?: string;
}

interface DeleteRolePayload {
    roleId: string;
    routeOnSuccess?: string;
}

const actions: ActionTree<RolesState, RootState> = {
    async loadAllRoles({ commit }) {
        await rolesService.getAll(
            (response: AxiosResponse) => {
                commit('setAllRoles', response.data as RoleData[]);
            }, (error: AxiosResponse) => {
                commit('addError', error.data);
            });
    },
    async createRole({ commit }, { body, routeOnSuccess }: CreateRolePayload) {
        await rolesService.create(body, () => {
            if (routeOnSuccess)
                router.push({ path: `${routeOnSuccess}` });
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    },
    async updateRole({ commit }, { body, roleId, routeOnSuccess }: UpdateRolePayload) {
        await rolesService.update(body, roleId, () => {
            if (routeOnSuccess)
                router.push({ path: `${routeOnSuccess}` });
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        })
    },
    async deleteRole({ commit }, { roleId, routeOnSuccess }: DeleteRolePayload) {
        await rolesService.delete(roleId, () => {
            if (routeOnSuccess)
                router.push({ path: `${routeOnSuccess}` });
        }, (error: AxiosResponse) => {
            commit('addError', error.data);
        });
    }
}

import { ErrorsModule } from '../errors/index';
import rolesService from '@/services/rolesService';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import router from '@/router';
const errorsModule = new ErrorsModule<RootState>().module;

const namespaced = true;
export const roles: Module<RolesState, RootState> = {
    namespaced,
    state,
    getters,
    mutations,
    actions,
    modules: { errorsModule }
}