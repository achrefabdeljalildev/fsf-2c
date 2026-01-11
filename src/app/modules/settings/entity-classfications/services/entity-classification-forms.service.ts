import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { EntityClassificationFormModel } from '../models/entity-classification-form.model';
import { API_URL_ENTITY_CLASSIFICATION_FORMS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class EntityClassificationFormsService extends BaseService<EntityClassificationFormModel> {
    constructor() {
        super(API_URL_ENTITY_CLASSIFICATION_FORMS);
    }
}
