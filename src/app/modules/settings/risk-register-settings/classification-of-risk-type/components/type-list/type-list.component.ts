import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { classificationOfRisktype as ClassificationOfRiskType } from '../../models/classification-of-risk-type';
import { ClassificationOfRiskTypeService } from '../../services/classification-of-risk-type.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-type-list',
    templateUrl: './type-list.component.html',
    standalone: false,
})
export class ClassificationOfRiskTypeListComponent extends BaseListComponent<ClassificationOfRiskType> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: ClassificationOfRiskTypeService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<ClassificationOfRiskType>>
    > {
        return this.service.getPagedList(this.criteria);
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
