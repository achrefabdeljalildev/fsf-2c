import { Injectable } from '@angular/core';
import { Organization } from '../models/organization.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { API_URL_ORGANIZATIONS } from 'src/app/shared/consts/api.urls';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService extends BaseService<Organization> {
    constructor() {
        super(API_URL_ORGANIZATIONS);
    }
}
