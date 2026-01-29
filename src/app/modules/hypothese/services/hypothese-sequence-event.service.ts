import { Injectable } from '@angular/core';
import { BaseService } from '@shared/services/base.service';
import { HypotheseSequenceEvent } from '../models/hypothese-sequence-event.model';

@Injectable({
    providedIn: 'root',
})
export class HypotheseSequenceEventService extends BaseService<HypotheseSequenceEvent> {
    constructor() {
        super('/HypotheseSequenceEvents');
    }
}
