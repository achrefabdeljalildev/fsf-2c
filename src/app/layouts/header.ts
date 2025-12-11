import { Component, Input, input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { toggleAnimation } from 'src/app/shared/animations';
import { AppService } from '../service/app.service';
import { LanguageService } from '../service/language.service';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

@Component({
    moduleId: module.id,
    selector: 'header',
    templateUrl: './header.html',
    animations: [toggleAnimation],
})
export class HeaderComponent
    extends BaseComponent
    implements OnInit, OnDestroy
{
    @Input() hasBreadcrumb: boolean = false;

    store: any;
    search = false;
    showDecisionPopup = false;
    CaseRequest: any;
    errorMessage = '';

    constructor(
        public storeData: Store<any>,
        private appSetting: AppService,
        private languageService: LanguageService,
    ) {
        super();
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

    setActiveDropdown() {
        const selector = document.querySelector(
            'ul.horizontal-menu a[routerLink="' +
                window.location.pathname +
                '"]',
        );
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll(
                'ul.horizontal-menu .nav-link.active',
            );
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul
                    .closest('li.menu')
                    .querySelectorAll('.nav-link');
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
        this.translateService.use(item.code);
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
        return this.translateService.instant('decisionPopup.title');
    }

    get decisionPopupMessage(): string {
        return this.translateService.instant('decisionPopup.message');
    }
}
