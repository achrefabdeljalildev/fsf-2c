import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { LocationHypothesisCriteria } from '../../models/location-hypothesis-criteria.model';
import { LocationHypothesisCriteriaService } from '../../services/location-hypothesis-criteria.service';

@Component({
    selector: 'app-location-hypothesis-criteria-list',
    templateUrl: './location-hypothesis-criteria-list.component.html',
    standalone: false,
})
export class LocationHypothesisCriteriaListComponent extends BaseListComponent<LocationHypothesisCriteria> {
    showDialog: boolean = false;
    selectedCriteriaId: number | null = null;

    constructor(private criteriaService: LocationHypothesisCriteriaService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'children', title: 'locationHypothesisCriteria.childCriteria' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<LocationHypothesisCriteria>>
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
                        this.translate(
                            'validationMessages.locationHypothesisCriteriaDeletedSuccess',
                        ),
                    );
                    this.loadData();
                },
                error: () => {
                    this.showErrorMessage(
                        this.translate('validationMessages.locationHypothesisCriteriaErrorDelete'),
                    );
                },
            });
        });
    }
}
