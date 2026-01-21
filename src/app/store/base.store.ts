import { Injectable, WritableSignal, computed, signal } from '@angular/core';

export interface TreeNode {
    key: string;
    label: string;
    data?: string;
    icon?: string;
    routerLink?: string;
    children?: TreeNode[];
}

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
    sidebarMenus: TreeNode[];
    sidebarTitle: string;
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
    sidebarMenus: [
        {
            key: '1',
            label: ' المواقع',
            data: 'command and control',
            icon: 'assets/images/icons/location-sidebar.svg',
            children: [
                {
                    key: '11',
                    label: ' لوحة القيادة',
                    data: 'Sub Control 1',
                    icon: 'pi pi-objects-column',
                    routerLink: '/location/dashboard',
                },
                {
                    key: '12',
                    label: 'قائمة المواقع',
                    data: 'Sub Control 2',
                    icon: 'pi pi-list',
                    routerLink: '/location/list',
                },
            ],
        },
        {
            key: '2',
            label: 'المسح الميداني',
            data: 'Field Survey',
            icon: 'assets/images/icons/field-survey-sidebar.svg',
            children: [
                {
                    key: '20',
                    label: 'لوحة المسح الميداني',
                    data: 'Sub Survey Dashboard',
                    icon: 'pi pi-chart-bar',
                    routerLink: '/field-survey/dashboard',
                },
                {
                    key: '21',
                    label: 'قائمة المسح الميداني',
                    data: 'Sub Survey 1',
                    icon: 'pi pi-file',
                    routerLink: '/field-survey/list',
                },
            ],
        },
        {
            key: '3',
            label: 'مخاطر المواقع',
            data: 'Location Risks',
            icon: 'assets/images/icons/field-survey-sidebar.svg',
            children: [
                {
                    key: '31',
                    label: 'قائمة مخاطر المواقع',
                    data: 'Location Risks List',
                    icon: 'pi pi-list',
                    routerLink: '/location-risk/list',
                },
            ],
        },
        {
            key: '6',
            label: 'الإعدادات',
            data: 'Security Support',
            icon: 'assets/images/icons/settings-sidebar-logo.svg',
            children: [
                {
                    key: '6-1',
                    label: 'اعدادات سجل المخاطر',
                    data: 'Sub Survey 2',
                    icon: 'assets/images/icons/settings-sidebar-logo.svg',
                    children: [
                        {
                            key: '6-1-1',
                            label: 'تصنيف نوع الخطر',
                            data: 'Sub Survey 3',
                            routerLink: '/risk-register-settings/classification-of-risk-type/list',
                        },
                        {
                            key: '6-1-2',
                            label: 'تصنيف احتمال الوقوع',
                            data: 'Sub Survey 3',
                            routerLink: '/risk-register-settings/falling-load-classification/list',
                        },
                        {
                            key: '6-1-3',
                            label: 'تصنيف أثر الخطر',
                            data: 'Sub Survey 3',
                            routerLink:
                                '/risk-register-settings/classification-of-risk-impact/list',
                        },
                        {
                            key: '6-1-4',
                            label: 'تصنيف حالات الخطر',
                            data: 'Sub Survey 3',
                            routerLink:
                                '/risk-register-settings/classification-of-risk-situations/list',
                        },
                    ],
                },
                {
                    key: '6-2',
                    label: 'إعدادات الموقع',
                    data: 'Sub Survey 2',
                    icon: 'assets/images/icons/location-sidebar.svg',
                    children: [
                        {
                            key: '6-2-1',
                            label: 'الجهات',
                            data: 'Sub Survey 2',
                            routerLink: '/organization/list',
                        },
                        {
                            key: '6-2-2',
                            label: 'المناطق',
                            data: 'Sub Survey 2',
                            routerLink: '/regions/list',
                        },
                        {
                            key: '6-2-3',
                            label: 'المحافظات',
                            data: 'Sub Survey 2',
                            routerLink: '/province/list',
                        },
                        {
                            key: '6-2-4',
                            label: 'التصنيفات',
                            data: 'Sub Survey 2',
                            routerLink: '/location-classification/list',
                        },
                        {
                            key: '6-2-5',
                            label: 'معايير المسح الميداني',
                            data: 'Sub Survey 2',
                            routerLink: '/entity-classification/list',
                        },
                    ],
                },
            ],
        },
        {
            key: '7',
            label: 'إعدادات الفرضيات',
            data: 'Sub Survey 2',
            icon: 'assets/images/icons/assumption-settings-sidebar.svg',
            children: [
                {
                    key: '7-1',
                    label: 'اعداد الجهات المشاركة',
                    data: 'Sub Survey 2',
                    routerLink: '/assumption-settings/number-of-participating-entities/list',
                },
                {
                    key: '7-2',
                    label: 'اعداد مسميات الفرضيات',
                    data: 'Sub Survey 2',
                    routerLink: '/assumption-settings/preparing-the-names-of-hypotheses/list',
                },
                {
                    key: '7-3',
                    label: 'اعداد انواع الفرضيات',
                    data: 'Sub Survey 2',
                    routerLink: '/assumption-settings/Types-of-hypotheses/list',
                },
            ],
        },
    ],
    sidebarTitle: 'إدارة نظم المعلومات الأمنية',
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

    setSidebarMenus(menus: TreeNode[]) {
        this._state.update((s) => ({ ...s, sidebarMenus: menus }));
    }

    setSidebarTitle(title: string) {
        this._state.update((s) => ({ ...s, sidebarTitle: title }));
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
    readonly sidebarMenus = this.select('sidebarMenus');
    readonly sidebarTitle = this.select('sidebarTitle');
}
