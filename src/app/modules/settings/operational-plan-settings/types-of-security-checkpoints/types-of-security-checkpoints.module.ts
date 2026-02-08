import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypesOfSecurityCheckpointsListComponent } from './components/types-of-security-checkpoints-list/types-of-security-checkpoints-list.component';
import { TypesOfSecurityCheckpointsViewComponent } from './components/types-of-security-checkpoints-view/types-of-security-checkpoints-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: TypesOfSecurityCheckpointsListComponent,
    },
    {
        path: 'create',
        component: TypesOfSecurityCheckpointsViewComponent,
    },
    {
        path: 'edit/:id',
        component: TypesOfSecurityCheckpointsViewComponent,
    },
];

@NgModule({
    declarations: [
        TypesOfSecurityCheckpointsListComponent,
        TypesOfSecurityCheckpointsViewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class TypesOfSecurityCheckpointsModule {}
