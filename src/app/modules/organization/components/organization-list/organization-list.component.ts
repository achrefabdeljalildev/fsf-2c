import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

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
            { field: 'nameAr', title: 'الاسم' },
            { field: 'actions', title: 'الاجراءات', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Organization>>> {
        return this.organizationService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
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

    removeOrganization(id: number) {
        if (confirm('هل أنت متأكد من حذف هذه الجهة؟')) {
            this.organizationService.deleteById(id).subscribe(() => {
                this.showSuccessMessage('تم حذف الجهة بنجاح');
                this.loadData();
            });
        }
    }

    onRowClick(event: any) {
        // Handle row click event here
        console.log('Row clicked:', event);
    }
}
