import { Routes } from '@angular/router';
// dashboard
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { AuthGuard } from 'src/app/modules/shared/services/guard.service';
import { DashboardComponent } from 'src/app/layouts/dashboard/dashboard.component';
import { MaintenenceComponent } from 'src/app/pages/maintenence';

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
        component: AuthLayout,
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
                component: MaintenenceComponent,
            },
        ],
    },
];
