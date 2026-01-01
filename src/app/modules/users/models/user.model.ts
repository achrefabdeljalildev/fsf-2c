export interface UserModel {
    id?: number;
    fullName: string;
    identityNumber: number;
    jobName: string;
    rankName: string;
    password: string;
    roles?: number[]; // Array of role IDs
}
