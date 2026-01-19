import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GeneralSettingsListComponent } from './components/general-settings-list/general-settings-list.component';
import { GeneralSettingsViewComponent } from './components/general-settings-view/general-settings-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: GeneralSettingsListComponent,
    },
    {
        path: 'create',
        component: GeneralSettingsViewComponent,
    },
    {
        path: 'edit/:id',
        component: GeneralSettingsViewComponent,
    },
];

@NgModule({
    declarations: [GeneralSettingsListComponent, GeneralSettingsViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class GeneralSettingsModule {}
