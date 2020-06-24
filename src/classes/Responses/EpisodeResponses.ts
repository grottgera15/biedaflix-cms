import EpisodeStatus from '@/enums/EpisodeStatus';

export interface LightEpisodeResponse {
    id: string;
    episodeNumber: number;
    seasonNumber: number;
    name: string;
    status: EpisodeStatus;
    releaseDate: number | string;
}

export interface FullEpisodeResponse extends LightEpisodeResponse {
    videoSources: Record<string, string>;
    subtitles: Record<string, string>;
    thumbs: Array<{ path: string }>;
}

export interface EpisodeRequestBody extends Pick<LightEpisodeResponse, 'name' | 'seasonNumber' | 'episodeNumber' | 'releaseDate'> {
    seriesId: string;
    magnetLink: string;
}