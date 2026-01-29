import { Injectable } from '@angular/core';
import { API_URL_HYPOTHESES_INVOLVED_PARTIES_CRITERIAS } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import { InvolvedPartiesCriteria } from '../models/involved-parties-criteria.model';

@Injectable({
    providedIn: 'root',
})
export class InvolvedPartiesCriteriaService extends BaseService<InvolvedPartiesCriteria> {
    constructor() {
        super(API_URL_HYPOTHESES_INVOLVED_PARTIES_CRITERIAS);
    }
}
