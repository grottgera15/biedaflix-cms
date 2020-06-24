import { DataTableHeader } from 'vuetify';

export const headers: Array<DataTableHeader> = [
    {
        text: 'Akcje',
        sortable: false,
        value: 'actions',
        width: 'min-content'
    },
    {
        text: 'Język',
        sortable: true,
        value: 'language',
        width: '100%'
    }
]