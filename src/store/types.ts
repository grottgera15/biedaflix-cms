import ServiceError from '@/services/errors/ServiceError';

export interface RootState {
    errors: Array<ServiceError>
}