import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { Card } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { FieldSurveyDashboardComponent } from 'src/app/modules/field-survey/components/field-survey-dashboard/field-survey-dashboard.component';
import { FieldSurveyViewComponent } from 'src/app/modules/field-survey/components/field-survey-view/field-survey-view.component';
import { PagesModule } from 'src/app/shared/pages/pages.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FieldSurveyListComponent } from './components/field-survey-list/field-survey-list.component';

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
        FileUploadModule,
        SelectModule,
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
