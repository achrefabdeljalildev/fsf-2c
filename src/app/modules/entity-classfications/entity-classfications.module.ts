import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityClassficationsListComponent } from './components/entity-classfications-list/entity-classfications-list.component';
import { EntityClassficationsViewComponent } from './components/entity-classfications-view/entity-classfications-view.component';
import { EntityClassficationsTreeComponent } from './components/entity-classfications-tree/entity-classfications-tree.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { TreeTableModule } from 'primeng/treetable';

const routes: Routes = [
    { path: 'list', component: EntityClassficationsListComponent },
    { path: 'create', component: EntityClassficationsViewComponent },
    { path: 'edit/:id', component: EntityClassficationsViewComponent },
    { path: 'tree/:id', component: EntityClassficationsTreeComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule,
        OrganizationChartModule,
        TreeTableModule,
    ],
    declarations: [
        EntityClassficationsListComponent,
        EntityClassficationsViewComponent,
        EntityClassficationsTreeComponent,
    ],
})
export class EntityClassficationsModule {}
