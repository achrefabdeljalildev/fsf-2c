import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { HypothesesInvolvedParty } from '../../models/hypotheses-involved-party.model';
import { HypothesesInvolvedPartyService } from '../../services/hypotheses-involved-party.service';

@Component({
    selector: 'app-hypotheses-involved-party-list',
    templateUrl: './hypotheses-involved-party-list.component.html',
    standalone: false,
})
export class HypothesesInvolvedPartyListComponent extends BaseListComponent<HypothesesInvolvedParty> {
    showDialog: boolean = false;
    selectedHypothesesInvolvedPartyId: number | null = null;

    constructor(private hypothesesInvolvedPartyService: HypothesesInvolvedPartyService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<HypothesesInvolvedParty>>
    > {
        return this.hypothesesInvolvedPartyService.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedHypothesesInvolvedPartyId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedHypothesesInvolvedPartyId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeHypothesesInvolvedParty(id: number, hypothesesInvolvedPartyName: string) {
        this.confirmDelete(hypothesesInvolvedPartyName, () => {
            this.hypothesesInvolvedPartyService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.hypothesesInvolvedPartyDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }
}
