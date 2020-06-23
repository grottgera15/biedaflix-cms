import { LightEpisodeResponse } from './EpisodeResponses';
import SeriesStatus from '@/enums/SeriesStatus';

export interface LightSeriesResponse {
    id: string;
    name: string;
    description: string;
    banner: string;
    logo: string;
    sourceId: string;
    status: SeriesStatus;
}

export interface FullSeriesResponse extends LightSeriesResponse {
    seasons: Record<string, Array<LightEpisodeResponse>>;
}