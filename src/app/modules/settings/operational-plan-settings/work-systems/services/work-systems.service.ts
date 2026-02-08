import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_WORK_SYSTEMS } from 'src/app/shared/consts/api.urls';
import { WorkSystemsModel } from '../models/work-systems.model';

@Injectable({
    providedIn: 'root',
})
export class WorkSystemsService extends BaseService<WorkSystemsModel> {
    constructor() {
        super(API_URL_WORK_SYSTEMS);
    }
}
