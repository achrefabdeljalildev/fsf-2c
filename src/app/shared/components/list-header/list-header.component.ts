import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

    @Output() search = new EventEmitter<string>();
    @Output() addNewRecord = new EventEmitter<void>();

    searchTerm: string = '';

    constructor(private router: Router) {}

    onSearch(term: string) {
        this.search.emit(term);
    }

    onAddNewRecord() {
        if (this.addNewRecordLink) {
            this.router.navigateByUrl(this.addNewRecordLink);
            return;
        }
        this.addNewRecord.emit();
    }
}
