import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_DISTRIBUTION_INDIVIDUALS } from 'src/app/shared/consts/api.urls';
import { distributionIndividualsModel } from '../models/distribution-individuals.model';
@Injectable({
    providedIn: 'root',
})
export class distributionIndividualsService extends BaseService<distributionIndividualsModel> {
    constructor() {
        super(API_URL_DISTRIBUTION_INDIVIDUALS);
    }
}
