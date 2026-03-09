import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { listOfSitesModel } from '../../models/list-of-sites.model';
import { listOfSitesService } from '../../services/list-of-sites.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-list-of-sites-list',
    templateUrl: './list-of-sites-list.component.html',
    standalone: false,
})
export class listOfSitesListComponent extends BaseListComponent<listOfSitesModel> {
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

    currentStep = 1;

    get startOffset(): string {
        return `calc(${100 / this.steps.length / 2}%)`;
    }

    get progressWidth(): number {
        return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
    }
    constructor(private service: listOfSitesService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'locationName', title: 'formLabels.codeIlocationName' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<listOfSitesModel>>> {
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
