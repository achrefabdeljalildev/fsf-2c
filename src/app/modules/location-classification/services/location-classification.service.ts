import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { LocationClassification } from '../models/location-classification.model';
import { API_URL_LOCATION_CLASSIFICATIONS } from 'src/app/shared/consts/api.urls';

@Injectable({ providedIn: 'root' })
export class LocationClassificationService extends BaseService<LocationClassification> {
    constructor() {
        super(API_URL_LOCATION_CLASSIFICATIONS);
    }
}
