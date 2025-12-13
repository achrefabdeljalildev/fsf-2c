import { Routes } from '@angular/router';
// dashboard
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SampleComponent } from 'src/app/sample.component';
import { AuthGuard } from 'src/app/modules/shared/services/guard.service';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'pages',
        component: AuthLayout,
        children: [
            // pages
            {
                path: '',
                loadChildren: () =>
                    import('./pages/pages.module').then((d) => d.PagesModule),
            },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'locations',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./modules/location/location.module').then(
                (m) => m.LocationModule,
            ),
    },
    {
        path: 'services',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: SampleComponent,
            },
        ],
    },
];
