import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_GENERAL_SETTINGS } from 'src/app/shared/consts/api.urls';
import { GeneralSettings } from '../models/general-settings.model';

@Injectable({
    providedIn: 'root',
})
export class GeneralSettingsService extends BaseService<GeneralSettings> {
    constructor() {
        super(API_URL_GENERAL_SETTINGS);
    }
}
