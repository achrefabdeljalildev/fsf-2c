import { Injectable } from '@angular/core';
import { API_URL_HYPOTHESE_TYPES } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import { HypotheseType } from '../models/hypothese-type.model';

@Injectable({
    providedIn: 'root',
})
export class HypotheseTypeService extends BaseService<HypotheseType> {
    constructor() {
        super(API_URL_HYPOTHESE_TYPES);
    }
}
