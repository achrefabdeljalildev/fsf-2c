import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { GlobalSetting } from '../../models/global-settings.model';
import { GlobalSettingsService } from '../../services/global-settings.service';

@Component({
    selector: 'app-global-settings-list',
    templateUrl: './global-settings-list.component.html',
    standalone: false,
})
export class GlobalSettingsListComponent extends BaseListComponent<GlobalSetting> {
    showDialog: boolean = false;
    selectedSettingId: number | null = null;

    constructor(private globalSettingsService: GlobalSettingsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'key', title: 'formLabels.key' },
            { field: 'value', title: 'formLabels.value' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<GlobalSetting>>> {
        return this.globalSettingsService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedSettingId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedSettingId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeSetting(id: number, key: string) {
        this.confirmDelete(key, () => {
            this.globalSettingsService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.globalSettingDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
