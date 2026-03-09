import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { listOfSitesListComponent } from './components/list-of-sites-list/list-of-sites-list.component';
import { listOfSitesViewComponent } from './components/list-of-sites-view/list-of-sites-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: listOfSitesListComponent,
    },
    {
        path: 'create',
        component: listOfSitesViewComponent,
    },
    {
        path: 'edit/:id',
        component: listOfSitesViewComponent,
    },
];

@NgModule({
    declarations: [listOfSitesListComponent, listOfSitesViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class listOfSitesModule {}
