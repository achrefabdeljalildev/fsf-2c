import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { listOfPlansListComponent } from './components/list-of-plans-list/list-of-plans-list.component';
import { listOfPlansViewComponent } from './components/list-of-plans-view/list-of-plans-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: listOfPlansListComponent,
    },
    {
        path: 'create',
        component: listOfPlansViewComponent,
    },
    {
        path: 'edit/:id',
        component: listOfPlansViewComponent,
    },
];

@NgModule({
    declarations: [listOfPlansListComponent, listOfPlansViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class listOfPlansModule {}
