import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { InvolvedPartiesCriteria } from '../../models/involved-parties-criteria.model';
import { InvolvedPartiesCriteriaService } from '../../services/involved-parties-criteria.service';

@Component({
    selector: 'app-involved-parties-criteria-list',
    templateUrl: './involved-parties-criteria-list.component.html',
    standalone: false,
})
export class InvolvedPartiesCriteriaListComponent extends BaseListComponent<InvolvedPartiesCriteria> {
    showDialog: boolean = false;
    selectedCriteriaId: number | null = null;

    constructor(private criteriaService: InvolvedPartiesCriteriaService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'children', title: 'involvedPartiesCriteria.childCriteria' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<InvolvedPartiesCriteria>>
    > {
        return this.criteriaService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedCriteriaId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedCriteriaId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeCriteria(id: number, criteriaName: string) {
        this.confirmDelete(criteriaName, () => {
            this.criteriaService.deleteById(id).subscribe({
                next: () => {
                    this.showSuccessMessage(
                        this.translate('validationMessages.involvedPartiesCriteriaDeletedSuccess'),
                    );
                    this.loadData();
                },
                error: () => {
                    this.showErrorMessage(
                        this.translate('validationMessages.involvedPartiesCriteriaErrorDelete'),
                    );
                },
            });
        });
    }
}
