import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { dutyOfficersModel } from '../../models/duty-officers.model';
import { dutyOfficersService } from '../../services/duty-officers.service';

@Component({
    selector: 'app-duty-officers-list',
    templateUrl: './duty-officers-list.component.html',
    standalone: false,
})
export class dutyOfficersListComponent extends BaseListComponent<dutyOfficersModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;
    steps = [
        { id: 1, label: 'الهيكل التنظيمي' },
        { id: 2, label: 'الضباط المناوبين' },
        { id: 3, label: 'الوردّيات' },
        { id: 4, label: 'توزيع الأفراد' },
        { id: 5, label: 'ملخص الخطة' },
        { id: 6, label: 'إرسال' },
    ];
    guardOfficers = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
    ];

    currentStep = 2;

    get startOffset(): string {
        return `calc(${100 / this.steps.length / 2}%)`;
    }

    get progressWidth(): number {
        return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
    }
    constructor(private service: dutyOfficersService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.departments' },
            { field: 'number', title: 'formLabels.numberOfDutyOfficers' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<dutyOfficersModel>>> {
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
