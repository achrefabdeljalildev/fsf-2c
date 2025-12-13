import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LocationListComponent } from './location-list/location-list.component';

const routes: Routes = [
    {
        path: '',
        component: LocationListComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        LocationListComponent,
    ],
})
export class LocationModule {}
