import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { Region } from 'src/app/modules/regions/models/region.model';
import { RegionService } from 'src/app/modules/regions/services/region.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    standalone: false,
})
export class RegionListComponent extends BaseListComponent<Region> {
    showDialog: boolean = false;
    selectedRegionId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private regionService: RegionService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Region>>> {
        return this.regionService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedRegionId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedRegionId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeRegion(id: number) {
        this.itemToDelete = id;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.itemToDelete) {
            this.regionService.deleteById(this.itemToDelete).subscribe(() => {
                this.showSuccessMessage(this.translate('validationMessages.regionDeletedSuccess'));
                this.showDeleteDialog = false;
                this.itemToDelete = null;
                this.loadData();
            });
        }
    }

    onRowClick(event: any) {
        // Handle row click event here
        console.log('Row clicked:', event);
    }
}
