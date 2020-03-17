import { UsersState } from './types';
import UserData from '@/classes/UserData';
import { GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '../types';

const state: UsersState = {
    users: new Array<UserData>()
}

const getters: GetterTree<UsersState, RootState> = {
    getAllUsers: (state: UsersState) => {
        return state.users;
    },
    getUser: (state: UsersState) => (userId: string) => {
        return state.users.find(user => user.id === userId);
    }
}

const mutations: MutationTree<UsersState> = {
    setAllUsers: (state: UsersState, roles: Array<UserData>) => {
        state.users = roles;
    },
    setUser: (state: UsersState, user: UserData) => {
        const index = state.users.findIndex(_user => _user.id === user.id);
        index ? state.users[index] = user : state.users.push(user);
    },
    deleteUser: (state: UsersState, userId: string) => {
        const index = state.users.findIndex(user => user.id === userId);
        if (index)
            state.users.splice(index, 1);
    }
}


import { ErrorsModule } from '../errors/index';
const errorsModule = new ErrorsModule<RootState>().module;

export const users: Module<UsersState, RootState> = {
    state,
    getters,
    modules: { errorsModule }
}
