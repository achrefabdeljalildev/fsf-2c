import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import {
    ApiResponseModel,
    PagedResponse,
} from 'src/app/shared/models/base/paged-response.model';

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    standalone: false,
})
export class CountryListComponent extends BaseListComponent<Country> {
    showDialog: boolean = false;
    selectedCountryId: number | null = null;

    constructor(private countryService: CountryService) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'nameAr', title: 'الاسم' },
            { field: 'actions', title: 'الاجراءات', width: '150px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<Country>>
    > {
        return this.countryService.getPagedList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedCountryId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedCountryId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeCountry(id: number) {
        if (confirm('هل أنت متأكد من حذف هذه الدولة؟')) {
            this.countryService.deleteById(id).subscribe(() => {
                this.showSuccessMessage('تم حذف الدولة بنجاح');
                this.loadData();
            });
        }
    }

    onRowClick(event: any) {
        // Handle row click event here
        console.log('Row clicked:', event);
    }
}
