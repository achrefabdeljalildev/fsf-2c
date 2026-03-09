import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_DUTY_OFFICERS } from 'src/app/shared/consts/api.urls';
import { dutyOfficersModel } from '../models/duty-officers.model';

@Injectable({
    providedIn: 'root',
})
export class dutyOfficersService extends BaseService<dutyOfficersModel> {
    constructor() {
        super(API_URL_DUTY_OFFICERS);
    }
}
