const form: Readonly<Record<string, string>> = {

    textFieldSeriesName: 'Nazwa serialu',

    textFieldEpisodeName: 'Tytuł odcinka',
    textFieldEpisodeNameEmptyRule: 'Odcinek musi posiadać tytuł!',

    dateInputReleaseDate: 'Data wydania',
    dateInputReleaseDateEmptyRule: 'Odcinek musi posiadać datę wydania!',

    textFieldSeasonNumber: 'Numer sezonu',
    textFieldSeasonNumberLimitRule: 'Numer sezonu musi być większy od 0!',

    textFieldEpisodeNumber: 'Numer odcinka',
    textFieldEpisodeNumberLimitRule: 'Numer odcinka musi być większy bądź równy 0!',

    textAreaMagnetLink: 'Magnet link',
    textAreaMagnetLinkHint: 'Dodanie magnet linku rozpocznie automatyczne pobieranie pliku!',
    textAreaMagnetLinkValidationRule: 'Podany magnet link jest nie prawidłowy!',
    textAreaMagnetLinkEmptyRule: 'Odcinek musi posiadać magnet link!'
}

export { form };