import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { planSummaryModel } from '../../models/plan-summary.model';
import { planSummaryService } from '../../services/plan-summary.service';

@Component({
    selector: 'app-plan-summary',
    templateUrl: './plan-summary.component.html',
    standalone: false,
})
export class planSummaryComponent extends BaseListComponent<planSummaryModel> {
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
    sections = {
        plan: true,
        patrols: true,
        distribution: true,
    };

    planItems = [
        { value: '10', title: 'شؤون العسكريين' },
        { value: '08', title: 'التموين' },
        { value: '08', title: 'العمليات' },
        { value: '16', title: 'الاتصالات الإدارية' },
    ];

    patrolItems = [
        { value: '08', title: 'الدوريات المتحركة' },
        { value: '08', title: 'الدوريات المتمركزة' },
        { value: '16', title: 'الدوريات الإستباقية' },
    ];

    toggleSection(section: keyof typeof this.sections) {
        this.sections[section] = !this.sections[section];
    }
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
            required: 3,
            status: 'success',
        },
        {
            name: 'اسم النقطة الأمنية',
            type: 'نوع النقطة الأمنية',
            location: 'مكان النقطة الأمنية',
            required: 4,
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

    currentStep = 5;

    get startOffset(): string {
        return `calc(${100 / this.steps.length / 2}%)`;
    }

    get progressWidth(): number {
        return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
    }
    constructor(private service: planSummaryService) {
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

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<planSummaryModel>>> {
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
