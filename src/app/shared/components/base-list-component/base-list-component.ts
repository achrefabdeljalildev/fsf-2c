import { Directive, OnDestroy, OnInit } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable, Subject, Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import {
    ApiResponseModel,
    PagedResponse,
} from 'src/app/shared/models/base/paged-response.model';

@Directive()
export abstract class BaseListComponent<T>
    extends BaseComponent
    implements OnInit, OnDestroy
{
    cols: colDef[] = [];
    rows: T[] = [];
    isLoading = false;
    paginationInfo: string = '';

    criteria: CriteriaModel = new CriteriaModel();
    protected subscription = new Subscription();

    protected abstract getColumns(): colDef[];
    protected abstract fetchPage(): Observable<
        ApiResponseModel<PagedResponse<T>>
    >;

    /** Hook: child components can react after data is loaded */
    protected afterLoad(_rows: T[]): void {}

    ngOnInit(): void {
        this.initializeCols();
        this.loadData();

        const langSub = this.translateService.onLangChange.subscribe(() => {
            this.initializeCols();
        });

        this.subscription.add(langSub);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    protected initializeCols(): void {
        this.cols = this.getColumns();
    }

    protected loadData(): void {
        this.isLoading = true;

        const sub = this.fetchPage().subscribe({
            next: (response) => {
                if (response && response.isSuccess) {
                    this.rows = response.data.items ?? [];
                    this.criteria.totalCount = response.meta.total;
                    this.afterLoad(this.rows);
                } else {
                    this.rows = [];
                    this.criteria.totalCount = 0;
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading list:', err);
                this.rows = [];
                this.criteria.totalCount = 0;
                this.showErrorMessage(
                    this.translate('common.errorLoadingData') ||
                        'Error loading data',
                );
                this.isLoading = false;
            },
            complete: () => {
                this.getRangeLabel();
            },
        });

        this.subscription.add(sub);
    }

    onPageChange(event: any): void {
        if (!event) return;
        this.criteria.pageNumber = event.first / event.rows + 1;
        this.criteria.pageSize = event.rows;
        this.loadData();
    }

    onFilterApplied(): void {
        this.criteria.pageNumber = 1;
        this.loadData();
    }

    onSearch(searchTerm: string): void {
        this.criteria.searchTerm = searchTerm;
        this.criteria.pageNumber = 1;
        this.loadData();
    }

    getRangeLabel() {
        const total = this.criteria.totalCount ?? 0;
        const pageSize = this.criteria.pageSize ?? 0;
        const pageNumber = this.criteria.pageNumber ?? 1;

        if (total === 0 || pageSize === 0) {
            this.paginationInfo = `عرض 0 من ${total}`;
            return;
        }

        const start = (pageNumber - 1) * pageSize + 1;
        const end = Math.min(start + pageSize - 1, total);

        this.paginationInfo = `عرض ${start} - ${end} من ${total}`;
    }
}
