import RoleData from './RoleData';

interface UserDataInterface {
    id: string;
    email: string;
    username: string;
    roles?: Array<RoleData>;
    accepted?: boolean;
}

export default class UserData{
    private _id: string;
    public email: string;
    public username: string;
    public roles?: Array<RoleData>;
    public accepted?: boolean;

    get id() {
        return this._id;
    }

    constructor({id, email, username, roles, accepted}: UserDataInterface) {
        this._id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.accepted = accepted;
    }

}