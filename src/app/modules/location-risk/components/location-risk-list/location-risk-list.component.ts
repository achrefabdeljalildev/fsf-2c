import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
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
    constructor(private locationRiskService: LocationRiskService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'locationRisk.name' },
            { field: 'riskStatus.nameAr', title: 'locationRisk.riskStatus' },
            { field: 'location.code', title: 'formLabels.locationCode' },
            { field: 'location.nameAr', title: 'location.locationName' },
            { field: 'location.organization.nameAr', title: 'formLabels.affiliatedEntity' },
            { field: 'location.province.region.nameAr', title: 'formLabels.region' },
            { field: 'location.province.nameAr', title: 'formLabels.province' },
            { field: 'actions', title: 'common.actions', width: '100px' },
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
}
