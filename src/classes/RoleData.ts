import Authorities from '@/enums/Authorities';

interface RoleDataInterface {
    id: string;
    name: string;
    allowedOperations: Array<Authorities>;
}

export default class RoleData {
    readonly id: string;
    public name: string;
    public allowedOperations: Array<Authorities>;

    constructor({id, name, allowedOperations}: RoleDataInterface) {
        this.id = id;
        this.name = name;
        this.allowedOperations = allowedOperations;
    }
}