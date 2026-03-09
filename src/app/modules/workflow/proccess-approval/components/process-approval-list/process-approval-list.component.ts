import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { ProcessApprovalModel } from '../../models/process-approval';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { ProcessApprovalService } from '../../services/process-approval.service';

@Component({
    selector: 'app-process-approval-list',
    templateUrl: './process-approval-list.component.html',
    standalone: false,
})
export class ProcessApprovalListComponent extends BaseListComponent<ProcessApprovalModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: ProcessApprovalService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'workFlow.name' },
            { field: 'processNameAr', title: 'workFlow.processName' },
            { field: 'isOptinalApprover', title: 'workFlow.isApprover' },
            { field: 'actions', title: 'workFlow.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<ProcessApprovalModel>>
    > {
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
    removeFieldSurvey(id: number) {
        if (confirm('هل أنت متأكد من حذف هذا المسح؟')) {
            this.service.deleteById(id).subscribe(() => {
                this.showSuccessMessage('تم حذف المسح بنجاح');
                this.loadData();
            });
        }
    }
    onDialogSave() {
        this.showDialog = false;
        this.selectedItemId = null;
        this.loadData();
    }
}
