import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { LocationModel } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    standalone: false,
})
export class LocationListComponent extends BaseListComponent<LocationModel> {
    showMapsView: boolean = false;

    constructor(private locationService: LocationService) {
        super();
    }

    get searchTerm(): string {
        return this.criteria.searchTerm;
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'code', title: 'formLabels.locationCode' },
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'provinceNameAr', title: 'formLabels.province' },
            { field: 'organizationNameAr', title: 'formLabels.affiliatedEntity' },
            {
                field: 'siteReceiptDate',
                title: 'formLabels.receiptDate',
                cellRenderer: (d: LocationModel) =>
                    new Date(d.siteReceiptDate).toLocaleDateString('fr-EG'),
            },
            { field: 'actions', title: 'common.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<LocationModel>>> {
        return this.locationService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
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
}
