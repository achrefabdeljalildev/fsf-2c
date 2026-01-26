import { Location } from '@angular/common';
import { inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '@shared/services/app.service';
import HijriDateConfig from '@shared/util/hijri-date-config';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

export abstract class BaseComponent {
    protected translateService: TranslateService;
    protected router: Router;
    protected route: ActivatedRoute;
    protected formBuilder: FormBuilder;
    protected location: Location;
    protected confirmationService: ConfirmationService;
    protected messageService: MessageService;
    protected appService = inject(AppService);

    subscriptions: Subscription = new Subscription();
    dateBasicConfig = HijriDateConfig;

    constructor() {
        this.translateService = inject(TranslateService);
        this.router = inject(Router);
        this.route = inject(ActivatedRoute);
        this.formBuilder = inject(FormBuilder);
        this.location = inject(Location);
        this.confirmationService = inject(ConfirmationService);
        this.messageService = inject(MessageService);
        this.appService = inject(AppService);
    }

    // -----------------------
    // Message utilities
    // -----------------------
    protected showMessage(message: string, title: string = 'success'): void {
        this.messageService.add({
            severity: title,
            summary: 'إشعار',
            detail: this.translate(message),
        });
    }

    protected showSuccessMessage(message: string): void {
        this.messageService.add({
            severity: 'success',
            summary: 'إشعار',
            detail: this.translate(message),
        });
    }

    protected showErrorMessage(message: string, title = 'error'): void {
        this.messageService.add({
            severity: 'error',
            summary: 'إشعار',
            detail: this.translate(message),
        });
    }

    protected confirmDelete(
        itemName: string,
        onConfirm: () => void,
        header: string = 'messages.deleteConfirmation',
    ): void {
        this.confirmationService.confirm({
            message: this.translateService.instant('messages.confirmDelete', { item: itemName }),
            header: this.translateService.instant(header),
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: this.translateService.instant('common.yes'),
            rejectLabel: this.translateService.instant('common.no'),
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                onConfirm();
            },
        });
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

    protected getTranslatedEnum(enumListName: string): { value: string; label: string }[] {
        const translatedObj = this.translateService.instant(enumListName) as Record<string, string>;
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
        this.appService.toggleLanguage({ code: newLang });

        window.location.reload();
    }
}
