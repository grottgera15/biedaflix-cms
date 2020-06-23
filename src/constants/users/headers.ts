import { DataTableHeader } from 'vuetify';

export const headers: Array<DataTableHeader> = [
    {
        text: 'Akcje',
        value: 'actions',
        width: '1fr'
    },
    {
        text: 'Avatar',
        value: 'avatar',
        align: 'start',
        width: '1fr'
    },
    {
        text: 'Użytkownik',
        value: 'username',
        align: 'start',
        width: '100%'
    }, {
        text: 'Role',
        value: 'roles',
        width: 'fit-content'
    }, {
        text: 'Dostęp',
        value: 'accepted',
        width: 'fit-content'
    },
]