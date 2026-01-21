import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/layouts/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/services/guard.service';
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: DashboardComponent,
    },
    {
        path: 'pages',
        canActivate: [AuthGuard],
        component: AuthLayout,
        loadChildren: () => import('./shared/pages/pages.module').then((d) => d.PagesModule),
    },
    {
        path: 'auth',
        component: AuthLayout,
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'location',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location/location.module').then((m) => m.LocationModule),
    },
    {
        path: 'location-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/location-classification/location-classification.module').then(
                (m) => m.LocationClassificationModule,
            ),
    },
    {
        path: 'entity-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/entity-classfications/entity-classfications.module').then(
                (m) => m.EntityClassficationsModule,
            ),
    },
    {
        path: 'users',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        data: { isGlobalSettings: true },
    },
    {
        path: 'field-survey',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/field-survey/field-survey.module').then((m) => m.FieldSurveyModule),
    },
    {
        path: 'location-risk',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location-risk/location-risk.module').then(
                (m) => m.LocationRiskModule,
            ),
    },
    {
        path: 'regions',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/regions/region.module').then((m) => m.RegionModule),
    },
    {
        path: 'global-settings',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/global-settings/global-settings.module').then(
                (m) => m.GlobalSettingsModule,
            ),
        data: { isGlobalSettings: true },
    },
    {
        path: 'province',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/province/province.module').then((m) => m.ProvinceModule),
    },
    {
        path: 'organization',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/organization/organization.module').then(
                (m) => m.OrganizationModule,
            ),
    },
    {
        path: 'risk-register-settings/classification-of-risk-type',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-type/classification-of-risk-type.module').then(
                (m) => m.ClassificationOfRiskTypeModule,
            ),
    },
    {
        path: 'risk-register-settings/falling-load-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/falling-load-classification/falling-load-classification.module').then(
                (m) => m.FallingLoadClassificationModule,
            ),
    },
    {
        path: 'risk-register-settings/classification-of-risk-impact',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-impact/classification-of-risk-impact.module').then(
                (m) => m.ClassificationOfRiskImpactModule,
            ),
    },
    {
        path: 'risk-register-settings/classification-of-risk-situations',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-situations/classification-of-risk-situations.module').then(
                (m) => m.ClassificationOfRiskSituationsModule,
            ),
    },
    {
        path: 'assumption-settings/number-of-participating-entities',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/assumption-settings/number-of-participating-entities/number-of-participating-entities.module').then(
                (m) => m.NumberOfParticipatingEntitiesModule,
            ),
    },
    {
        path: 'assumption-settings/preparing-the-names-of-hypotheses',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/assumption-settings/preparing-the-names-of-hypotheses/preparing-the-names-of-hypotheses.module').then(
                (m) => m.PreparingTheNamesOfHypothesesModule,
            ),
    },
    {
        path: 'assumption-settings/Types-of-hypotheses',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/assumption-settings/Types-of-hypotheses/Types-of-hypotheses.module').then(
                (m) => m.TypeOfHypothesesModule,
            ),
    },
];
