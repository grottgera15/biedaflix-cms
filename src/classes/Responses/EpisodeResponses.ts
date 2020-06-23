import EpisodeStatus from '@/enums/EpisodeStatus';

export interface LightEpisodeResponse {
    id: string;
    episodeNumber: number;
    name: string;
    status: EpisodeStatus;
    relaseDate: Date;
}

export interface FullEpisodeResponse extends LightEpisodeResponse {
    videoSources: Record<string, string>;
    subtitles: Record<string, string>;
    thumbs: Array<{ path: string }>;
}
