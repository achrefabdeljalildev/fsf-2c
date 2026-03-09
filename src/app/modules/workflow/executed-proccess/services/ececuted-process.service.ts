import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_EXECUTED_PROCCESS } from 'src/app/shared/consts/api.urls';
import { ExcutedProcessModel } from '../../executed-proccess/models/excuted-process';

@Injectable({
    providedIn: 'root',
})
export class ExcutedProcessService extends BaseService<ExcutedProcessModel> {
    constructor() {
        super(API_URL_EXECUTED_PROCCESS);
    }
}
