import { Injectable } from '@angular/core';
import { Organization } from '../models/organization.model';
import { BaseService } from 'src/app/shared/services/base.service';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService extends BaseService<Organization> {
    constructor() {
        super('/Organizations');
    }
}
