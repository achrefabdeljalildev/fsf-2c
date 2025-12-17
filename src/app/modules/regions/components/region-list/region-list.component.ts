import { Component } from '@angular/core';
import { RegionService } from 'src/app/modules/regions/services/region.service';
import { DataTableColumn } from 'src/app/shared/components/base-datatable/base-datatable.component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Component({
    selector: 'app-region-list',
    templateUrl: './region-list.component.html',
    standalone: false,
})
export class RegionListComponent {
    regionsList: any[] = [];
    loading: boolean = false;
    totalRecords: number = 0;
    criteria: CriteriaModel = new CriteriaModel();
    columns: DataTableColumn[] = [
        { field: 'nameAr', label: 'الاسم' },
        { field: 'descriptionAr', label: 'الوصف' },
    ];

    constructor(private regionService: RegionService) {
        this.loadRegions();
    }

    loadRegions() {
        this.loading = true;
        this.regionService.getPagedList(this.criteria).subscribe((response) => {
            this.regionsList = response.data.items;
            this.totalRecords = response.meta.total;
            this.loading = false;
        });
    }

    filterChange(event: any) {
        console.log(event);

        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.criteria.searchTerm = event.searchTerm;
        this.loadRegions();
    }
}
