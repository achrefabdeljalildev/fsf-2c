import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { colDef } from '@bhplugin/ng-datatable';
import { FilterCriteriaModel } from '@shared/models/base/criteria.model';
import { Observable } from 'rxjs';
import { LocationModel } from 'src/app/modules/location/models/location.model';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { BaseListComponent } from '../../../../shared/components/base-list-component/base-list-component';
import {
    ApiResponseModel,
    PagedResponse,
} from '../../../../shared/models/base/paged-response.model';
import { LocationRisk } from '../../models/location-risk.model';
import { LocationRiskService } from '../../services/location-risk.service';

@Component({
    selector: 'app-location-risk-list',
    templateUrl: './location-risk-list.component.html',
    standalone: false,
})
export class LocationRiskListComponent extends BaseListComponent<LocationRisk> {
    locationId: string | null = this.route.snapshot.params['locationId'] || null;
    selectedLocation: LocationModel | null = null;
    locationForm!: FormGroup;

    constructor(
        private locationRiskService: LocationRiskService,
        private locationService: LocationService,
        private fb: FormBuilder,
    ) {
        super();

        this.locationId = this.route.snapshot.params['locationId'] || null;

        if (this.locationId) {
            this.criteria.filters = [
                ...this.criteria.filters,
                new FilterCriteriaModel({
                    propertyName: 'locationId',
                    values: [this.locationId],
                }),
            ];
        }
    }

    override ngOnInit(): void {
        super.ngOnInit();

        if (this.locationId) {
            this.locationService.getById(+this.locationId).subscribe((response) => {
                this.selectedLocation = response.data;

                this.locationForm = this.fb.group({
                    nameAr: [{ value: this.selectedLocation.nameAr, disabled: true }],
                    code: [{ value: this.selectedLocation.code, disabled: true }],
                    region: [{ value: this.selectedLocation.regionNameAr, disabled: true }],
                    province: [{ value: this.selectedLocation.provinceNameAr, disabled: true }],
                    organization: [
                        { value: this.selectedLocation.organizationNameAr, disabled: true },
                    ],
                });
            });
        }
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'locationRisk.name' },
            { field: 'descriptionAr', title: 'locationRisk.description' },
            { field: 'location.code', title: 'formLabels.locationCode', hide: !!this.locationId },
            { field: 'location.nameAr', title: 'location.locationName', hide: !!this.locationId },
            {
                field: 'location.province.region.nameAr',
                title: 'formLabels.region',
                hide: !!this.locationId,
            },
            { field: 'riskImpact', title: 'location.riskImpact' },
            { field: 'riskStatus.nameAr', title: 'locationRisk.potentialDanger' },
            { field: 'riskLikelihood', title: 'location.riskStatus' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<LocationRisk>>> {
        return this.locationRiskService.getPagedList(this.criteria);
    }

    removeLocationRisk(id: number) {
        if (confirm(this.translateService.instant('messages.confirmDeleteItem'))) {
            this.locationRiskService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translateService.instant('messages.deletedSuccessfully'),
                );
                this.loadData();
            });
        }
    }

    navigateToCreate() {
        if (this.locationId) {
            this.router.navigate(['/location-risk/create', this.locationId]);
        } else {
            this.router.navigate(['/location-risk/create']);
        }
    }

    navigateToEdit(id: number) {
        if (this.locationId) {
            this.router.navigate(['/location-risk/edit', id, this.locationId]);
        } else {
            this.router.navigate(['/location-risk/edit', id]);
        }
    }
}
