import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';

export interface UiState {
    isDarkMode: boolean;
    theme: 'light' | 'dark' | 'system' | string;
    menu: 'vertical' | 'collapsible-vertical' | 'horizontal' | string;
    layout: 'full' | 'boxed-layout' | string;
    rtlClass: 'rtl' | 'ltr' | string;
    animation: string;
    navbar: 'navbar-sticky' | 'navbar-floating' | 'navbar-static' | string;
    locale: string;
    sidebar: boolean;
    languageList: Array<{ code: string; name: string }>;
    isShowMainLoader: boolean;
    semidark: boolean;
}

const initialState: UiState = {
    isDarkMode: false,
    theme: 'light',
    menu: 'vertical',
    layout: 'full',
    rtlClass: 'rtl',
    animation: '',
    navbar: 'navbar-sticky',
    locale: 'ar',
    sidebar: false,
    languageList: [
        { code: 'en', name: 'English' },
        { code: 'ar', name: 'Arabic' },
    ],
    isShowMainLoader: true,
    semidark: false,
};

@Injectable({ providedIn: 'root' })
export class BaseStore {
    private readonly _state: WritableSignal<UiState> = signal(initialState);

    readonly state = computed(() => this._state());

    select<K extends keyof UiState>(key: K) {
        return computed(() => this._state()[key]);
    }

    toggleMainLoader(show: boolean) {
        this._state.update((s) => ({ ...s, isShowMainLoader: show }));
    }

    toggleTheme(theme?: UiState['theme']) {
        const current = this._state().theme;
        const payload = theme ?? current;
        localStorage.setItem('theme', payload);
        let isDarkMode = this._state().isDarkMode || false;
        if (payload === 'light') {
            isDarkMode = false;
        } else if (payload === 'dark') {
            isDarkMode = true;
        } else if (payload === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                isDarkMode = true;
            } else {
                isDarkMode = false;
            }
        }
        if (isDarkMode) {
            document.querySelector('body')?.classList.add('dark');
        } else {
            document.querySelector('body')?.classList.remove('dark');
        }
        this._state.update((s) => ({ ...s, theme: payload, isDarkMode }));
    }

    toggleMenu(menu?: UiState['menu']) {
        const payload = menu ?? this._state().menu;
        localStorage.setItem('menu', payload);
        this._state.update((s) => ({ ...s, sidebar: false, menu: payload }));
    }

    toggleLayout(layout?: UiState['layout']) {
        const payload = layout ?? this._state().layout;
        localStorage.setItem('layout', payload);
        this._state.update((s) => ({ ...s, layout: payload }));
    }

    toggleRTL(rtl?: UiState['rtlClass']) {
        const payload = rtl ?? this._state().rtlClass;
        localStorage.setItem('rtlClass', payload);
        document.querySelector('html')?.setAttribute('dir', payload || 'ltr');
        this._state.update((s) => ({ ...s, rtlClass: payload }));
    }

    toggleAnimation(animation?: string) {
        let payload = (animation ?? this._state().animation)?.trim();
        localStorage.setItem('animation', payload);
        if (payload) {
            const eleanimation: any = document.querySelector('.animation');
            eleanimation?.classList.add('animate__animated');
            eleanimation?.classList.add(payload);
        }
        this._state.update((s) => ({ ...s, animation: payload }));
    }

    toggleNavbar(navbar?: UiState['navbar']) {
        const payload = navbar ?? this._state().navbar;
        localStorage.setItem('navbar', payload);
        this._state.update((s) => ({ ...s, navbar: payload }));
    }

    toggleSemidark(value?: boolean) {
        const payload = value ?? this._state().semidark ?? false;
        localStorage.setItem('semidark', String(payload));
        this._state.update((s) => ({ ...s, semidark: payload }));
    }

    toggleLocale(locale?: string) {
        const payload = locale ?? this._state().locale;
        localStorage.setItem('i18n_locale', payload);
        this._state.update((s) => ({ ...s, locale: payload }));
    }

    toggleSidebar() {
        this._state.update((s) => ({ ...s, sidebar: !s.sidebar }));
    }

    readonly isDarkMode = this.select('isDarkMode');
    readonly theme = this.select('theme');
    readonly menu = this.select('menu');
    readonly layout = this.select('layout');
    readonly rtlClass = this.select('rtlClass');
    readonly navbar = this.select('navbar');
    readonly locale = this.select('locale');
    readonly sidebar = this.select('sidebar');
    readonly semidark = this.select('semidark');
}
