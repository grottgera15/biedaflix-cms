import SeriesStatus from '@/enums/SeriesStatus';

export interface SeriesGetAllParams {
    showSeasons?: boolean;
    status?: SeriesStatus;
    sourceId?: string;
}

export interface SeriesGetParams {
    showSeasons?: boolean;
}