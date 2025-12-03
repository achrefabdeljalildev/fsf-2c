import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class InterceptService implements HttpInterceptor {
    private authLocalStorageToken = environment.USERDATA_KEY;
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router) {}

    private getAuthFromLocalStorage(): AuthModel | undefined {
        try {
            const lsValue = localStorage.getItem(this.authLocalStorageToken);
            if (!lsValue) {
                return undefined;
            }
            const authData = JSON.parse(lsValue);
            return authData;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    private saveAuthToLocalStorage(auth: AuthModel): void {
        localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const auth = this.getAuthFromLocalStorage();
        if (auth) {
            request = this.addTokenHeader(request, auth.accessToken);
        } else {
            console.error('Error token not found !!!', auth);
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401 && auth && !request.url.includes('/refreshtoken')) {
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

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        // if (!this.isRefreshing) {
        //     this.isRefreshing = true;
        //     this.refreshTokenSubject.next(null);

        //     const auth = this.getAuthFromLocalStorage();
        //     if (auth?.refreshToken) {
        //         return this.authHttpService.refreshToken(auth.tokenId, auth.refreshToken).pipe(
        //             switchMap((tokenData: any) => {
        //                 const updatedAuth: AuthModel = { ...auth, tokenId: tokenData.token };
        //                 this.saveAuthToLocalStorage(updatedAuth);

        //                 this.refreshTokenSubject.next(tokenData.token);
        //                 this.isRefreshing = false;

        //                 return next.handle(this.addTokenHeader(request, tokenData.token));
        //             }),
        //             catchError((err) => {
        //                 this.isRefreshing = false;
        //                 console.error(err);
        //                 localStorage.removeItem(this.authLocalStorageToken);
        //                 if (err.url.includes('Administration/api/Account/refreshtoken')) {
        //                     this.router.navigate(['/auth/login']);
        //                 }
        //                 return throwError(() => err);
        //             }),
        //         );
        //     }
        // }

        return this.refreshTokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((jwt) => next.handle(this.addTokenHeader(request, jwt))),
        );
    }
}
