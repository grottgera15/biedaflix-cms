import SeriesData from '@/classes/SeriesData';
import ServiceError from '@/services/errors/ServiceError';

export interface SeriesState {
    series: Map<String, SeriesData>;
    errors: Array<ServiceError>;
}
