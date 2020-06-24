import { RawLocation } from 'vue-router';

interface Tab {
    name: string;
    to: RawLocation | null;
}

const seriesDetails: Readonly<Record<string, string | Array<Tab>>> = {
    name: 'Szczegóły serialu',
    tabs: [
        {
            name: 'Podstawowe', // Series details form
            to: null
        },
        {
            name: 'Odcinki', // Episodes
            to: null
        },
        {
            name: 'Dodaj odcinek', // Add new episode
            to: {
                name: 'SeriesAddEpisode'
            }
        }
    ]
}

export { seriesDetails };