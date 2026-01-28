import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { ClassificationOfRiskImpact } from 'src/app/modules/settings/risk-register-settings/classification-of-risk-impact/models/classification-of-risk-impact';
import { ClassificationOfRiskImpactService } from 'src/app/modules/settings/risk-register-settings/classification-of-risk-impact/services/classification-of-risk-impact.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-impact-list',
    templateUrl: './impact-list.component.html',
    standalone: false,
})
export class ClassificationOfRiskImpactListComponent extends BaseListComponent<ClassificationOfRiskImpact> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: ClassificationOfRiskImpactService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'color', title: 'common.color' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<ClassificationOfRiskImpact>>
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
