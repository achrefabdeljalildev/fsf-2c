import { Injectable } from '@angular/core';
import { Country } from '../models/country.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class CountryService extends BaseService<Country> {
    constructor() {
        super('/Countries');
    }
}
