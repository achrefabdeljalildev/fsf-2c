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
import { LocationViewComponent } from 'src/app/modules/location/components/location-view/location-view.component';
import { TabsModule } from 'primeng/tabs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { FlatpickrDirective } from 'angularx-flatpickr';
import { SaudiMapsModule } from 'src/app/modules/saudi-maps/saudi-maps.module';

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
        FlatpickrDirective,
        SaudiMapsModule,
    ],
    declarations: [LocationDashboardComponent, LocationListComponent, LocationViewComponent],
})
export class LocationModule {}
