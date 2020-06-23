import Authorities from '@/enums/Authorities';

export interface RoleResponse {
    id: string;
    name: string;
    allowedOperations: Array<Authorities>;
}