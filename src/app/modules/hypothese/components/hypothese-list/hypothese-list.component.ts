import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from '../../../../shared/components/base-list-component/base-list-component';
import { CriteriaModel } from '../../../../shared/models/base/criteria.model';
import {
    ApiResponseModel,
    PagedResponse,
} from '../../../../shared/models/base/paged-response.model';
import { LocationService } from '../../../location/services/location.service';
import { HypotheseTitleService } from '../../../settings/hypothese-settings/hypothese-titles/services/hypothese-title.service';
import { HypotheseTypeService } from '../../../settings/hypothese-settings/hypothese-types/services/hypothese-type.service';
import { ProvinceService } from '../../../settings/province/services/province.service';
import { RegionService } from '../../../settings/regions/services/region.service';
import { Hypothese } from '../../models/hypothese.model';
import { HypotheseService } from '../../services/hypothese.service';

@Component({
    selector: 'app-hypothese-list',
    templateUrl: './hypothese-list.component.html',
    standalone: false,
})
export class HypotheseListComponent extends BaseListComponent<Hypothese> {
    hypotheseTypes: any[] = [];
    hypotheseTitles: any[] = [];
    regions: any[] = [];
    provinces: any[] = [];
    locations: any[] = [];

    constructor(
        private hypotheseService: HypotheseService,
        private hypotheseTypeService: HypotheseTypeService,
        private hypotheseTitleService: HypotheseTitleService,
        private locationService: LocationService,
        private provinceService: ProvinceService,
        private regionService: RegionService,
    ) {
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

    toggleFilters(show: boolean) {
        this.criteria.pageNumber = 1;

        if (show) {
            this.loadFiltersData();
        } else {
            this.criteria.filters = [];
            this.loadData();
        }
    }

    loadFiltersData() {
        const criteria = new CriteriaModel();
        criteria.pageSize = 1000;

        // Load Hypothesis Types
        this.hypotheseTypeService.getPagedList(criteria).subscribe((response: any) => {
            this.hypotheseTypes = response.data?.items ?? [];
            this.updateFilters();
        });

        // Load Hypothesis Titles
        this.hypotheseTitleService.getPagedList(criteria).subscribe((response: any) => {
            this.hypotheseTitles = response.data?.items ?? [];
            this.updateFilters();
        });

        // Load Regions
        this.regionService.getPagedList(criteria).subscribe((response: any) => {
            this.regions = response.data?.items ?? [];
            this.updateFilters();
        });

        // Load Provinces
        this.provinceService.getPagedList(criteria).subscribe((response: any) => {
            this.provinces = response.data?.items ?? [];
            this.updateFilters();
        });

        // Load Locations
        this.locationService.getPagedList(criteria).subscribe((response: any) => {
            this.locations = response.data?.items ?? [];
            this.updateFilters();
        });
    }

    private updateFilters() {
        this.filtersList = [
            {
                propertyName: 'hypothesisTypeId',
                filterType: 'select',
                isSingle: true,
                label: 'formLabels.hypotheseType',
                placeholder: 'formLabels.selectHypotheseType',
                optionLabel: 'nameAr',
                optionValue: 'id',
                options: this.hypotheseTypes,
            },
            {
                propertyName: 'hypotheseTitleId',
                filterType: 'select',
                isSingle: true,
                label: 'formLabels.hypotheseTitle',
                placeholder: 'formLabels.selectHypotheseTitle',
                optionLabel: 'nameAr',
                optionValue: 'id',
                options: this.hypotheseTitles,
            },
            {
                propertyName: 'regionId',
                filterType: 'select',
                isSingle: true,
                label: 'formLabels.region',
                placeholder: 'formLabels.selectRegion',
                optionLabel: 'nameAr',
                optionValue: 'id',
                options: this.regions,
            },
            {
                propertyName: 'provinceId',
                filterType: 'select',
                isSingle: true,
                label: 'formLabels.province',
                placeholder: 'formLabels.selectProvince',
                optionLabel: 'nameAr',
                optionValue: 'id',
                options: this.provinces,
            },
            {
                propertyName: 'locationId',
                filterType: 'select',
                isSingle: true,
                label: 'formLabels.location',
                placeholder: 'formLabels.selectLocation',
                optionLabel: 'nameAr',
                optionValue: 'id',
                options: this.locations,
            },
            {
                propertyName: 'date',
                filterType: 'date',
                isSingle: true,
                label: 'formLabels.date',
                placeholder: 'formLabels.selectDate',
            },
        ];
    }

    protected override afterLoad(_rows: Hypothese[]): void {
        this.updateFilters();
    }
}
