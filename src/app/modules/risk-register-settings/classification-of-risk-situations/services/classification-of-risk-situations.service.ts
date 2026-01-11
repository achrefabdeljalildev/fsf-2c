import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_CLASSIFICATION_OF_RISK_SITUATION } from 'src/app/shared/consts/api.urls';
import { classificationOfRisksituations } from '../models/classification-of-risk-situations';

@Injectable({
    providedIn: 'root',
})
export class ClassificationOfRiskSituationsService extends BaseService<classificationOfRisksituations> {
    constructor() {
        super(API_URL_CLASSIFICATION_OF_RISK_SITUATION);
    }
}
