import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { planDetailsModel } from '../models/plan-details.model';
import { planDetailsService } from '../services/plan-details.service';

@Component({
    selector: 'app-plan-details',
    templateUrl: './plan-details.component.html',
    standalone: false,
})
export class planDetailsComponent extends BaseListComponent<planDetailsModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    tabs: string[] = ['إسم المسار', 'إسم المسار', 'إسم المسار'];
    activeTab = 1;

    locationData = {
        title: 'بيانات الموقع',
        code: 'A-7654-09',
    };

    locationFields = [
        { label: 'المحافظة', value: 'المحافظة' },
        { label: 'تصنيف الموقع', value: 'الموقع' },
        { label: 'تصنيف الموقع', value: 'الموقع' },
        { label: 'الجهة التابعة لها', value: 'الجهة التابعة لها' },
        { label: 'المنطقة', value: 'المنطقة' },
        { label: 'المنطقة', value: 'المنطقة' },
    ];
    distributionCols = [
        { field: 'department', title: 'الإدارات' },
        { field: 'specialist', title: 'مختص تموين' },
        { field: 'supervisor', title: 'مشرف تموين' },
    ];

    securityDistributionRows = [
        { department: 'العمليات', specialist: 9, supervisor: 10 },
        { department: 'التموين', specialist: 4, supervisor: 10 },
        { department: 'شؤون العسكريين', specialist: 6, supervisor: 12 },
    ];

    patrolDistributionRows = [
        { department: 'العمليات', specialist: 9, supervisor: 10 },
        { department: 'التموين', specialist: 4, supervisor: 10 },
        { department: 'شؤون العسكريين', specialist: 6, supervisor: 12 },
    ];
    leadershipCols = [
        { field: 'unit', title: 'الوحدة' },
        { field: 'workRange', title: 'نطاق العمل' },
        { field: 'from', title: 'من' },
        { field: 'to', title: 'إلى' },
    ];

    leadershipRows = [
        {
            unit: 'الدوريات المتحركة',
            workRange: '5 مجموعات',
            from: 9,
            to: 10,
        },
        {
            unit: 'الدوريات الثابتة',
            workRange: '5 مجموعات',
            from: 9,
            to: 10,
        },
        {
            unit: 'الدوريات الراجلة',
            workRange: '5 مجموعات',
            from: 9,
            to: 10,
        },
    ];

    infoCards = [
        {
            title: 'معد الخطة',
            value: '12-09-2023',
            icon: 'pi-calendar',
        },
        {
            title: 'الأمن الصناعي',
            value: 'فهد محمد عبدالله',
            icon: 'pi-link',
        },
        {
            title: 'آخر تحديث للخطة',
            value: '12-09-2023',
            icon: 'pi-calendar',
        },
    ];

    constructor(private service: planDetailsService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'departments', title: 'formLabels.departments' },
            { field: 'supplySpecialist', title: 'formLabels.supplySpecialist' },
            { field: 'supplySupervisor', title: 'formLabels.supplySupervisor' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<planDetailsModel>>> {
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
