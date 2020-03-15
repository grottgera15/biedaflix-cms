import EpisodeData from './EpisodeData';
import SeriesStatus from '@/enums/SeriesStatus';

export interface SeriesDataInterface {
    id: string;
    name: string;
    description: string;
    banner?: URL;
    logo?: URL;
    streamingSourceId: string;
    status: SeriesStatus;
    seasons?: Map<string, Map<string, EpisodeData>>;
}

export default class SeriesData {
    readonly id: string;
    name: string;
    description: string;
    banner?: URL;
    logo?: URL;
    streamingSourceId: string;
    status: SeriesStatus;
    seasons?: Map<string, Map<string, EpisodeData>>;

    constructor({ id, name, description, banner, logo, streamingSourceId, status, seasons }: SeriesDataInterface) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.banner = banner;
        this.logo = logo;
        this.streamingSourceId = streamingSourceId;
        this.status = status;
        this.seasons = seasons;
    }
}