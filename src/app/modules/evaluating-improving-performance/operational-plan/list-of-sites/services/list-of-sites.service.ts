import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_HYPOTHETICAL_PLAN } from 'src/app/shared/consts/api.urls';
import { listOfSitesModel } from '../models/list-of-sites.model';

@Injectable({
    providedIn: 'root',
})
export class listOfSitesService extends BaseService<listOfSitesModel> {
    constructor() {
        super(API_URL_HYPOTHETICAL_PLAN);
    }
}
