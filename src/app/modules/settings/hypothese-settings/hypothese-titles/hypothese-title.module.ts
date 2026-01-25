import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { HypotheseTitleListComponent } from './components/hypothese-title-list/hypothese-title-list.component';
import { HypotheseTitleViewComponent } from './components/hypothese-title-view/hypothese-title-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: HypotheseTitleListComponent,
    },
    {
        path: 'create',
        component: HypotheseTitleViewComponent,
    },
    {
        path: 'edit/:id',
        component: HypotheseTitleViewComponent,
    },
];

@NgModule({
    declarations: [HypotheseTitleListComponent, HypotheseTitleViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        SelectModule,
    ],
})
export class HypotheseTitleModule {}
