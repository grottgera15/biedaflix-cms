import { DataTableHeader } from 'vuetify';

export const headers: Array<DataTableHeader> = [
    {
        text: 'Stan',
        sortable: false,
        value: 'status',
        width: 'fit-content'
    },
    {
        text: 'Tytuł',
        sortable: false,
        value: 'name',
        width: 'min-content',
        divider: true
    },
    {
        text: 'Odcinek',
        sortable: true,
        value: 'episodeNumber',
    }, {
        text: 'Sezon',
        sortable: true,
        value: 'seasonNumber',
        width: 'fit-content',
        divider: true
    }, {
        text: 'Data',
        sortable: true,
        value: 'releaseDate',
        width: 'fit-content'
    },
]