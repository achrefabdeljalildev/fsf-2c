import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_CLASSIFICATION_OF_RISK_TYPE } from 'src/app/shared/consts/api.urls';
import { classificationOfRisktype } from '../models/classification-of-risk-type';

@Injectable({
    providedIn: 'root',
})
export class ClassificationOfRiskTypeService extends BaseService<classificationOfRisktype> {
    constructor() {
        super(API_URL_CLASSIFICATION_OF_RISK_TYPE);
    }
}
