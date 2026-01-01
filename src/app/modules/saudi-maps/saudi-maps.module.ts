import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SaudiMapComponent } from './components/saudi-map/saudi-map.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: SaudiMapComponent,
    },
];

@NgModule({
    declarations: [SaudiMapComponent],
    exports: [SaudiMapComponent],
    imports: [RouterModule.forChild(routes), CommonModule, HttpClientModule, TranslateModule],
})
export class SaudiMapsModule {}
