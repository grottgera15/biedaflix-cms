import { RoleResponse } from './RoleResponse';

export interface StandardUserResponse {
    id: string;
    email: string;
    username: string;
}

export interface AdministrativeUserResponse extends StandardUserResponse {
    roles: Array<RoleResponse>;
    accepted: boolean;
}