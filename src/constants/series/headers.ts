import { DataTableHeader } from 'vuetify';

export const headers: Array<DataTableHeader> = [
    {
        text: 'Akcje',
        sortable: false,
        value: 'actions',
        width: 'min-content'
    },
    {
        text: 'Serial',
        value: 'name',
        divider: true
    }, {
        text: 'Stan',
        sortable: false,
        value: 'status',
        width: 'fit-content'
    }, {
        text: 'Ilość odcinków',
        value: 'episodes',
        width: 'fit-content'
    }
]