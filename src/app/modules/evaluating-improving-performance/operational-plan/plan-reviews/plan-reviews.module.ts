import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { planReviewsComponent } from './components/plan-reviews.component';
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
        component: planReviewsComponent,
    },
];

@NgModule({
    declarations: [planReviewsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
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
export class planReviewsModule {}
