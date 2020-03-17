import ServiceSubError from './ServiceSubError';

export default interface ServiceError {
    status: string,
    code: number,
    subErrors: Array<ServiceSubError>;
}