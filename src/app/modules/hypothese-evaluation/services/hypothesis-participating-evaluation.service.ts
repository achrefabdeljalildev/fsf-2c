import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { API_URL_HYPOTHESIS_PARTICIPATING_EVALUATIONS } from 'src/app/shared/consts/api.urls';
import { HypothesisParticipatingEvaluation } from '../models/hypothesis-participating-evaluation.model';

@Injectable({
    providedIn: 'root',
})
export class HypothesisParticipatingEvaluationService extends BaseService<HypothesisParticipatingEvaluation> {
    constructor() {
        super(API_URL_HYPOTHESIS_PARTICIPATING_EVALUATIONS);
    }
}
