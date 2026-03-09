import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { dutyOfficersListComponent } from './components/duty-officers-list/duty-officers-list.component';
import { dutyOfficersViewComponent } from './components/duty-officers-view/duty-officers-view.component';
const routes: Routes = [
    {
        path: 'list',
        component: dutyOfficersListComponent,
    },
    {
        path: 'create',
        component: dutyOfficersViewComponent,
    },
    {
        path: 'edit/:id',
        component: dutyOfficersViewComponent,
    },
];

@NgModule({
    declarations: [dutyOfficersListComponent, dutyOfficersViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class dutyOfficersModule {}
