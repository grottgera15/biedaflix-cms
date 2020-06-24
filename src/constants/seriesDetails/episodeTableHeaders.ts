import { DataTableHeader } from 'vuetify';

export const headers: Array<DataTableHeader> = [
    {
        text: 'Akcje',
        sortable: false,
        value: 'actions',
        width: 'min-content'
    },
    {
        text: 'Tytuł',
        sortable: false,
        value: 'name',
        width: 'min-content',
        divider: true
    },
    {
        text: 'Stan',
        sortable: false,
        value: 'status',
        width: 'fit-content'
    },
    {
        text: 'Data',
        sortable: true,
        value: 'releaseDate',
        width: 'fit-content',
        divider: true
    }, {
        text: 'Odcinek',
        sortable: true,
        value: 'episodeNumber',
    }, {
        text: 'Sezon',
        sortable: true,
        value: 'seasonNumber',
        width: 'fit-content',
    }
]