import SeriesStatus from '@/enums/SeriesStatus';

const seriesStatus: Record<SeriesStatus, string> = {
    [SeriesStatus.ANNOUNCED]: 'Zapowiedziany',
    [SeriesStatus.FINISHED]: 'Zakończony',
    [SeriesStatus.NEW_EPISODES]: 'Nowe odcinki',
    [SeriesStatus.ONGOING]: 'W trakcie'
}

const seriesStatusComboBox = Object.keys(seriesStatus).map(status => {
    return {
        value: status,
        text: seriesStatus[status]
    }
});

export {
    seriesStatus,
    seriesStatusComboBox
}