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
    episodes: Array<EpisodeData>;
}

export default class SeriesData {
    readonly id: string;
    name: string;
    description: string;
    banner?: URL;
    logo?: URL;
    streamingSourceId: string;
    status: SeriesStatus;
    episodes: Array<EpisodeData>;

    constructor({ id, name, description, banner, logo, streamingSourceId, status, episodes }: SeriesDataInterface) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.banner = banner;
        this.logo = logo;
        this.streamingSourceId = streamingSourceId;
        this.status = status;
        this.episodes = episodes;
    }
}