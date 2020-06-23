interface Path {
    name: string;
    path: string;
    icon: string;
}

const navigationDrawer: ReadonlyArray<Path> = [
    {
        name: 'Seriale',
        path: '/series/',
        icon: 'video_library'
    },
    {
        name: 'Źródła',
        path: '/sources/',
        icon: 'visibility'
    },
    {
        name: 'Użytkownicy',
        path: '/users/',
        icon: 'people'
    },
    {
        name: 'Role',
        path: '/roles/',
        icon: 'settings'
    }
];

export {
    navigationDrawer
};