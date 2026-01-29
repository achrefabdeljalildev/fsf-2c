import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from 'src/app/shared/shared.module';
import { EvaluationListComponent } from './components/evaluation-list/evaluation-list.component';
import { HypothesisEvaluationPageComponent } from './components/hypothesis-evaluation-page/hypothesis-evaluation-page.component';
import { LocationEvaluationFormComponent } from './components/location-evaluation-form/location-evaluation-form.component';
import { ParticipatingEvaluationFormComponent } from './components/participating-evaluation-form/participating-evaluation-form.component';

const routes: Routes = [
    {
        path: 'list',
        component: EvaluationListComponent,
    },
    {
        path: 'evaluate/:id',
        component: HypothesisEvaluationPageComponent,
    },
];

@NgModule({
    declarations: [
        EvaluationListComponent,
        LocationEvaluationFormComponent,
        ParticipatingEvaluationFormComponent,
        HypothesisEvaluationPageComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        ReactiveFormsModule,
        RatingModule,
        PanelModule,
    ],
})
export class HypotheseEvaluationModule {}
