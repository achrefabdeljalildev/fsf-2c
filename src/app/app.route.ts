import { Routes } from '@angular/router';
// dashboard
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
// import { AuthGuard } from './modules/shared/services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
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
        // canActivate: [AuthGuard],
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'services',
        component: AppLayout,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
        ],
    },
];
