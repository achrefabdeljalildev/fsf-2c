import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/layouts/dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/services/guard.service';
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';

export const routes: Routes = [
    // No data key (auth & pages)
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

    // fieldSurvey routes
    {
        path: 'location',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location/location.module').then((m) => m.LocationModule),
        data: { key: 'fieldSurvey' },
    },
    {
        path: 'location-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/location-classification/location-classification.module').then(
                (m) => m.LocationClassificationModule,
            ),
        data: { key: 'fieldSurvey' },
    },
    {
        path: 'entity-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/entity-classfications/entity-classfications.module').then(
                (m) => m.EntityClassficationsModule,
            ),
        data: { key: 'fieldSurvey' },
    },
    {
        path: 'field-survey',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/field-survey/field-survey.module').then((m) => m.FieldSurveyModule),
        data: { key: 'fieldSurvey' },
    },

    // hypothese routes
    {
        path: 'hypothese',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/hypothese/hypothese.module').then((m) => m.HypotheseModule),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypothese-types',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/hypothese-settings/hypothese-types/hypothese-type.module').then(
                (m) => m.HypotheseTypeModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypothese-titles',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/hypothese-settings/hypothese-titles/hypothese-title.module').then(
                (m) => m.HypotheseTitleModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypotheses-involved-parties',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/hypothese-settings/hypotheses-involved-parties/hypotheses-involved-party.module').then(
                (m) => m.HypothesesInvolvedPartyModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'location-hypothesis-criterias',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/hypothese-settings/location-hypothesis-criterias/location-hypothesis-criteria.module').then(
                (m) => m.LocationHypothesisCriteriaModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypotheses-involved-parties-criterias',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/hypothese-settings/involved-parties-criterias/involved-parties-criteria.module').then(
                (m) => m.HypothesesInvolvedPartiesCriteriaModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypothese-evaluation',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/hypothese-evaluation/hypothese-evaluation.module').then(
                (m) => m.HypotheseEvaluationModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'hypothese-evaluations',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/hypothese-evaluation/hypothese-evaluation.module').then(
                (m) => m.HypotheseEvaluationModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'location-risk',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location-risk/location-risk.module').then(
                (m) => m.LocationRiskModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'risk-register-settings/classification-of-risk-type',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-type/classification-of-risk-type.module').then(
                (m) => m.ClassificationOfRiskTypeModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'risk-register-settings/falling-load-classification',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/falling-load-classification/falling-load-classification.module').then(
                (m) => m.FallingLoadClassificationModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'risk-register-settings/classification-of-risk-impact',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-impact/classification-of-risk-impact.module').then(
                (m) => m.ClassificationOfRiskImpactModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'risk-register-settings/classification-of-risk-situations',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/risk-register-settings/classification-of-risk-situations/classification-of-risk-situations.module').then(
                (m) => m.ClassificationOfRiskSituationsModule,
            ),
        data: { key: 'hypothese' },
    },
    {
        path: 'location-risk-register',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location/location.module').then((m) => m.LocationModule),
        data: { key: 'hypothese' },
    },

    // globalSettings routes
    {
        path: 'global-settings',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/global-settings/global-settings.module').then(
                (m) => m.GlobalSettingsModule,
            ),
        data: { key: 'globalSettings' },
    },
    {
        path: 'organization',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/organization/organization.module').then(
                (m) => m.OrganizationModule,
            ),
        data: { key: 'globalSettings' },
    },
    {
        path: 'regions',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/regions/region.module').then((m) => m.RegionModule),
        data: { key: 'globalSettings' },
    },
    {
        path: 'province',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/settings/province/province.module').then((m) => m.ProvinceModule),
        data: { key: 'globalSettings' },
    },
    {
        path: 'users',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
        data: { key: 'globalSettings' },
    },
    {
        path: 'executed-process',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/workflow/executed-proccess/excuted-process.module').then(
                (m) => m.ExcutedProcessModule,
            ),
        data: { key: 'globalSettings' },
    },
    {
        path: 'process-approval',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/workflow/proccess-approval/proccess-approval.module').then(
                (m) => m.ProcessApprovalModule,
            ),
        data: { key: 'globalSettings' },
    },
];
