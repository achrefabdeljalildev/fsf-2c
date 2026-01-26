import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
    selector: 'app-organization-list',
    templateUrl: './organization-list.component.html',
    standalone: false,
})
export class OrganizationListComponent extends BaseListComponent<Organization> {
    showDialog: boolean = false;
    selectedOrganizationId: number | null = null;

    constructor(private organizationService: OrganizationService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Organization>>> {
        return this.organizationService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedOrganizationId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedOrganizationId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeOrganization(id: number, organizationName: string) {
        this.confirmDelete(organizationName, () => {
            this.organizationService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.organizationDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
