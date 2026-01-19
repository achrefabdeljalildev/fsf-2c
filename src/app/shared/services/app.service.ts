import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseStore } from 'src/app/store/base.store';
import { $themeConfig } from '../util/theme.config';

@Injectable()
export class AppService {
    constructor(
        public translate: TranslateService,
        private ui: BaseStore,
    ) {
        this.initStoreData();
    }

    initStoreData() {
        // set default styles
        let val: any = localStorage.getItem('theme'); // light, dark, system
        val = val || $themeConfig.theme;
        this.ui.toggleTheme(val);

        val = localStorage.getItem('menu'); // vertical, collapsible-vertical, horizontal
        val = val || $themeConfig.menu;
        this.ui.toggleMenu(val);

        val = localStorage.getItem('layout'); // full, boxed-layout
        val = val || $themeConfig.layout;
        this.ui.toggleLayout(val);

        val = localStorage.getItem('i18n_locale'); // en, da, de, el, es, fr, hu, it, ja, pl, pt, ru, sv, tr, zh
        val = val || $themeConfig.locale;

        const list = this.ui.state().languageList;
        const item = list.find((item: any) => item.code === val);
        if (item) {
            this.toggleLanguage(item);
        }

        val = localStorage.getItem('rtlClass'); // rtl, ltr
        val = val || $themeConfig.rtlClass;
        this.ui.toggleRTL(val);

        val = localStorage.getItem('animation'); // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
        val = val || $themeConfig.animation;
        this.ui.toggleAnimation(val);

        val = localStorage.getItem('navbar'); // navbar-sticky, navbar-floating, navbar-static
        val = val || $themeConfig.navbar;
        this.ui.toggleNavbar(val);

        val = localStorage.getItem('semidark');
        val = val === 'true' ? true : $themeConfig.semidark;
        this.ui.toggleSemidark(val);
    }

    toggleLanguage(item: any) {
        let lang: any = null;
        lang = 'en';
        if (item) {
            lang = item;
        } else {
            let code = this.translate.currentLang || null;
            if (!code) {
                code = localStorage.getItem('i18n_locale');
            }

            const list = this.ui.state().languageList;
            item = list.find((d: any) => d.code === code);
            if (item) {
                lang = item;
            }
        }

        if (!lang) {
            const list = this.ui.state().languageList;
            lang = list.find((d: any) => d.code === 'en');
        }

        this.translate.use(lang.code);
        this.ui.toggleLocale(lang.code);
        return lang;
    }

    changeAnimation(type = 'add') {
        const animation = this.ui.state().animation;
        if (animation) {
            const ele: any = document.querySelector('.animation');
            if (type === 'add') {
                ele?.classList.add('animate__animated');
                ele?.classList.add(animation);
            } else {
                ele?.classList.remove('animate__animated');
                ele?.classList.remove(animation);
            }
        }
    }
}
