import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryViewComponent } from './components/country-view/country-view.component';

const routes: Routes = [
    {
        path: '',
        component: CountryListComponent,
    },
    {
        path: 'create',
        component: CountryViewComponent,
    },
    {
        path: 'edit/:id',
        component: CountryViewComponent,
    },
];

@NgModule({
    declarations: [CountryListComponent, CountryViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class CountryModule {}
