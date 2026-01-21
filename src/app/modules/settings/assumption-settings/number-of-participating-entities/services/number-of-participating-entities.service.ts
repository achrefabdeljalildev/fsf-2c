import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_NUMBER_OF_PARTICIPATING_ENTITIES } from 'src/app/shared/consts/api.urls';
import { NumberOfParticipatingEntities } from '../models/number-of-participating-entities';

@Injectable({
    providedIn: 'root',
})
export class NumberOfParticipatingEntitiesService extends BaseService<NumberOfParticipatingEntities> {
    constructor() {
        super(API_URL_NUMBER_OF_PARTICIPATING_ENTITIES);
    }
}
