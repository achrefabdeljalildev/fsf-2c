import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ListFilterConfig } from '@shared/components/list-filter/list-filter.component';
import { CriteriaModel, FilterCriteriaModel } from '@shared/models/base/criteria.model';

@Component({
    selector: 'list-header',
    templateUrl: './list-header.component.html',
    standalone: false,
})
export class ListHeaderComponent {
    @Input() tableTitle: string = 'قائمة البيانات';
    @Input() showAddNewRecordButton: boolean = true;
    @Input() addNewRecordLabel: string = 'جديد';
    @Input() addNewRecordLink: string = '';
    @Input() paginationInfo: string = '';
    @Input() showMapsButton: boolean = false;
    @Input() pageSize: number = 10;
    @Input() pageNumber: number = 1;
    @Input() totalCount: number = 0;
    @Input() pagination: boolean = true;
    @Input() filtersList: ListFilterConfig[] = [];

    @Output() search = new EventEmitter<string>();
    @Output() pageChange = new EventEmitter<any>();
    @Output() addNewRecord = new EventEmitter<void>();
    @Output() clickMaps = new EventEmitter<void>();
    @Output() filterChange = new EventEmitter<CriteriaModel>();
    @Output() toggleFilters = new EventEmitter<boolean>();

    searchTerm: string = '';
    showFilters: boolean = false;

    constructor(private router: Router) {}

    onSearch(term: string) {
        this.search.emit(term);
    }

    onClickMaps() {
        this.clickMaps.emit();
    }

    onAddNewRecord() {
        if (this.addNewRecordLink) {
            this.router.navigateByUrl(this.addNewRecordLink);
            return;
        }
        this.addNewRecord.emit();
    }

    onPageChange(event: any) {
        if (!event) return;

        this.pageChange.emit(event);
    }

    filterChangeEvent(filters: FilterCriteriaModel[]) {
        this.filterChange.emit(
            new CriteriaModel({
                searchTerm: this.searchTerm,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize,
                filters: filters,
            }),
        );
    }

    toggleDisplayFilters() {
        this.showFilters = !this.showFilters;
        this.toggleFilters.emit(this.showFilters);
    }
}
