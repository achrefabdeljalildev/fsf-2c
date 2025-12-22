import { Injectable } from '@angular/core';
import { Location } from '../models/location.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class LocationService extends BaseService<Location> {
    constructor() {
        super('/Locations');
    }
}
