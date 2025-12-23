import { Injectable } from '@angular/core';
import { FieldSurvey } from '../models/field-survey.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_FIELD_SURVEYS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class FieldSurveyService extends BaseService<FieldSurvey> {
    constructor() {
        super(API_URL_FIELD_SURVEYS);
    }
}
