import { Injectable } from '@angular/core';
import { FieldSurvey } from '../models/field-survey.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class FieldSurveyService extends BaseService<FieldSurvey> {
    constructor() {
        super('/FieldSurveys');
    }
}
