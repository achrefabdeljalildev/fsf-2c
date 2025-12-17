import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LocationListComponent } from './components/location-list/location-list.component';
import { Card } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationDashboardComponent } from 'src/app/modules/location/components/location-dashboard/location-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: LocationListComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        Card,
        TagModule,
        DividerModule,
        TableModule,
        CheckboxModule,
        SharedModule,
    ],
    declarations: [LocationDashboardComponent, LocationListComponent],
})
export class LocationModule {}
