import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { FallingLoadClassificationListComponent } from './components/classification-list/classification-list.component';
import { FallingLoadClassificationViewComponent } from './components/classification-view/classification-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: FallingLoadClassificationListComponent,
    },
    {
        path: 'create',
        component: FallingLoadClassificationViewComponent,
    },
    {
        path: 'edit/:id',
        component: FallingLoadClassificationViewComponent,
    },
];

@NgModule({
    declarations: [FallingLoadClassificationListComponent, FallingLoadClassificationViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class FallingLoadClassificationModule {}
