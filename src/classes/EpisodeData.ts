import EpisodeStatus from '@/enums/EpisodeStatus';

export interface EpisodeDataInterface {
    id: string;
    seriesId: string;
    episodeNumber: number;
    seasonNumber: string;
    name: string;
    status: EpisodeStatus;
    videoSources?: Map<number, URL>;
    subtitles?: Map<string, URL>;
    thumbs?: Array<URL>;
}

export default class EpisodeData {
    readonly id: string;
    readonly seriesId: string;
    episodeNumber: number;
    seasonNumber: string;
    name: string;
    status: EpisodeStatus;
    videoSources?: Map<number, URL>;
    subtitles?: Map<string, URL>;
    thumbs?: Array<URL>;

    constructor({ id, seriesId, episodeNumber, seasonNumber, name, status, videoSources, subtitles, thumbs }: EpisodeDataInterface) {
        this.id = id;
        this.seriesId = seriesId;
        this.episodeNumber = episodeNumber;
        this.seasonNumber = seasonNumber;
        this.name = name;
        this.status = status;
        this.videoSources = videoSources;
        this.subtitles = subtitles;
        this.thumbs = thumbs;
    }
}