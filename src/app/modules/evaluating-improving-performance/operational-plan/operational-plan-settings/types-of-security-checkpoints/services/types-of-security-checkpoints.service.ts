import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_TYPE_OF_SECURITY_CHECKPOINTS } from 'src/app/shared/consts/api.urls';
import { TypesOfSecurityCheckpointsModel } from '../models/types-of-security-checkpoints.model';

@Injectable({
    providedIn: 'root',
})
export class TypesOfSecurityCheckpointsService extends BaseService<TypesOfSecurityCheckpointsModel> {
    constructor() {
        super(API_URL_TYPE_OF_SECURITY_CHECKPOINTS);
    }
}
