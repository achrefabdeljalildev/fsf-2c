import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NumberOfParticipatingEntitiesListComponent } from './components/number-of-participating-entities-list/number-of-participating-entities-list.component';
import { NumberOfParticipatingEntitiesViewComponent } from './components/number-of-participating-entities-view/number-of-participating-entities-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: NumberOfParticipatingEntitiesListComponent,
    },
    {
        path: 'create',
        component: NumberOfParticipatingEntitiesViewComponent,
    },
    {
        path: 'edit/:id',
        component: NumberOfParticipatingEntitiesViewComponent,
    },
];

@NgModule({
    declarations: [
        NumberOfParticipatingEntitiesListComponent,
        NumberOfParticipatingEntitiesViewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class NumberOfParticipatingEntitiesModule {}
