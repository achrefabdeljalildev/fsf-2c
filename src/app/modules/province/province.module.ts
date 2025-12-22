import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvinceListComponent } from './components/province-list/province-list.component';
import { ProvinceViewComponent } from './components/province-view/province-view.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

const routes: Routes = [
    {
        path: '',
        component: ProvinceListComponent,
    },
    {
        path: 'create',
        component: ProvinceViewComponent,
    },
    {
        path: 'edit/:id',
        component: ProvinceViewComponent,
    },
];

@NgModule({
    declarations: [ProvinceListComponent, ProvinceViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        AutoCompleteModule,
    ],
})
export class ProvinceModule {}
