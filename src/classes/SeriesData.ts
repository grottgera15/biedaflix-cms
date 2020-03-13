import StreamingSourceData from './StreamingSourceData';
import EpisodeData from './EpisodeData';
import SeriesStatus from '@/enums/SeriesStatus';

export interface SeriesDataInterface {
    id?: string,
    name: string,
    description: string,
    banner?: URL,
    logo?: URL,
    streamingSource: StreamingSourceData,
    status: SeriesStatus,
    seasons?: Map<string, Array<EpisodeData>>
}

export default class SeriesData {
    private _id?: string;
    name: string;
    description: string;
    banner?: URL;
    logo?: URL;
    streamingSource: StreamingSourceData;
    status: SeriesStatus;
    seasons?: Map<string, Array<EpisodeData>>

    get id() {
        return this._id;
    }

    constructor({ id, name, description, banner, logo, streamingSource, status, seasons }: SeriesDataInterface) {
        this._id = id;
        this.name = name;
        this.description = description;
        this.banner = banner;
        this.logo = logo;
        this.streamingSource = streamingSource;
        this.status = status;
        this.seasons = seasons;
    }
}