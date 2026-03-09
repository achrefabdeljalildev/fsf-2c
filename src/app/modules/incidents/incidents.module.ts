import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { incidentsListComponent } from './components/incidents-list/incidents-list.component';
import { incidentsViewComponent } from './components/incidents-view/incidents-view.component';
import { incidentsDashboardComponent } from './components/incidents-dashboard/incidents-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputText } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { Textarea } from 'primeng/textarea';
import { Timeline } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';

const routes: Routes = [
    {
        path: 'dashboard',
        component: incidentsDashboardComponent,
    },
    {
        path: 'list',
        component: incidentsListComponent,
    },
    {
        path: 'create',
        component: incidentsViewComponent,
    },
    {
        path: 'edit/:id',
        component: incidentsViewComponent,
    },
];

@NgModule({
    declarations: [incidentsListComponent, incidentsViewComponent, incidentsDashboardComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule,
        ReactiveFormsModule,
        SharedModule,
        Card,
        BreadcrumbModule,
        TagModule,
        DividerModule,
        TableModule,
        CheckboxModule,
        SelectModule,
        Textarea,
        InputText,
        TabsModule,
        PanelModule,
        TooltipModule,
        Timeline,
    ],
})
export class incidentsModule {}
