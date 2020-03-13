import UserData from '@/classes/UserData';
import ServiceError from '@/services/errors/ServiceError';

export interface ClientState {
    account: UserData | null | undefined;
    errors: Array<ServiceError>;
}