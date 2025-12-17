export class AuthModel {
    tokenId: string;
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
    success: boolean;
    errors: string;

    constructor(tokenId: string, expiresIn: number, accessToken: string, refreshToken: string, success: boolean, errors: string) {
        this.tokenId = tokenId;
        this.expiresIn = expiresIn;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.success = success;
        this.errors = errors;
    }
}
