import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseStore } from 'src/app/store/base.store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../shared/services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app-layout.html',
    standalone: false,
})
export class AppLayout {
    showTopButton = false;

    // Signals from UI store
    sidebar = this.ui.sidebar;
    menu = this.ui.menu;
    layout = this.ui.layout;
    rtlClass = this.ui.rtlClass;
    navbar = this.ui.navbar;
    isShowMainLoader = this.ui.select('isShowMainLoader');

    constructor(
        public translate: TranslateService,
        private service: AppService,
        private router: Router,
        private ui: BaseStore,
    ) {}
    headerClass = '';
    ngOnInit() {
        this.initAnimation();
        this.toggleLoader();

        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                this.showTopButton = true;
            } else {
                this.showTopButton = false;
            }
        });
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', () => {});
    }

    initAnimation() {
        this.service.changeAnimation();
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.service.changeAnimation();
            }
        });

        const ele: any = document.querySelector('.animation');
        ele.addEventListener('animationend', () => {
            this.service.changeAnimation('remove');
        });
    }

    toggleLoader() {
        this.ui.toggleMainLoader(true);
        setTimeout(() => {
            this.ui.toggleMainLoader(false);
        }, 500);
    }

    // Using signal store; no NgRx subscription needed

    goToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    toggleSidebar() {
        this.ui.toggleSidebar();
    }
}
