export interface StreamingSourceDataInterface {
    id: string;
    name: string;
    path: string;
}

export default class StreamingSourceData {
    private _id: string;
    name: string;
    path: URL;

    get id() {
        return this._id;
    }

    constructor({ id, name, path }: StreamingSourceDataInterface) {
        this._id = id;
        this.name = name;
        this.path = new URL(path);
    }
}