import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_EXECUTED_PROCCESS } from 'src/app/shared/consts/api.urls';
import { ExcutedProcess } from '../models/excuted-process';

@Injectable({
    providedIn: 'root',
})
export class ExcutedProcessService extends BaseService<ExcutedProcess> {
    constructor() {
        super(API_URL_EXECUTED_PROCCESS);
    }
}
