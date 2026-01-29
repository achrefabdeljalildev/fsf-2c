import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { API_URL_HYPOTHESIS_LOCATION_EVALUATIONS } from 'src/app/shared/consts/api.urls';
import { HypothesisLocationEvaluation } from '../models/hypothesis-location-evaluation.model';

@Injectable({
    providedIn: 'root',
})
export class HypothesisLocationEvaluationService extends BaseService<HypothesisLocationEvaluation> {
    constructor() {
        super(API_URL_HYPOTHESIS_LOCATION_EVALUATIONS);
    }
}
