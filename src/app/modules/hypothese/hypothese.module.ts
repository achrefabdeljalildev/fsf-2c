import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { Card } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabPanel, TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { HypotheseDashboardComponent } from './components/hypothese-dashboard/hypothese-dashboard.component';
import { HypotheseInvolvedComponent } from './components/hypothese-involved/hypothese-involved.component';
import { HypotheseListComponent } from './components/hypothese-list/hypothese-list.component';
import { HypotheseViewComponent } from './components/hypothese-view/hypothese-view.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: HypotheseDashboardComponent,
    },
    {
        path: 'list',
        component: HypotheseListComponent,
    },
    {
        path: 'create',
        component: HypotheseViewComponent,
    },
    {
        path: 'edit/:id',
        component: HypotheseViewComponent,
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
        DatePickerModule,
        MultiSelectModule,
        SelectModule,
        Textarea,
        InputText,
        TabsModule,
        TabPanel,
    ],
    declarations: [
        HypotheseListComponent,
        HypotheseViewComponent,
        HypotheseInvolvedComponent,
        HypotheseDashboardComponent,
    ],
})
export class HypotheseModule {}
