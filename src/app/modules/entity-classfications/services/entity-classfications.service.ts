import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { EntityClassificationModel } from '../models/entity-classification.model';
import { API_URL_ENTITY_CLASSIFICATIONS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class EntityClassficationsService extends BaseService<EntityClassificationModel> {
    constructor() {
        super(API_URL_ENTITY_CLASSIFICATIONS);
    }
}
