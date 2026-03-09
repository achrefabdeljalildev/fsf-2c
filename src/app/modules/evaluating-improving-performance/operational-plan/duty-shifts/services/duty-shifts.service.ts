import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_DUTY_SHIFTS } from 'src/app/shared/consts/api.urls';
import { dutyShiftsModel } from '../models/duty-shifts.model';

@Injectable({
    providedIn: 'root',
})
export class dutyShiftsService extends BaseService<dutyShiftsModel> {
    constructor() {
        super(API_URL_DUTY_SHIFTS);
    }
}
