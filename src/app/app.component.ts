import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-SA';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'luxon';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    CaseRequest: any;
    errorMessage = '';
    currentRoute: string = '';
    showDecisionPopup: boolean = false;
    employeeCases: any[] = [];
    isSubmitting = false;

    private readonly routesToCheck = ['/services', '/approval-center'];
    private readonly pageSize = 10;
    private readonly pageIndex = 0;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private translateService: TranslateService,
    ) {
        registerLocaleData(localeAr, 'ar-SA');
        const savedLang = localStorage.getItem('i18n_locale') || 'ar';
        translateService.addLangs(['en', 'ar']);
        translateService.setDefaultLang('ar');
        Settings.defaultLocale = savedLang;
        translateService.use(savedLang);

        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => {
                    return route.data.pipe(
                        map((routeData: any) => {
                            const title = routeData['title'];
                            return { title };
                        }),
                    );
                }),
                tap((data: any) => {
                    let title = data.title;
                    title = (title ? title + ' | ' : '') + 'FSF 2C';
                    this.titleService.setTitle(title);
                }),
            )
            .subscribe();
        let currentLang = localStorage.getItem('i18n_locale') || 'ar';
        Settings.defaultLocale = currentLang;
        this.translateService.use(currentLang);

        console.info('App Version: ', environment.appVersion);
    }
    ngOnInit(): void {
        // écoute route → check & éventuel open popup
        this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                debounceTime(50),
                map(() => this.router.url),
                distinctUntilChanged(),
                tap((url) => {
                    this.currentRoute = url;
                }),
            )
            .subscribe();
    }

    private clearCache() {
        if ('caches' in window) {
            caches.keys().then((cacheNames) => {
                cacheNames.forEach((cacheName) => {
                    caches.delete(cacheName).then(() => {
                        console.log(`Cache ${cacheName} deleted`);
                    });
                });
            });
        }

        // Clear Cookies
        const cookies = document.cookie.split('; ');
        cookies.forEach((cookie) => {
            const cookieName = cookie.split('=')[0];
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        });

        // Clear Local Storage
        localStorage.clear();

        // Clear Session Storage
        sessionStorage.clear();
        // Clear IndexedDB
        if ('indexedDB' in window) {
            const dbNames = ['your-db-name']; // List of your IndexedDB names (or you can try clearing all)
            dbNames.forEach((dbName) => {
                const request = indexedDB.deleteDatabase(dbName);
                request.onsuccess = () => {
                    console.log(`IndexedDB ${dbName} cleared`);
                };
                request.onerror = (error) => {
                    console.error(`Error clearing IndexedDB ${dbName}:`, error);
                };
            });
        }
    }
}
