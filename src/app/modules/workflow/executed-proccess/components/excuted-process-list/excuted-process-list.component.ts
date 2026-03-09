import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { ProcessService } from '../../services/process.service';
import { ExcutedProcessModel } from '../../models/excuted-process';

@Component({
    selector: 'app-excuted-process-list',
    templateUrl: './excuted-process-list.component.html',
    standalone: false,
})
export class ExcutedProcessListComponent extends BaseListComponent<ExcutedProcessModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: ProcessService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'workFlow.name' },
            { field: 'descriptionAr', title: 'workFlow.nameWorkFlow' },
            { field: 'actions', title: 'workFlow.procedures', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<ExcutedProcessModel>>
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
