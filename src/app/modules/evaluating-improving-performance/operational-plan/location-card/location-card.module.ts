import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { locationCardComponent } from './components/location-card.component';
const routes: Routes = [
    {
        path: 'list',
        component: locationCardComponent,
    },
];

@NgModule({
    declarations: [locationCardComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class locationCardModule {}
