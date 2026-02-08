import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { WorkSystemsListComponent } from './components/work-systems-list/work-systems-list.component';
import { WorkSystemsViewComponent } from './components/work-systems-view/work-systems-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: WorkSystemsListComponent,
    },
    {
        path: 'create',
        component: WorkSystemsViewComponent,
    },
    {
        path: 'edit/:id',
        component: WorkSystemsViewComponent,
    },
];

@NgModule({
    declarations: [WorkSystemsListComponent, WorkSystemsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class WorkSystemsModule {}
