import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { dutyShiftsModel } from '../../models/duty-shifts.model';
import { dutyShiftsService } from '../../services/duty-shifts.service';

@Component({
    selector: 'app-duty-shifts-list',
    templateUrl: './duty-shifts-list.component.html',
    standalone: false,
})
export class dutyShiftsListComponent extends BaseListComponent<dutyShiftsModel> {
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
    shiftTypes = [
        { label: 'نظام 8 ساعات', value: 1 },
        { label: 'نظام 12 ساعة', value: 2 },
        { label: 'نظام مناوبات', value: 3 },
    ];

    currentStep = 3;

    get startOffset(): string {
        return `calc(${100 / this.steps.length / 2}%)`;
    }

    get progressWidth(): number {
        return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
    }
    constructor(private service: dutyShiftsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.shift' },
            { field: 'from', title: 'formLabels.from' },
            { field: 'to', title: 'formLabels.to' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<dutyShiftsModel>>> {
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
