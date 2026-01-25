import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationHypothesisCriteriaChildFormComponent } from './components/location-hypothesis-criteria-child-form/location-hypothesis-criteria-child-form.component';
import { LocationHypothesisCriteriaListComponent } from './components/location-hypothesis-criteria-list/location-hypothesis-criteria-list.component';
import { LocationHypothesisCriteriaViewComponent } from './components/location-hypothesis-criteria-view/location-hypothesis-criteria-view.component';

const routes: Routes = [
    {
        path: 'list',
        component: LocationHypothesisCriteriaListComponent,
    },
];

@NgModule({
    declarations: [
        LocationHypothesisCriteriaListComponent,
        LocationHypothesisCriteriaViewComponent,
        LocationHypothesisCriteriaChildFormComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class LocationHypothesisCriteriaModule {}
