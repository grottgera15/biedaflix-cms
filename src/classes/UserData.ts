import RoleData from './RoleData';

export interface UserDataInterface {
    id: string;
    email: string;
    username: string;
    avatar: string;
    roles?: Array<RoleData>;
    accepted?: boolean;
}

export default class UserData{
    readonly id: string;
    public email: string;
    public username: string;
    public avatar: string;
    public roles?: Array<RoleData>;
    public accepted?: boolean;

    constructor({id, email, username, avatar, roles, accepted}: UserDataInterface) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.avatar = avatar;
        this.roles = roles;
        this.accepted = accepted;
    }

}