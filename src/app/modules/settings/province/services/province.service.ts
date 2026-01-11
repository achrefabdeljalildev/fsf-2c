import { Injectable } from '@angular/core';
import { Province } from '../models/province.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PROVINCES } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class ProvinceService extends BaseService<Province> {
    constructor() {
        super(API_URL_PROVINCES);
    }
}
