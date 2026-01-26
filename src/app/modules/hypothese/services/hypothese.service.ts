import { Injectable } from '@angular/core';
import { API_URL_HYPOTHESES } from '@shared/consts/api.urls';
import { BaseService } from '../../../shared/services/base.service';
import { Hypothese } from '../models/hypothese.model';

export interface HypotheseInvolvedPayload {
    involvedParty: {
        hypotheseId: number;
        involvedParty: number[];
    };
}

@Injectable({
    providedIn: 'root',
})
export class HypotheseService extends BaseService<Hypothese> {
    constructor() {
        super(API_URL_HYPOTHESES);
    }

    createHypotheseInvolved(hypotheseId: number, involvedParty: number[]) {
        const payload: HypotheseInvolvedPayload = {
            involvedParty: {
                hypotheseId,
                involvedParty,
            },
        };

        return this.http.post<Hypothese>(`${this.baseUrl}/CreateHypotheseInvolved`, payload);
    }
}
