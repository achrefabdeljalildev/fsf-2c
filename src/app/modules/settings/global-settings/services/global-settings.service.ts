import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { GlobalSetting } from '../models/global-settings.model';
import { API_URL_GENERAL_SETTINGS } from '@shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class GlobalSettingsService extends BaseService<GlobalSetting> {
    constructor() {
        super(API_URL_GENERAL_SETTINGS);
    }
}
