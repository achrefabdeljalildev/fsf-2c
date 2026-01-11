import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassificationOfRiskTypeListComponent } from './components/type-list/type-list.component';
import { ClassificationOfRiskTypeViewComponent } from './components/type-view/type-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ClassificationOfRiskTypeListComponent,
    },
    {
        path: 'create',
        component: ClassificationOfRiskTypeViewComponent,
    },
    {
        path: 'edit/:id',
        component: ClassificationOfRiskTypeViewComponent,
    },
];

@NgModule({
    declarations: [ClassificationOfRiskTypeListComponent, ClassificationOfRiskTypeViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class ClassificationOfRiskTypeModule {}
