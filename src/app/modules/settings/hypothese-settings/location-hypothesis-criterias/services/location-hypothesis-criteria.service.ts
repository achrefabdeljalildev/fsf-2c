import { Injectable } from '@angular/core';
import { API_URL_LOCATION_HYPOTHESIS_CRITERIAS } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import { LocationHypothesisCriteria } from '../models/location-hypothesis-criteria.model';

@Injectable({
    providedIn: 'root',
})
export class LocationHypothesisCriteriaService extends BaseService<LocationHypothesisCriteria> {
    constructor() {
        super(API_URL_LOCATION_HYPOTHESIS_CRITERIAS);
    }
}
