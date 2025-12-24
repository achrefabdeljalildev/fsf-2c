import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_LOCATIONS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
    constructor() {
        super(API_URL_LOCATIONS);
    }
}
