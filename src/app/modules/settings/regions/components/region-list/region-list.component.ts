import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { Region } from '../../models/region.model';
import { RegionService } from '../../services/region.service';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    standalone: false,
})
export class RegionListComponent extends BaseListComponent<Region> {
    showDialog: boolean = false;
    selectedRegionId: number | null = null;

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

    removeRegion(id: number, regionName: string) {
        this.confirmDelete(regionName, () => {
            this.regionService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(this.translate('validationMessages.regionDeletedSuccess'));
                this.loadData();
            });
        });
    }
}
