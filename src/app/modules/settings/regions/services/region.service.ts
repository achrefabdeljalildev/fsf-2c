import { Injectable } from '@angular/core';
import { Region } from '../models/region.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_REGIONS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class RegionService extends BaseService<Region> {
    constructor() {
        super(API_URL_REGIONS);
    }
}
