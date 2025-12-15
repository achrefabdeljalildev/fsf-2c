import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LocationListComponent } from './location-list/location-list.component';
import { Card } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

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
        Card,
        TagModule,
        DividerModule,
        TableModule,
        CheckboxModule,
    ],
    declarations: [LocationListComponent],
})
export class LocationModule {}
