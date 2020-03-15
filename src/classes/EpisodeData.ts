import EpisodeStatus from '@/enums/EpisodeStatus';

export interface EpisodeDataInterface {
    id: string;
    episodeNumber: number;
    seasonNumber: number;
    name: string;
    status: EpisodeStatus;
    videoSources?: Map<number, URL>
    subtitles?: Map<string, URL>
    thumbs?: Array<URL>
}

export default class EpisodeData {
    readonly id: string;
    episodeNumber: number;
    seasonNumber: number;
    name: string;
    status: EpisodeStatus;
    videoSources?: Map<number, URL>
    subtitles?: Map<string, URL>
    thumbs?: Array<URL>

    constructor({ id, episodeNumber, seasonNumber, name, status, videoSources, subtitles, thumbs }: EpisodeDataInterface) {
        this.id = id;
        this.episodeNumber = episodeNumber;
        this.seasonNumber = seasonNumber;
        this.name = name;
        this.status = status;
        this.videoSources = videoSources;
        this.subtitles = subtitles;
        this.thumbs = thumbs;
    }
}