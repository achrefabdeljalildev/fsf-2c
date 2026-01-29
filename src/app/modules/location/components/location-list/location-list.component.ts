import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { LocationModel } from '../../models/location.model';
import { LocationService } from '../../services/location.service';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    standalone: false,
})
export class LocationListComponent extends BaseListComponent<LocationModel> {
    showMapsView: boolean = false;
    isRiskLocationList: boolean = this.router.url.includes('risk-register');

    constructor(private locationService: LocationService) {
        super();

        this.isRiskLocationList = this.router.url.includes('risk-register');
    }

    get searchTerm(): string {
        return this.criteria.searchTerm;
    }

    get listTitle(): string {
        return this.isRiskLocationList
            ? this.translate('location.locationRegisterList')
            : this.translate('location.locationList');
    }

    protected override getColumns(): colDef[] {
        return [
            {
                field: 'code',
                title: 'formLabels.locationCode',
            },
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'regionNameAr', title: 'formLabels.region' },
            { field: 'provinceNameAr', title: 'formLabels.province' },
            { field: 'organizationNameAr', title: 'formLabels.affiliatedEntity' },
            {
                field: 'siteReceiptDate',
                title: 'formLabels.receiptDate',
                hide: this.isRiskLocationList,
                cellRenderer: (d: LocationModel) =>
                    new Date(d.siteReceiptDate).toLocaleDateString('fr-EG'),
            },
            {
                field: 'aaa',
                title: 'formLabels.lastRegisterDateUpdate',
                hide: !this.isRiskLocationList,
                cellRenderer: (d: LocationModel) => '22/02/2026',
            },
            {
                field: 'actions',
                title: 'common.actions',
                width: '100px',
                hide: this.isRiskLocationList,
            },
            {
                field: 'riskActions',
                title: 'common.actions',
                width: '100px',
                hide: !this.isRiskLocationList,
            },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<LocationModel>>> {
        return this.locationService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.router.navigate(['/location/create']);
    }

    openEditDialog(id: number) {
        this.router.navigate(['/location/edit', id]);
    }

    removeLocation(id: number, locationName: string) {
        this.confirmDelete(locationName, () => {
            this.locationService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.locationDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }

    createFieldSurvey(location: LocationModel) {
        this.router.navigate(['/field-survey/create'], {
            queryParams: { locationCode: location.code },
        });
    }

    maskLocationCode(code: string): string {
        if (!code || code.length <= 2) {
            return code;
        }
        const lastTwo = code.substring(code.length - 2);
        const masked = '*'.repeat(code.length - 2) + lastTwo;
        return masked;
    }
}
