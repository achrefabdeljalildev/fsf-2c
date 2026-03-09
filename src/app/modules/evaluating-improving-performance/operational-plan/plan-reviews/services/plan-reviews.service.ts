import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PLAN_REVIEWS } from 'src/app/shared/consts/api.urls';
import { planReviewsModel } from '../models/plan-reviews.model';
@Injectable({
    providedIn: 'root',
})
export class planReviewsService extends BaseService<planReviewsModel> {
    constructor() {
        super(API_URL_PLAN_REVIEWS);
    }
}
