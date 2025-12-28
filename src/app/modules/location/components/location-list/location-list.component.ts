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
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private locationService: LocationService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'code', title: 'رمز الموقع' },
            { field: 'nameAr', title: 'الاسم' },
            { field: 'provinceNameAr', title: 'المحافظة' },
            { field: 'organizationNameAr', title: 'الجهة التابعة لها' },
            {
                field: 'siteReceiptDate',
                title: 'تاريخ الاستلام',
                cellRenderer: (d: LocationModel) =>
                    new Date(d.siteReceiptDate).toLocaleDateString('fr-EG'),
            },
            { field: 'actions', title: 'الاجراءات', width: '150px' },
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

    removeLocation(id: number) {
        this.itemToDelete = id;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.itemToDelete) {
            this.locationService.deleteById(this.itemToDelete).subscribe(() => {
                this.showSuccessMessage('تم حذف الموقع بنجاح');
                this.showDeleteDialog = false;
                this.itemToDelete = null;
                this.loadData();
            });
        }
    }

    onRowClick(event: any) {
        console.log('Row clicked:', event);
    }
}
