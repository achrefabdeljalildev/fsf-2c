import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { toggleAnimation } from 'src/app/shared/animations';
import Swal from 'sweetalert2';
import { AppService } from '../service/app.service';
import { LanguageService } from '../service/language.service';

@Component({
    moduleId: module.id,
    selector: 'header',
    templateUrl: './header.html',
    animations: [toggleAnimation],
})
export class HeaderComponent implements OnInit, OnDestroy {
    store: any;
    search = false;
    showDecisionPopup = false;
    CaseRequest: any;
    errorMessage = '';

    constructor(
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService,
        private languageService: LanguageService,
    ) {
        this.initStore();
    }

    ngOnDestroy(): void {}

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    ngOnInit() {
        this.setActiveDropdown();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.setActiveDropdown();
            }
        });
    }
    private showNewNotificationMessage(message: string): void {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: 'success',
            title: this.translate.instant(message) || message,
        });
    }

    setActiveDropdown() {
        const selector = document.querySelector('ul.horizontal-menu a[routerLink="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ar') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        this.languageService.changeLanguage(item.code).subscribe(
            (response) => {
                window.location.reload();
            },
            (error) => {
                console.error('Error changing language:', error);
            },
        );
    }

    navigateToNotifications() {
        this.router.navigate(['/notifications']);
    }

    get decisionPopupTitle(): string {
        return this.translate.instant('decisionPopup.title');
    }

    get decisionPopupMessage(): string {
        return this.translate.instant('decisionPopup.message');
    }
}
