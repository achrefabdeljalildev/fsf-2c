import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    API_URL_AUTH_LOGIN,
    API_URL_AUTH_REFRESH,
    API_URL_AUTH_REQUEST_OTP,
    API_URL_AUTH_VALIDATE_OTP,
    API_URL_AUTH_VERIFY,
} from 'src/app/shared/consts/api.urls';
import { ApiResponseModel } from 'src/app/shared/models/base/paged-response.model';

export interface LoginRequest {
    identityNumber: number;
    password: string;
}

export interface OtpRequest {
    identityNumber: number;
}

export interface OtpValidationRequest {
    identityNumber: number;
    otpCode: string;
}

export interface RegisterRequest {
    fullName: string;
    identityNumber: number;
    jobName: string;
    rankName: string;
    password: string;
}

export interface RefreshTokenData {
    userName: string;
    tokenString: string;
    expireAt: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: RefreshTokenData;
    user?: UserInfo;
}

export interface UserInfo {
    id: string;
    username: string;
    email: string;
    role: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: UserInfo | null;
    token: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly TOKEN_KEY = 'authToken';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';

    private authStateSubject = new BehaviorSubject<AuthState>(this.getInitialState());

    public authState$ = this.authStateSubject.asObservable();

    constructor(private http: HttpClient) {
        this.initializeAuthState();
    }

    /**
     * Initialize auth state from localStorage on service creation
     */
    private initializeAuthState(): void {
        const token = this.getStoredToken();
        const user = this.getStoredUser();

        if (token && user) {
            this.authStateSubject.next({
                isAuthenticated: true,
                user,
                token,
            });
        }
    }

    /**
     * Get initial auth state
     */
    private getInitialState(): AuthState {
        return {
            isAuthenticated: false,
            user: null,
            token: null,
        };
    }

    /**
     * Login with username and password
     */
    login(credentials: LoginRequest): Observable<{
        data: LoginResponse;
    }> {
        return this.http
            .post<{
                data: LoginResponse;
            }>(API_URL_AUTH_LOGIN, credentials)
            .pipe(
                map((response) => {
                    this.storeAuthData(response.data);
                    this.authStateSubject.next({
                        isAuthenticated: true,
                        user: response.data.user || null,
                        token: response.data.accessToken,
                    });

                    return response;
                }),
            );
    }

    /**
     * Register a new user
     */
    register(userData: RegisterRequest): Observable<ApiResponseModel<any>> {
        return this.http.post<ApiResponseModel<any>>('/Authentication/Register', userData);
    }

    /**
     * Request OTP for login
     */
    requestOtp(data: OtpRequest): Observable<ApiResponseModel<any>> {
        return this.http.post<ApiResponseModel<any>>(API_URL_AUTH_REQUEST_OTP, data);
    }

    /**
     * Validate OTP and complete login
     */
    validateOtp(data: OtpValidationRequest): Observable<{
        data: LoginResponse;
    }> {
        return this.http
            .post<{
                data: LoginResponse;
            }>(API_URL_AUTH_VALIDATE_OTP, data)
            .pipe(
                map((response) => {
                    this.storeAuthData(response.data);
                    this.authStateSubject.next({
                        isAuthenticated: true,
                        user: response.data.user || null,
                        token: response.data.accessToken,
                    });

                    return response;
                }),
            );
    }

    /**
     * Logout and clear stored auth data
     */
    logout(): Observable<void> | void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        sessionStorage.removeItem(this.TOKEN_KEY);
        this.authStateSubject.next(this.getInitialState());
    }

    /**
     * Get current auth state
     */
    getAuthState(): AuthState {
        return this.authStateSubject.value;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        return !!this.getStoredToken();
    }

    /**
     * Get stored authentication token
     */
    getToken(): string | null {
        return this.getStoredToken();
    }

    /**
     * Get stored refresh token
     */
    getRefreshToken(): string | null {
        return (
            localStorage.getItem(this.REFRESH_TOKEN_KEY) ||
            sessionStorage.getItem(this.REFRESH_TOKEN_KEY) ||
            null
        );
    }

    /**
     * Get current user info
     */
    getCurrentUser(): UserInfo | null {
        return this.getStoredUser();
    }

    /**
     * Refresh authentication token
     */
    refreshToken(): Observable<LoginResponse> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            this.logout();
            throw new Error('No refresh token available');
        }

        return this.http
            .post<LoginResponse>(API_URL_AUTH_REFRESH, {
                refreshToken,
            })
            .pipe(
                map((response) => {
                    this.storeAuthData(response);
                    this.authStateSubject.next({
                        isAuthenticated: true,
                        user: response.user || null,
                        token: response.accessToken,
                    });
                    return response;
                }),
            );
    }

    /**
     * Verify token validity
     */
    verifyToken(): Observable<ApiResponseModel<any>> {
        return this.http.get<ApiResponseModel<any>>(`${API_URL_AUTH_VERIFY}`, {
            params: { AccessToken: this.getToken() || '' },
        });
    }

    /**
     * Store auth data (token, refresh token, user) in localStorage
     */
    private storeAuthData(response: LoginResponse): void {
        localStorage.setItem(this.TOKEN_KEY, response.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken.tokenString);
        if (response.user) {
            localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
    }

    /**
     * Retrieve stored token from localStorage or sessionStorage
     */
    private getStoredToken(): string | null {
        return (
            localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY) || null
        );
    }

    /**
     * Retrieve stored user info from localStorage
     */
    private getStoredUser(): UserInfo | null {
        const userJson = localStorage.getItem('currentUser');
        if (!userJson) {
            return null;
        }
        try {
            return JSON.parse(userJson) as UserInfo;
        } catch {
            return null;
        }
    }
}
