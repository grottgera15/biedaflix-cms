
import { ErrorState } from './types';
import ServiceError from '@/services/errors/ServiceError';
import { GetterTree, MutationTree, Module } from 'vuex';

export class ErrorsModule<S> {
    private getters: GetterTree<ErrorState, S> = {
        getErrors(state: ErrorState) {
            return state.errors;
        },
        getNewestError(state: ErrorState) {
            return state.errors[state.errors.length - 1];
        }
    }

    private mutations: MutationTree<ErrorState> = {
        addError(state: ErrorState, error: ServiceError) {
            state.errors.push(error);
        },
        clearErrors(state: ErrorState) {
            state.errors = new Array<ServiceError>();
        }
    }

    public module: Module<ErrorState, S> = {
        getters: this.getters,
        mutations: this.mutations
    }
}
