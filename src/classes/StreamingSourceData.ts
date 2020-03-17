export interface StreamingSourceDataInterface {
    id: string;
    name: string;
    path: string;
}

export default class StreamingSourceData {
    readonly id: string;
    name: string;
    path: URL;

    constructor({ id, name, path }: StreamingSourceDataInterface) {
        this.id = id;
        this.name = name;
        this.path = new URL(path);
    }
}