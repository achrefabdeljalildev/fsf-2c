import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExcutedProcessListComponent } from './components/excuted-process-list/excuted-process-list.component';
import { ExcutedProcessViewComponent } from './components/excuted-process-view/excuted-process-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: ExcutedProcessListComponent,
    },
    {
        path: 'create',
        component: ExcutedProcessViewComponent,
    },
    {
        path: 'edit/:id',
        component: ExcutedProcessViewComponent,
    },
];

@NgModule({
    declarations: [ExcutedProcessListComponent, ExcutedProcessViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class ExcutedProcessModule {}
