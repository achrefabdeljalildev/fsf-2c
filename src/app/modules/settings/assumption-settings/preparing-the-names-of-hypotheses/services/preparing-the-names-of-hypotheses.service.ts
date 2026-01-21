import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_PREPARING_THE_NAMES_OF_HYPOTHESES } from 'src/app/shared/consts/api.urls';
import { preparingTheNamesOfHypotheses } from '../models/preparing-the-names-of-hypotheses.model';

@Injectable({
    providedIn: 'root',
})
export class preparingTheNamesOfHypothesesService extends BaseService<preparingTheNamesOfHypotheses> {
    constructor() {
        super(API_URL_PREPARING_THE_NAMES_OF_HYPOTHESES);
    }
}
