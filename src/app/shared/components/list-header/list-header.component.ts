import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
    @Input() showFilterButton: boolean = false;
    @Input() showMapsButton: boolean = false;
    @Input() pageSize: number = 10;
    @Input() pageNumber: number = 1;
    @Input() totalCount: number = 0;
    @Input() pagination: boolean = true;

    @Output() search = new EventEmitter<string>();
    @Output() pageChange = new EventEmitter<any>();
    @Output() addNewRecord = new EventEmitter<void>();
    @Output() clickMaps = new EventEmitter<void>();

    searchTerm: string = '';

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
}
