import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { ToasterService } from 'src/app/modules/shared/services/toaster.service';
import { BreadcrumbService } from 'src/app/modules/shared/components/mui-breadcrumb/breadcrumb.service';
import { Subscription } from 'rxjs';

export abstract class BaseComponent {
    protected translateService: TranslateService;
    protected router: Router;
    protected route: ActivatedRoute;
    protected formBuilder: FormBuilder;
    protected location: Location;
    protected toasterService: ToasterService;
    protected breadcrumbService: BreadcrumbService;

    subscriptions: Subscription = new Subscription();

    constructor() {
        this.translateService = inject(TranslateService);
        this.router = inject(Router);
        this.route = inject(ActivatedRoute);
        this.formBuilder = inject(FormBuilder);
        this.location = inject(Location);
        this.toasterService = inject(ToasterService);
        this.breadcrumbService = inject(BreadcrumbService);
    }

    // -----------------------
    // Message utilities
    // -----------------------
    protected showMessage(message: string, title: string = 'success'): void {
        this.toasterService.showMessage(message, title);
    }

    protected showSuccessMessage(message: string): void {
        this.toasterService.showSuccessMessage(message);
    }

    protected showErrorMessage(message: string, title = 'error'): void {
        this.toasterService.showErrorMessage(message);
    }

    protected navigateTo(url: string): void {
        this.router.navigate([url]);
    }

    protected isActiveLink(route: string) {
        return route ? this.router.url === route : false;
    }

    protected removeExtraSpaces(input: string | null | undefined): string {
        if (input) {
            return input.trim().replace(/\s+/g, ' ');
        } else {
            return '';
        }
    }

    protected navigateToUrlWithQueryParams(url: string, params: any) {
        this.router.navigate([url], { queryParams: params });
    }

    protected getTranslatedEnum(
        enumListName: string,
    ): { value: string; label: string }[] {
        const translatedObj = this.translateService.instant(
            enumListName,
        ) as Record<string, string>;
        return Object.keys(translatedObj).map((key) => ({
            value: key,
            label: translatedObj[key],
        }));
    }

    protected translate(key: string): string {
        return this.translateService.instant(key);
    }

    protected isArabeMode(): boolean {
        return this.translateService.currentLang === 'ar';
    }

    toggleLanguage() {
        const newLang = this.isArabeMode() ? 'en' : 'ar';
        this.translateService.use(newLang);
        localStorage.setItem('i18n_locale', newLang);

        window.location.reload();
    }
}
