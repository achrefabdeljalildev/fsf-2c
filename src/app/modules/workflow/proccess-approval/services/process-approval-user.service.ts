import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PROCCESS_APPROVAL_USER } from 'src/app/shared/consts/api.urls';
import { ExcutedProcessModel } from '../../executed-proccess/models/excuted-process';

@Injectable({
    providedIn: 'root',
})
export class ProcessApprovalUserService extends BaseService<ExcutedProcessModel> {
    constructor() {
        super(API_URL_PROCCESS_APPROVAL_USER);
    }
}
