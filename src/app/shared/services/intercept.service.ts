import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class InterceptService implements HttpInterceptor {
    private readonly TOKEN_KEY = environment.USERDATA_KEY || 'authToken';
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<string | null> =
        new BehaviorSubject<string | null>(null);

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = this.getTokenFromLocalStorage();
        if (token) {
            request = this.addTokenHeader(request, token);
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (
                    error.status === 401 &&
                    !request.url.includes('/Authentication/Refresh')
                ) {
                    return this.handle401Error(request, next);
                }
                return throwError(() => error);
            }),
        );
    }

    private addTokenHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    private handle401Error(
        request: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((response) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(response.accessToken);
                    return next.handle(
                        this.addTokenHeader(request, response.accessToken),
                    );
                }),
                catchError((error) => {
                    this.isRefreshing = false;
                    console.error('Token refresh failed:', error);
                    this.authService.logout();
                    this.router.navigate(['/auth/login']);
                    return throwError(() => error);
                }),
            );
        }

        return this.refreshTokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((token) =>
                next.handle(this.addTokenHeader(request, token!)),
            ),
        );
    }

    private getTokenFromLocalStorage(): string | null {
        try {
            return localStorage.getItem(this.TOKEN_KEY);
        } catch (error) {
            console.error('Error reading token from localStorage:', error);
            return null;
        }
    }
}
