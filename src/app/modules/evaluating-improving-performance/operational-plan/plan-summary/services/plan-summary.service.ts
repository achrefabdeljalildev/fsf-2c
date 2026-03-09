import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PLAN_SUMMARY } from 'src/app/shared/consts/api.urls';
import { planSummaryModel } from '../models/plan-summary.model';

@Injectable({
    providedIn: 'root',
})
export class planSummaryService extends BaseService<planSummaryModel> {
    constructor() {
        super(API_URL_PLAN_SUMMARY);
    }
}
