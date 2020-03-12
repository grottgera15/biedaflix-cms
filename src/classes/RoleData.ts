import Authorities from '@/enums/Authorities';

interface RoleDataInterface {
    id: string;
    name: string;
    allowedOperations: Array<Authorities>;
}

export default class RoleData {
    private _id: string;
    public name: string;
    public allowedOperations: Array<Authorities>;
    
    get id() {
        return this._id;
    }

    constructor({id, name, allowedOperations}: RoleDataInterface) {
        this._id = id;
        this.name = name;
        this.allowedOperations = allowedOperations;
    }
}