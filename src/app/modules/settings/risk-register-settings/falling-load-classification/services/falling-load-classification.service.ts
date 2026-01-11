import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_FALLING_LOAD_CLASSIFICATION } from 'src/app/shared/consts/api.urls';
import { fallingLoadClassification } from '../models/falling-load-classification';

@Injectable({
    providedIn: 'root',
})
export class FallingLoadClassificationService extends BaseService<fallingLoadClassification> {
    constructor() {
        super(API_URL_FALLING_LOAD_CLASSIFICATION);
    }
}
