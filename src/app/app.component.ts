import { registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar-SA';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings } from 'luxon';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: false,
})
export class AppComponent {
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private translateService: TranslateService,
    ) {
        this.setDefaultLang();
        this.changeTitle();
        console.info('App Version: ', environment.appVersion);
    }

    ngOnInit(): void {}

    setDefaultLang() {
        registerLocaleData(localeAr, 'ar-SA');
        const savedLang = localStorage.getItem('i18n_locale') || 'ar';
        this.translateService.addLangs(['en', 'ar']);
        this.translateService.setDefaultLang('ar');
        Settings.defaultLocale = savedLang;
        this.translateService.use(savedLang);
        let currentLang = localStorage.getItem('i18n_locale') || 'ar';
        Settings.defaultLocale = currentLang;
        this.translateService.use(currentLang);
    }

    changeTitle() {
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
    }
}
