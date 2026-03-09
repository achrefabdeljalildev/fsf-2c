import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { dutyShiftsListComponent } from './components/duty-shifts-list/duty-shifts-list.component';
import { dutyShiftsViewComponent } from './components/duty-shifts-view/duty-shifts-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: dutyShiftsListComponent,
    },
    {
        path: 'create',
        component: dutyShiftsViewComponent,
    },
    {
        path: 'edit/:id',
        component: dutyShiftsViewComponent,
    },
];

@NgModule({
    declarations: [dutyShiftsListComponent, dutyShiftsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class dutyShiftsModule {}
