import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_LIST_OF_PLANS } from 'src/app/shared/consts/api.urls';
import { listOfPlansModel } from '../models/list-of-plans.model';

@Injectable({
    providedIn: 'root',
})
export class listOfPlansService extends BaseService<listOfPlansModel> {
    constructor() {
        super(API_URL_LIST_OF_PLANS);
    }
}
