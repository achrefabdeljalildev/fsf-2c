import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { GlobalSetting } from '../models/global-settings.model';

@Injectable({
    providedIn: 'root',
})
export class GlobalSettingsService extends BaseService<GlobalSetting> {
    constructor() {
        super('/GeneralSettings');
    }
}
