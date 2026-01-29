import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvolvedPartiesCriteriaChildFormComponent } from './components/involved-parties-criteria-child-form/involved-parties-criteria-child-form.component';
import { InvolvedPartiesCriteriaListComponent } from './components/involved-parties-criteria-list/involved-parties-criteria-list.component';
import { InvolvedPartiesCriteriaViewComponent } from './components/involved-parties-criteria-view/involved-parties-criteria-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: InvolvedPartiesCriteriaListComponent,
    },
    {
        path: 'create',
        component: InvolvedPartiesCriteriaViewComponent,
    },
    {
        path: 'edit/:id',
        component: InvolvedPartiesCriteriaViewComponent,
    },
];

@NgModule({
    declarations: [
        InvolvedPartiesCriteriaListComponent,
        InvolvedPartiesCriteriaViewComponent,
        InvolvedPartiesCriteriaChildFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class HypothesesInvolvedPartiesCriteriaModule {}
