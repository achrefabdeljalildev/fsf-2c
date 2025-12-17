import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { RegionListComponent } from './components/region-list/region-list.component';
import { RegionViewComponent } from './components/region-view/region-view.component';

const routes: Routes = [
    {
        path: '',
        component: RegionListComponent,
    },
    {
        path: 'create',
        component: RegionViewComponent,
    },
    {
        path: 'edit/:id',
        component: RegionViewComponent,
    },
];

@NgModule({
    declarations: [RegionListComponent, RegionViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class RegionModule {}
