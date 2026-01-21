import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreparingTheNamesOfHypothesesListComponent } from './components/preparing-the-names-of-hypotheses-list/preparing-the-names-of-hypotheses-list.component';
import { PreparingTheNamesOfHypothesesViewComponent } from './components/preparing-the-names-of-hypotheses-view/preparing-the-names-of-hypotheses-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: PreparingTheNamesOfHypothesesListComponent,
    },
    {
        path: 'create',
        component: PreparingTheNamesOfHypothesesViewComponent,
    },
    {
        path: 'edit/:id',
        component: PreparingTheNamesOfHypothesesViewComponent,
    },
];

@NgModule({
    declarations: [
        PreparingTheNamesOfHypothesesListComponent,
        PreparingTheNamesOfHypothesesViewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AutoCompleteModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class PreparingTheNamesOfHypothesesModule {}
