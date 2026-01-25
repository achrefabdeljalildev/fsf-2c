import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HypotheseTypeListComponent } from './components/hypothese-type-list/hypothese-type-list.component';
import { HypotheseTypeViewComponent } from './components/hypothese-type-view/hypothese-type-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: HypotheseTypeListComponent,
    },
    {
        path: 'create',
        component: HypotheseTypeViewComponent,
    },
    {
        path: 'edit/:id',
        component: HypotheseTypeViewComponent,
    },
];

@NgModule({
    declarations: [HypotheseTypeListComponent, HypotheseTypeViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class HypotheseTypeModule {}
