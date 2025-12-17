// base-datatable.component.ts
import {
    Component,
    Input,
    Output,
    EventEmitter,
    TemplateRef,
    Directive,
    ContentChildren,
    QueryList,
    AfterContentInit,
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'ng-template[baseDatatableColumn]',
    standalone: false,
})
export class BaseDatatableColumnDirective {
    @Input() baseDatatableColumn!: string;
    constructor(public template: TemplateRef<any>) {}
}

export interface DataTableColumn {
    field: string;
    label: string;
    width?: string;
    formatter?: (value: any, row?: any) => string;
}

export interface FilterEvent {
    pageSize?: number;
    pageNumber?: number;
    searchTerm?: string;
}

@Component({
    selector: 'base-datatable',
    templateUrl: './base-datatable.component.html',
    standalone: false,
})
export class BaseDatatableComponent<T> implements AfterContentInit {
    @Input() columns: DataTableColumn[] = [];
    @Input() value: T[] = [];
    @Input() totalRecords = 0;
    @Input() loading = false;
    @Input() paginator = true;
    @Input() lazy = false;
    @Input() selectionMode: 'single' | 'multiple' | null = null;
    @Input() paginatorPosition: string = 'top';
    @Input() globalFilterFields: string[] = [];
    @Input() showPaginator = true;
    @Input() first = 0;
    @Input() showCustomToolbar = true;
    @Input() showAddNewRecordButton = true;
    @Input() addNewRecordLabel: string = 'جديد';
    @Input() addNewRecordLink: string = '';

    @Output() lazyLoad = new EventEmitter<any>();
    @Output() rowSelect = new EventEmitter<T>();
    @Output() pageChange = new EventEmitter<any>();
    @Output() filterChange = new EventEmitter<FilterEvent>();
    @Output() addNewRecord = new EventEmitter<void>();

    @ContentChildren(BaseDatatableColumnDirective)
    columnTemplates!: QueryList<BaseDatatableColumnDirective>;
    templateMap = new Map<string, TemplateRef<any>>();

    filterEvent: FilterEvent = {
        pageSize: 10,
        pageNumber: 1,
        searchTerm: '',
    };

    constructor(private router: Router) {}

    ngAfterContentInit() {
        this.templateMap = new Map(
            this.columnTemplates.map((t) => [
                t.baseDatatableColumn,
                t.template,
            ]),
        );
    }

    onLazyLoad(event: any) {
        this.lazyLoad.emit(event);
    }

    onRowClick(event: any) {
        this.rowSelect.emit(event.data);
    }

    onPageChange(event: any) {
        this.filterEvent.pageNumber = event.first / event.rows + 1;
        this.filterEvent.pageSize = event.rows;
        this.filterChange.emit(this.filterEvent);
    }

    clearSearch() {
        this.filterEvent.searchTerm = '';
        this.filterChange.emit(this.filterEvent);
    }

    emitSearch() {
        this.filterChange.emit(this.filterEvent);
    }

    emitAddNewRecord() {
        if (this.addNewRecordLink) {
            this.router.navigateByUrl(this.addNewRecordLink);
        } else {
            this.addNewRecord.emit();
        }
    }
}
