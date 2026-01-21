import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_TYPE_OF_HYPOTHESES } from 'src/app/shared/consts/api.urls';
import { TypeOfHypotheses } from '../models/Types-of-hypotheses.model';

@Injectable({
    providedIn: 'root',
})
export class TypeOfHypothesesService extends BaseService<TypeOfHypotheses> {
    constructor() {
        super(API_URL_TYPE_OF_HYPOTHESES);
    }
}
