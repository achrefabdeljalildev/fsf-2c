import { Injectable } from '@angular/core';
import { Province } from '../models/province.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class ProvinceService extends BaseService<Province> {
    constructor() {
        super('/Provinces');
    }
}
