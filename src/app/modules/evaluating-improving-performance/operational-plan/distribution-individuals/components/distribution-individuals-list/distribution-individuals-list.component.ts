import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { distributionIndividualsModel } from '../../models/distribution-individuals.model';
import { distributionIndividualsService } from '../../services/distribution-individuals.service';

@Component({
    selector: 'app-distribution-individuals-list',
    templateUrl: './distribution-individuals-list.component.html',
    standalone: false,
})
export class distributionIndividualsListComponent extends BaseListComponent<distributionIndividualsModel> {
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
    currentStep = 4;
    patrols = [
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع الدورية',
            location: 'مكان النقطة الأمنية',
            required: 5,
            status: 'success', // success | error
        },
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع الدورية',
            location: 'مكان النقطة الأمنية',
            required: 3,
            status: 'success',
        },
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع الدورية',
            location: 'مكان النقطة الأمنية',
            required: 9,
            status: 'error',
        },
    ];

    securityPoints = [
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع النقطة الأمنية',
            location: 'مكان النقطة الأمنية',
            required: 2,
            status: 'success',
        },
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع النقطة الأمنية',
            location: 'مكان النقطة الأمنية',
            required: 1,
            status: 'error',
        },
    ];

    get startOffset(): string {
        return `calc(${100 / this.steps.length / 2}%)`;
    }

    get progressWidth(): number {
        return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
    }
    constructor(private service: distributionIndividualsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'formLabels.departments' },
            { field: 'number', title: 'formLabels.numberOfDutyOfficers' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<distributionIndividualsModel>>
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
