import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { FieldSurvey } from '../../models/field-survey.model';
import { FieldSurveyService } from '../../services/field-survey.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-field-survey-list',
    templateUrl: './field-survey-list.component.html',
    standalone: false,
})
export class FieldSurveyListComponent extends BaseListComponent<FieldSurvey> {
    constructor(private fieldSurveyService: FieldSurveyService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'fieldSurvey.surveyName' },
            { field: 'fieldSurveyLocation.nameAr', title: 'location.locationName' },
            { field: 'actions', title: 'الاجراءات', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<FieldSurvey>>> {
        return this.fieldSurveyService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    removeFieldSurvey(id: number) {
        if (confirm('هل أنت متأكد من حذف هذا المسح؟')) {
            this.fieldSurveyService.deleteById(id).subscribe(() => {
                this.showSuccessMessage('تم حذف المسح بنجاح');
                this.loadData();
            });
        }
    }

    onRowClick(event: any) {
        console.log('Row clicked:', event);
    }
}
