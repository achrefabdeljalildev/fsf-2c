import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: UserInfo;
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
    private readonly API_BASE = environment.production ? '/api' : '/api';
    private readonly TOKEN_KEY = environment.USERDATA_KEY || 'authToken';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';

    private authStateSubject = new BehaviorSubject<AuthState>(
        this.getInitialState(),
    );
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
    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http
            .post<LoginResponse>(`${this.API_BASE}/auth/login`, credentials)
            .pipe(
                map((response) => {
                    this.storeAuthData(response);
                    this.authStateSubject.next({
                        isAuthenticated: true,
                        user: response.user,
                        token: response.token,
                    });

                    return response;
                }),
            );
    }

    /**
     * Logout and clear stored auth data
     */
    logout(): void {
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
            .post<LoginResponse>(`${this.API_BASE}/auth/refresh`, {
                refreshToken,
            })
            .pipe(
                map((response) => {
                    this.storeAuthData(response);
                    this.authStateSubject.next({
                        isAuthenticated: true,
                        user: response.user,
                        token: response.token,
                    });
                    return response;
                }),
            );
    }

    /**
     * Verify token validity
     */
    verifyToken(): Observable<{ valid: boolean }> {
        return this.http.post<{ valid: boolean }>(
            `${this.API_BASE}/auth/verify`,
            { token: this.getToken() },
        );
    }

    /**
     * Store auth data (token, refresh token, user) in localStorage
     */
    private storeAuthData(response: LoginResponse): void {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
    }

    /**
     * Retrieve stored token from localStorage or sessionStorage
     */
    private getStoredToken(): string | null {
        return (
            localStorage.getItem(this.TOKEN_KEY) ||
            sessionStorage.getItem(this.TOKEN_KEY) ||
            null
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
