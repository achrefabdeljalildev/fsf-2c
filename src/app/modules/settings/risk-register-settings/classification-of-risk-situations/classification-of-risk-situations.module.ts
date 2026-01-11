import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
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
