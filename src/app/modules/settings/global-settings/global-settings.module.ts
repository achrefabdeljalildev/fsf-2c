import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalSettingsListComponent } from './components/global-settings-list/global-settings-list.component';
import { GlobalSettingsViewComponent } from './components/global-settings-view/global-settings-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: GlobalSettingsListComponent,
    },
    {
        path: 'create',
        component: GlobalSettingsListComponent,
    },
    {
        path: 'edit/:id',
        component: GlobalSettingsListComponent,
    },
];

@NgModule({
    declarations: [GlobalSettingsListComponent, GlobalSettingsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class GlobalSettingsModule {}
