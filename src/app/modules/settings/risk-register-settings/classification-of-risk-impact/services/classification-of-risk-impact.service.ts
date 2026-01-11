import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_CLASSIFICATION_OF_RISK_IMPACT } from 'src/app/shared/consts/api.urls';
import { ClassificationOfRiskImpact } from '../models/classification-of-risk-impact';

@Injectable({
    providedIn: 'root',
})
export class ClassificationOfRiskImpactService extends BaseService<ClassificationOfRiskImpact> {
    constructor() {
        super(API_URL_CLASSIFICATION_OF_RISK_IMPACT);
    }
}
