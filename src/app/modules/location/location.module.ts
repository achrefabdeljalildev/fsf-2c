import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { Card } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { LocationDashboardComponent } from 'src/app/modules/location/components/location-dashboard/location-dashboard.component';
import { LocationViewComponent } from 'src/app/modules/location/components/location-view/location-view.component';
import { SaudiMapComponent } from 'src/app/modules/location/components/saudi-map/saudi-map.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationListComponent } from './components/location-list/location-list.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: LocationDashboardComponent,
    },
    {
        path: 'list',
        component: LocationListComponent,
    },
    {
        path: 'create',
        component: LocationViewComponent,
    },
    {
        path: 'edit/:id',
        component: LocationViewComponent,
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
        TabsModule,
        AutoCompleteModule,
        SharedModule,
        SelectModule,
    ],
    declarations: [
        LocationDashboardComponent,
        LocationListComponent,
        LocationViewComponent,
        SaudiMapComponent,
    ],
})
export class LocationModule {}
