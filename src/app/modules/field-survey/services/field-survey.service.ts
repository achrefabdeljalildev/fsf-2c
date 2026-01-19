import { Injectable } from '@angular/core';
import { ApiResponseModel } from '@shared/models/base/paged-response.model';
import { Observable } from 'rxjs';
import { API_URL_FIELD_SURVEYS } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import {
    EntityClassificationModel,
    FieldSurvey,
    FieldSurveyClassificationForms,
} from '../models/field-survey.model';

@Injectable({
    providedIn: 'root',
})
export class FieldSurveyService extends BaseService<FieldSurvey> {
    constructor() {
        super(API_URL_FIELD_SURVEYS);
    }

    createClassificationsData(classificationModels: any[]): Observable<ApiResponseModel<any>> {
        const payload = { classificationModels };
        return this.http.post<ApiResponseModel<any>>(`/ClassficationForms/Create`, payload);
    }

    getClassificationsData(
        payload: Partial<FieldSurveyClassificationForms>,
    ): Observable<ApiResponseModel<EntityClassificationModel>> {
        return this.http.post<ApiResponseModel<EntityClassificationModel>>(
            `/ClassficationForms/GetById`,
            payload,
        );
    }
}
