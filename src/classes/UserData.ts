import RoleData from './RoleData';

interface UserDataInterface {
    id: string;
    email: string;
    username: string;
    roles?: Array<RoleData>;
    accepted?: boolean;
}

export default class UserData{
    readonly id: string;
    public email: string;
    public username: string;
    public roles?: Array<RoleData>;
    public accepted?: boolean;

    constructor({id, email, username, roles, accepted}: UserDataInterface) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.roles = roles;
        this.accepted = accepted;
    }

}