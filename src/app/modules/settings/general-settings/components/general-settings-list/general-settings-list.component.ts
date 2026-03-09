import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { GeneralSettings } from '../../models/general-settings.model';
import { GeneralSettingsService } from '../../services/general-settings.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-general-settings-list',
    templateUrl: './general-settings-list.component.html',
    standalone: false,
})
export class GeneralSettingsListComponent extends BaseListComponent<GeneralSettings> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: GeneralSettingsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'key', title: 'GeneralSettings.keys' },
            { field: 'value', title: 'GeneralSettings.value' },
            { field: 'actions', title: 'GeneralSettings.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<GeneralSettings>>> {
        return this.service.getPagedList(this.criteria);
    }

    override filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedItemId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedItemId = id;
        this.showDialog = true;
    }

    removeItem(id: number) {
        this.confirmDelete('Item', () => {
            this.service.deleteById(id).subscribe(
                () => {
                    this.loadData();
                },
                (error: any) => {
                    console.error('Error deleting item', error);
                },
            );
        });
    }

    onDialogSave() {
        this.showDialog = false;
        this.selectedItemId = null;
        this.loadData();
    }
}
