import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FieldSurveyListComponent } from './components/field-survey-list/field-survey-list.component';
import { Card } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from 'src/app/shared/shared.module';
import { FieldSurveyDashboardComponent } from 'src/app/modules/field-survey/components/field-survey-dashboard/field-survey-dashboard.component';
import { FieldSurveyViewComponent } from 'src/app/modules/field-survey/components/field-survey-view/field-survey-view.component';
import { TabsModule } from 'primeng/tabs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PagesModule } from 'src/app/shared/pages/pages.module';

const routes: Routes = [
    {
        path: 'dashboard',
        component: FieldSurveyDashboardComponent,
    },
    {
        path: 'list',
        component: FieldSurveyListComponent,
    },
    {
        path: 'create',
        component: FieldSurveyViewComponent,
    },
    {
        path: 'edit/:id',
        component: FieldSurveyViewComponent,
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
        PagesModule,
    ],
    declarations: [
        FieldSurveyDashboardComponent,
        FieldSurveyListComponent,
        FieldSurveyViewComponent,
    ],
})
export class FieldSurveyModule {}
