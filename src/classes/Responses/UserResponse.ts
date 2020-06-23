import { RoleResponse } from './RoleResponse';

interface StandardUserResponse {
    id: string;
    email: string;
    username: string;
}

interface AdministrativeUserResponse extends StandardUserResponse {
    roles: Array<RoleResponse>;
    accepted: boolean;
}