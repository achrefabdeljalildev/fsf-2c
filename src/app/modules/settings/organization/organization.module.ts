import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationViewComponent } from './components/organization-view/organization-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: 'list',
        component: OrganizationListComponent,
    },
    {
        path: 'create',
        component: OrganizationViewComponent,
    },
    {
        path: 'edit/:id',
        component: OrganizationViewComponent,
    },
];

@NgModule({
    declarations: [OrganizationListComponent, OrganizationViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class OrganizationModule {}
