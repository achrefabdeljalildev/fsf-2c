import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypeOfHypothesesListComponent } from './components/Types-of-hypotheses-list/Types-of-hypotheses-list.component';
import { TypeOfHypothesesViewComponent } from './components/Types-of-hypotheses-view/Types-of-hypotheses-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: TypeOfHypothesesListComponent,
    },
    {
        path: 'create',
        component: TypeOfHypothesesViewComponent,
    },
    {
        path: 'edit/:id',
        component: TypeOfHypothesesViewComponent,
    },
];

@NgModule({
    declarations: [TypeOfHypothesesListComponent, TypeOfHypothesesViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class TypeOfHypothesesModule {}
