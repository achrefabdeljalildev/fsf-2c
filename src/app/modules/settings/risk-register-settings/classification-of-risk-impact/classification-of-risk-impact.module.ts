import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassificationOfRiskImpactListComponent } from './components/impact-list/impact-list.component';
import { ClassificationOfRiskImpactViewComponent } from './components/impact-view/impact-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ClassificationOfRiskImpactListComponent,
    },
    {
        path: 'create',
        component: ClassificationOfRiskImpactViewComponent,
    },
    {
        path: 'edit/:id',
        component: ClassificationOfRiskImpactViewComponent,
    },
];

@NgModule({
    declarations: [
        ClassificationOfRiskImpactListComponent,
        ClassificationOfRiskImpactViewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class ClassificationOfRiskImpactModule {}
