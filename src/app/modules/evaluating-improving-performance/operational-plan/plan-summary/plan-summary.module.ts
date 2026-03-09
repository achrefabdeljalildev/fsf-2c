import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { planSummaryComponent } from './components/plan-summary/plan-summary.component';
const routes: Routes = [
    {
        path: 'list',
        component: planSummaryComponent,
    },
];

@NgModule({
    declarations: [planSummaryComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class planSummaryModule {}
