import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_APPROVALS_CENTER } from 'src/app/shared/consts/api.urls';
import { approvalsCenterModel } from '../models/approvals-center.model';

@Injectable({
    providedIn: 'root',
})
export class approvalsCenterService extends BaseService<approvalsCenterModel> {
    constructor() {
        super(API_URL_APPROVALS_CENTER);
    }
}
