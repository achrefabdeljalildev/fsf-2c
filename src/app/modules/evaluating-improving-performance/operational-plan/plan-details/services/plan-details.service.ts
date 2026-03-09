import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PLAN_DETAILS } from 'src/app/shared/consts/api.urls';
import { planDetailsModel } from '../models/plan-details.model';
@Injectable({
    providedIn: 'root',
})
export class planDetailsService extends BaseService<planDetailsModel> {
    constructor() {
        super(API_URL_PLAN_DETAILS);
    }
}
