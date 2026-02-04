import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TypesOfPatrolsListComponent } from './components/types-of-patrols-list/types-of-patrols-list.component';
import { TypesOfPatrolsViewComponent } from './components/types-of-patrols-view/types-of-patrols-view.component';

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
