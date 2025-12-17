import { Injectable } from '@angular/core';
import { Region } from 'src/app/modules/regions/models/region.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class RegionService extends BaseService<Region> {
    constructor() {
        super('/Regions');
    }
}
