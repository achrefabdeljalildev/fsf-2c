import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_INCIDENTS } from 'src/app/shared/consts/api.urls';
import { incidentsModel } from '../models/incidents.model';
@Injectable({
    providedIn: 'root',
})
export class incidentsService extends BaseService<incidentsModel> {
    constructor() {
        super(API_URL_INCIDENTS);
    }
}
