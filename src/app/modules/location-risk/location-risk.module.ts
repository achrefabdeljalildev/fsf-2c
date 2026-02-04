import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { Card } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { LocationRiskViewComponent } from 'src/app/modules/location-risk/components/location-risk-view/location-risk-view.component';
import { LocationRiskListComponent } from './components/location-risk-list/location-risk-list.component';
import { LocationRiskDashboardComponent } from './components/location-risk-dashboard/location-risk-dashboard.component';
import { Timeline } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';
import { Overlay } from 'primeng/overlay';

const routes: Routes = [
    {
        path: 'dashboard',
        component: LocationRiskDashboardComponent,
    },
    {
        path: 'list',
        component: LocationRiskListComponent,
    },
    {
        path: 'list/:locationId',
        component: LocationRiskListComponent,
    },
    {
        path: 'create',
        component: LocationRiskViewComponent,
    },
    {
        path: 'create/:locationId',
        component: LocationRiskViewComponent,
    },
    {
        path: 'edit/:id',
        component: LocationRiskViewComponent,
    },
    {
        path: 'edit/:id/:locationId',
        component: LocationRiskViewComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        Card,
        TagModule,
        DividerModule,
        TableModule,
        CheckboxModule,
        SelectModule,
        Textarea,
        InputText,
        TabsModule,
        PanelModule,
        Timeline,
        TooltipModule,
        Overlay,
    ],
    declarations: [
        LocationRiskListComponent,
        LocationRiskViewComponent,
        LocationRiskDashboardComponent,
    ],
})
export class LocationRiskModule {}
