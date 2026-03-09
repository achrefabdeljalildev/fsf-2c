import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { distributionIndividualsListComponent } from './components/distribution-individuals-list/distribution-individuals-list.component';
import { distributionIndividualsViewComponent } from './components/distribution-individuals-view/distribution-individuals-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: distributionIndividualsListComponent,
    },
    {
        path: 'create',
        component: distributionIndividualsViewComponent,
    },
    {
        path: 'edit/:id',
        component: distributionIndividualsViewComponent,
    },
];

@NgModule({
    declarations: [distributionIndividualsListComponent, distributionIndividualsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class distributionIndividualsModule {}
