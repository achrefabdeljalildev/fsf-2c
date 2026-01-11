import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationClassificationListComponent } from './components/location-classification-list/location-classification-list.component';
import { LocationClassificationViewComponent } from './components/location-classification-view/location-classification-view.component';

const routes: Routes = [
    { path: 'list', component: LocationClassificationListComponent },
    { path: 'create', component: LocationClassificationViewComponent },
    { path: 'edit/:id', component: LocationClassificationViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
    declarations: [LocationClassificationListComponent, LocationClassificationViewComponent],
})
export class LocationClassificationModule {}
