import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { Province } from '../../models/province.model';
import { ProvinceService } from '../../services/province.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-province-list',
    templateUrl: './province-list.component.html',
    standalone: false,
})
export class ProvinceListComponent extends BaseListComponent<Province> {
    showDialog: boolean = false;
    selectedProvinceId: number | null = null;

    constructor(private provinceService: ProvinceService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'regionName', title: 'formLabels.region' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Province>>> {
        return this.provinceService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedProvinceId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedProvinceId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeProvince(id: number, provinceName: string) {
        this.confirmDelete(provinceName, () => {
            this.provinceService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.provinceDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
