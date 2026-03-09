import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PROCCESS } from 'src/app/shared/consts/api.urls';
import { ExcutedProcessModel } from '../models/excuted-process';

@Injectable({
    providedIn: 'root',
})
export class ProcessService extends BaseService<ExcutedProcessModel> {
    constructor() {
        super(API_URL_PROCCESS);
    }
}
