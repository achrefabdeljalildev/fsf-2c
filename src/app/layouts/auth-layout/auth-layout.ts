import { Component } from '@angular/core';
import { BaseStore } from 'src/app/store/base.store';
import { AppService } from '../../shared/services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './auth-layout.html',
    standalone: false,
})
export class AuthLayout {
    showTopButton = false;
    headerClass = '';

    // Signals
    sidebar = this.ui.sidebar;
    menu = this.ui.menu;
    layout = this.ui.layout;
    rtlClass = this.ui.rtlClass;
    isShowMainLoader = this.ui.select('isShowMainLoader');

    constructor(
        private service: AppService,
        private ui: BaseStore,
    ) {}

    ngOnInit() {
        this.toggleLoader();
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                this.showTopButton = true;
            } else {
                this.showTopButton = false;
            }
        });
    }

    toggleLoader() {
        this.ui.toggleMainLoader(true);
        setTimeout(() => {
            this.ui.toggleMainLoader(false);
        }, 500);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', () => {});
    }

    // Using signals; no NgRx subscription needed

    goToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
