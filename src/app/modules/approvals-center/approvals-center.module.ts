import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { approvalsCenterListComponent } from './components/approvals-center-list/approvals-center-list.component';
import { approvalsCenterViewComponent } from './components/approvals-center-view/approvals-center-view.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { Timeline } from 'primeng/timeline';
import { TooltipModule } from 'primeng/tooltip';

const routes: Routes = [
    {
        path: 'list',
        component: approvalsCenterListComponent,
    },
    {
        path: 'create',
        component: approvalsCenterViewComponent,
    },
    {
        path: 'edit/:id',
        component: approvalsCenterViewComponent,
    },
];

@NgModule({
    declarations: [approvalsCenterListComponent, approvalsCenterViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        RouterModule.forChild(routes),

        ReactiveFormsModule,

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
        TooltipModule,
        Timeline,
    ],
})
export class approvalsCenterModule {}
