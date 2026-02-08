import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_TYPE_OF_PATROLS } from 'src/app/shared/consts/api.urls';
import { TypesOfPatrolsModel } from '../models/types-of-patrols.model';

@Injectable({
    providedIn: 'root',
})
export class TypesOfPatrolsService extends BaseService<TypesOfPatrolsModel> {
    constructor() {
        super(API_URL_TYPE_OF_PATROLS);
    }
}
