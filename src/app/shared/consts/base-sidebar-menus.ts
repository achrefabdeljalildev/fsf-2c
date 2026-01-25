export const CONST_SIDEBAR_MENUS = [
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
            {
                key: '13',
                label: 'تصنيفات المواقع',
                data: 'Sub Survey 2',
                routerLink: '/location-classification/list',
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
                key: '21',
                label: 'قائمة المسح الميداني',
                data: 'Sub Survey 1',
                icon: 'pi pi-file',
                routerLink: '/field-survey/list',
            },
            {
                key: '22',
                label: 'معايير المسح الميداني',
                data: 'Sub Survey 2',
                routerLink: '/entity-classification/list',
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
            {
                key: '32',
                label: 'اعدادات سجل المخاطر',
                data: 'Sub Survey 2',
                icon: 'assets/images/icons/settings-sidebar-logo.svg',
                children: [
                    {
                        key: '321',
                        label: 'تصنيف نوع الخطر',
                        data: 'Sub Survey 3',
                        routerLink: '/risk-register-settings/classification-of-risk-type/list',
                    },
                    {
                        key: '322',
                        label: 'تصنيف احتمال الوقوع',
                        data: 'Sub Survey 3',
                        routerLink: '/risk-register-settings/falling-load-classification/list',
                    },
                    {
                        key: '323',
                        label: 'تصنيف أثر الخطر',
                        data: 'Sub Survey 3',
                        routerLink: '/risk-register-settings/classification-of-risk-impact/list',
                    },
                    {
                        key: '324',
                        label: 'تصنيف حالات الخطر',
                        data: 'Sub Survey 3',
                        routerLink:
                            '/risk-register-settings/classification-of-risk-situations/list',
                    },
                ],
            },
        ],
    },
    {
        key: '4',
        label: 'الفرضيات',
        data: 'Hypotheses',
        icon: 'assets/images/icons/field-survey-sidebar.svg',
        children: [
            {
                key: '41',
                label: '  لوحة قيادة المختص',
                data: 'Hypothese Dashboard',
                icon: 'pi pi-list',
                routerLink: '/hypothese-dashboard/dashboard',
            },
            {
                key: '42',
                label: 'قائمة الفرضيات',
                data: 'Hypotheses List',
                icon: 'pi pi-list',
                routerLink: '/hypothese/list',
            },
            {
                key: '42',
                label: 'أنواع الفرضيات',
                data: 'Hypothese Types',
                icon: 'pi pi-list',
                routerLink: '/hypothese-types/list',
            },
            {
                key: '43',
                label: 'مسميات الفرضيات',
                data: 'Hypothese Names',
                icon: 'pi pi-list',
                routerLink: '/hypothese-titles/list',
            },
            {
                key: '44',
                label: 'الجهات المشاركة',
                data: 'Involved Parties',
                icon: 'pi pi-list',
                routerLink: '/hypotheses-involved-parties/list',
            },
            {
                key: '45',
                label: 'معايير الفرضيات',
                data: 'Hypothesis Criterias',
                icon: 'pi pi-objects-column',
                routerLink: '/location-hypothesis-criterias/list',
            },
        ],
    },
];
