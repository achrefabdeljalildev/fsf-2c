import { Injectable } from '@angular/core';
import { API_URL_HYPOTHESE_TITLES } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import { HypotheseTitle } from '../models/hypothese-title.model';

@Injectable({
    providedIn: 'root',
})
export class HypotheseTitleService extends BaseService<HypotheseTitle> {
    constructor() {
        super(API_URL_HYPOTHESE_TITLES);
    }
}
