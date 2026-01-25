import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from '../../../../shared/components/base-list-component/base-list-component';
import {
    ApiResponseModel,
    PagedResponse,
} from '../../../../shared/models/base/paged-response.model';
import { Hypothese } from '../../models/hypothese.model';
import { HypotheseService } from '../../services/hypothese.service';

@Component({
    selector: 'app-hypothese-list',
    templateUrl: './hypothese-list.component.html',
    standalone: false,
})
export class HypotheseListComponent extends BaseListComponent<Hypothese> {
    constructor(private hypotheseService: HypotheseService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.name' },
            { field: 'hypotheseTitleName', title: 'formLabels.hypotheseTitle' },
            { field: 'locationCode', title: 'formLabels.locationCode' },
            { field: 'locationName', title: 'location.locationName' },
            { field: 'day', title: 'formLabels.day' },
            {
                field: 'date',
                title: 'formLabels.date',
                cellRenderer: (d: Hypothese) => new Date(d.date).toLocaleDateString('fr-EG'),
            },
            { field: 'actions', title: 'common.actions', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<Hypothese>>> {
        return this.hypotheseService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    removeHypothese(id: number) {
        if (confirm(this.translateService.instant('messages.confirmDeleteItem'))) {
            this.hypotheseService.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translateService.instant('messages.deletedSuccessfully'),
                );
                this.loadData();
            });
        }
    }
}
