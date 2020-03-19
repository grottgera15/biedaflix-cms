import EpisodeData from './EpisodeData';
import SeriesStatus from '@/enums/SeriesStatus';
import EpisodeStatus from '@/enums/EpisodeStatus';

export interface SeriesDataInterface {
    id: string;
    name: string;
    description: string;
    banner?: string;
    logo?: string;
    streamingSourceId: string;
    status: keyof typeof SeriesStatus;
    episodes: Array<EpisodeData>;
}

export default class SeriesData {
    readonly id: string;
    name: string;
    description: string;
    banner?: string;
    logo?: string;
    streamingSourceId: string;
    status: keyof typeof SeriesStatus;
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

    get shortDescription(): string {
        return this.description.length >= 150 ? this.description.slice(0, 147) + '...' : this.description;
    }

    get seriesStatus(): string {
        return SeriesStatus[this.status];
    }

    get availableEpisodes(): number {
        let i = 0;
        this.episodes.forEach(episode => { if (episode.status !== EpisodeStatus.UNAVAILABLE) i++ });
        return i;
    }

    get allEpisodes(): number {
        return this.episodes.length;
    }
}