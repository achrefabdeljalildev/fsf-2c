import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HypothesesInvolvedPartyListComponent } from './components/hypotheses-involved-party-list/hypotheses-involved-party-list.component';
import { HypothesesInvolvedPartyViewComponent } from './components/hypotheses-involved-party-view/hypotheses-involved-party-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: HypothesesInvolvedPartyListComponent,
    },
    {
        path: 'create',
        component: HypothesesInvolvedPartyViewComponent,
    },
    {
        path: 'edit/:id',
        component: HypothesesInvolvedPartyViewComponent,
    },
];

@NgModule({
    declarations: [HypothesesInvolvedPartyListComponent, HypothesesInvolvedPartyViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class HypothesesInvolvedPartyModule {}
