import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
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
