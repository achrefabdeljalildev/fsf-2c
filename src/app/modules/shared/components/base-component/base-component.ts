import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Location } from '@angular/common';
import { ModalService } from '../../modals/modal.service';

export abstract class BaseComponent {
    protected translateService: TranslateService;
    protected router: Router;
    protected route: ActivatedRoute;
    protected formBuilder: FormBuilder;
    protected location: Location;
    protected modalService: ModalService;

    constructor() {
        this.translateService = inject(TranslateService);
        this.router = inject(Router);
        this.route = inject(ActivatedRoute);
        this.formBuilder = inject(FormBuilder);
        this.location = inject(Location);
        this.modalService = inject(ModalService);
    }

    protected navigateTo(url: string): void {
        this.router.navigate([url]);
    }

    protected translate(key: string): string {
        return this.translateService.instant(key);
    }

    protected isArabeMode(): boolean {
        return this.translateService.currentLang === 'ar';
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

    protected getTranslatedEnum(enumListName: string): { value: string; label: string }[] {
        const translatedObj = this.translateService.instant(enumListName) as Record<string, string>;
        return Object.keys(translatedObj).map((key) => ({
            value: key,
            label: translatedObj[key],
        }));
    }
}
