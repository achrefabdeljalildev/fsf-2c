import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/services/guard.service';
import { AppLayout } from './layouts/app-layout/app-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { DashboardComponent } from 'src/app/layouts/dashboard/dashboard.component';

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
        path: 'regions',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () => import('./modules/regions/region.module').then((m) => m.RegionModule),
    },
    {
        path: 'province',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/province/province.module').then((m) => m.ProvinceModule),
    },
    {
        path: 'organization',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/organization/organization.module').then((m) => m.OrganizationModule),
    },
];
