import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TypesOfPatrolsListComponent } from 'src/app/modules/settings/operational-plan-settings/types-of-patrols/components/types-of-patrols-list/types-of-patrols-list.component';
import { TypesOfPatrolsViewComponent } from 'src/app/modules/settings/operational-plan-settings/types-of-patrols/components/types-of-patrols-view/types-of-patrols-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: 'list',
        component: TypesOfPatrolsListComponent,
    },
    {
        path: 'create',
        component: TypesOfPatrolsViewComponent,
    },
    {
        path: 'edit/:id',
        component: TypesOfPatrolsViewComponent,
    },
];

@NgModule({
    declarations: [TypesOfPatrolsListComponent, TypesOfPatrolsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class TypesOfPatrolsModule {}
