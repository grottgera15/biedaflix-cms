import SeriesData from '@/classes/SeriesData';
import ServiceError from '@/services/errors/ServiceError';

export interface SeriesState {
    series: Array<SeriesData>;
    errors: Array<ServiceError>;
}
