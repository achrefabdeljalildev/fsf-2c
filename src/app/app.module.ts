import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { routes } from './app.route';
import { AppComponent } from './app.component';

// store
import { StoreModule } from '@ngrx/store';
import { indexReducer } from './store/index.reducer';

// shared module
import { SharedModule } from 'src/app/shared/shared.module';

// i18n
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// dashboard
import { NgxSpinnerService } from 'ngx-spinner';

// primeng components
import { Tree } from 'primeng/tree';
import { AppLayoutsModule } from 'src/app/layouts/layouts.module';

// App config (PrimeNG + async animations)
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { InterceptService } from 'src/app/shared/services/intercept.service';
import Aura from '@primeuix/themes/aura';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';

// AOT compilation support
export function HttpLoaderFactory(httpHandler: HttpBackend): TranslateHttpLoader {
    return new TranslateHttpLoader(new HttpClient(httpHandler));
}

@NgModule({
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false || 'none',
                },
            },
        }),
    ],
})
export class AppConfigModule {}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
        BrowserModule,
        BrowserAnimationsModule,
        AppConfigModule,
        CommonModule,
        ToastModule,
        FormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpBackend],
            },
        }),
        StoreModule.forRoot({ index: indexReducer }),
        SharedModule.forRoot(),
        Tree,
        AppLayoutsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    providers: [
        Title,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptService,
            multi: true,
        },
        provideFlatpickrDefaults(),
        MessageService,
        {
            provide: LOCALE_ID,
            deps: [TranslateService],
            useFactory: (langService: TranslateService) => langService.currentLang ?? 'ar-SA',
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        private router: Router,
        private spinnerService: NgxSpinnerService,
    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                spinnerService.show();
            }

            if (event instanceof NavigationEnd) {
                document
                    .querySelector('meta[property=og\\:url')
                    ?.setAttribute('content', window.location.href);
                spinnerService.hide();
            }
        });
    }
}
