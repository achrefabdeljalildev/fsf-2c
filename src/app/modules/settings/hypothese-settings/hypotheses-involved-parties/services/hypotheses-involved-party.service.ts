import { Injectable } from '@angular/core';
import { API_URL_HYPOTHESES_INVOLVED_PARTIES } from 'src/app/shared/consts/api.urls';
import { BaseService } from 'src/app/shared/services/base.service';
import { HypothesesInvolvedParty } from '../models/hypotheses-involved-party.model';

@Injectable({
    providedIn: 'root',
})
export class HypothesesInvolvedPartyService extends BaseService<HypothesesInvolvedParty> {
    constructor() {
        super(API_URL_HYPOTHESES_INVOLVED_PARTIES);
    }
}
