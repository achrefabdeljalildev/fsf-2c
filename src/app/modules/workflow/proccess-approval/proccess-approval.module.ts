import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcessApprovalListComponent } from './components/process-approval-list/process-approval-list.component';
import { ProcessApprovalViewComponent } from './components/process-approval-view/process-approval-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ProcessApprovalListComponent,
    },
    {
        path: 'create',
        component: ProcessApprovalViewComponent,
    },
    {
        path: 'edit/:id',
        component: ProcessApprovalViewComponent,
    },
];

@NgModule({
    declarations: [ProcessApprovalListComponent, ProcessApprovalViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class ProcessApprovalModule {}
