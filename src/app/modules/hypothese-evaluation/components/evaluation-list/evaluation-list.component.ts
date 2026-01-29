import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { Hypothese } from 'src/app/modules/hypothese/models/hypothese.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { HypotheseService } from '../../../hypothese/services/hypothese.service';

@Component({
    selector: 'app-evaluation-list',
    templateUrl: './evaluation-list.component.html',
    standalone: false,
})
export class EvaluationListComponent extends BaseListComponent<Hypothese> {
    showLocationEvaluationDialog: boolean = false;
    showParticipatingEvaluationDialog: boolean = false;
    selectedHypotheseId: number | null = null;

    constructor(private hypotheseService: HypotheseService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            {
                field: 'hypotheseTitleName',
                title: 'formLabels.hypotheseTitle',
            },
            { field: 'locationCode', title: 'formLabels.locationCode' },
            { field: 'locationName', title: 'location.locationName' },
            { field: 'locationEvaluated', title: 'evaluation.evaluateLocation' },
            { field: 'involvedPartiesEvaluated', title: 'evaluation.participatingEvaluation' },
            { field: 'actions', title: 'dataTable.actions', width: '130px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Hypothese>>> {
        return this.hypotheseService.getPagedList(this.criteria);
    }

    openLocationEvaluation(hypotheseId: number): void {
        this.router.navigate(['/hypothese-evaluation/evaluate', hypotheseId]);
    }
}
