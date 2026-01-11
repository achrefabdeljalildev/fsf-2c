import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassificationOfRiskSituationsListComponent } from './components/situations-list/situation-list.component';
import { ClassificationOfRiskSituationsViewComponent } from './components/situations-view/situation-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ClassificationOfRiskSituationsListComponent,
    },
    {
        path: 'create',
        component: ClassificationOfRiskSituationsViewComponent,
    },
    {
        path: 'edit/:id',
        component: ClassificationOfRiskSituationsViewComponent,
    },
];

@NgModule({
    declarations: [
        ClassificationOfRiskSituationsListComponent,
        ClassificationOfRiskSituationsViewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class ClassificationOfRiskSituationsModule {}
