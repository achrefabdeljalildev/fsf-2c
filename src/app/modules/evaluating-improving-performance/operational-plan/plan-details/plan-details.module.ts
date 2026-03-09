import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { planDetailsComponent } from './components/plan-details.component';
const routes: Routes = [
    {
        path: 'list',
        component: planDetailsComponent,
    },
];

@NgModule({
    declarations: [planDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class planDetailsModule {}
