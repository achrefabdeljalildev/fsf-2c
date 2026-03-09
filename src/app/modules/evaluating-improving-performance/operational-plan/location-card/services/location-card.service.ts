import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_LOCATION_CARD } from 'src/app/shared/consts/api.urls';
import { locationCardModel } from '../models/location-card.model';
@Injectable({
    providedIn: 'root',
})
export class locationCardService extends BaseService<locationCardModel> {
    constructor() {
        super(API_URL_LOCATION_CARD);
    }
}
