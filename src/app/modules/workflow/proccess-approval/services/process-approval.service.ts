import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PROCCESS_APPROVAL } from 'src/app/shared/consts/api.urls';
import { ExcutedProcess } from '../../executed-proccess/models/excuted-process';

@Injectable({
    providedIn: 'root',
})
export class ProcessApprovalService extends BaseService<ExcutedProcess> {
    constructor() {
        super(API_URL_PROCCESS_APPROVAL);
    }
}
