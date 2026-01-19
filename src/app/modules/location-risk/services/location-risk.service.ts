import { Injectable } from '@angular/core';
import { API_URL_LOCATION_RISKS } from '../../../shared/consts/api.urls';
import { BaseService } from '../../../shared/services/base.service';
import { LocationRisk } from '../models/location-risk.model';

@Injectable({
    providedIn: 'root',
})
export class LocationRiskService extends BaseService<LocationRisk> {
    constructor() {
        super(API_URL_LOCATION_RISKS);
    }
}
