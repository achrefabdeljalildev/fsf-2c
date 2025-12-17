import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// shared module

import { Error404Component } from './error404';
import { Error500Component } from './error500';
import { Error503Component } from './error503';
import { MaintenenceComponent } from './maintenence';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: 'pages/error404',
        component: Error404Component,
        data: { title: 'Error 404' },
    },
    {
        path: 'pages/error500',
        component: Error500Component,
        data: { title: 'Error 500' },
    },
    {
        path: 'pages/error503',
        component: Error503Component,
        data: { title: 'Error 503' },
    },
    {
        path: 'pages/maintenence',
        component: MaintenenceComponent,
        data: { title: 'Maintenence' },
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
    declarations: [
        Error404Component,
        Error500Component,
        Error503Component,
        MaintenenceComponent,
    ],
})
export class PagesModule {}
