# 📄 BaseListComponent Documentation

`BaseListComponent<T>` is an abstract Angular base class for building list/grid pages.
It extends your existing [`BaseComponent`](./base-component.md) and adds **pagination, filtering, translation, export, and reusable lifecycle hooks**.

---

## ✨ Features

-   ✅ Common state for **search, filters, pager, rows, columns, loading**
-   ✅ `onChangePager`, `onFilterApplied`, and `handleExport` out of the box
-   ✅ Automatically updates column titles on language change
-   ✅ Strongly typed with generics (`BaseListComponent<BankModel>`)
-   ✅ Hook methods you can override:

    -   `getColumns()` → define translated table columns
    -   `fetchPage(criteria)` → call your service to fetch data
    -   `onRowClick(row)` → handle row click navigation
    -   `afterLoad(rows)` → run logic after data loads
    -   `transformFilters(filters)` → customize applied filters

---

## 📦 Base Class Code

```ts
@Directive()
export abstract class BaseListComponent<T> extends BaseComponent implements OnInit, OnDestroy {
    search = '';
    filterConfig: any = {};
    cols: colDef[] = [];
    rows: T[] = [];
    totalCount = 0;
    pager: Pager = new Pager();
    isLoading = false;

    criteria: CriteriaModel = new CriteriaModel();
    private subscription = new Subscription();

    // Abstract methods
    protected abstract getColumns(): colDef[];
    protected abstract fetchPage(criteria: CriteriaModel): Observable<PagedResponse<T>>;

    // Hooks
    protected onRowClick(_row: T): void {}
    protected afterLoad(_rows: T[]): void {}
    protected transformFilters(filters: FilterCriteriaModel[]): FilterCriteriaModel[] {
        return filters;
    }
}
```

---

## 🛠️ How to Extend

### 1. Create a List Component

```ts
@Component({
    selector: 'app-banks-list',
    templateUrl: 'bank-list.html',
    animations: [toggleAnimation],
})
export class BanksListComponent extends BaseListComponent<BankModel> {
    constructor(private bankService: BankService) {
        super();
    }

    protected getColumns(): colDef[] {
        return [
            { field: 'name', title: this.translate('bankForm.name') },
            { field: 'identifierCode', title: this.translate('bankForm.identifierCode') },
        ];
    }

    protected fetchPage(criteria: CriteriaModel): Observable<PagedResponse<BankModel>> {
        return this.bankService.getAllBanksWithPagination(criteria);
    }

    protected override onRowClick(row: BankModel): void {
        this.router.navigate(['/general-settings/banking-settings/banks-form/edit', row.id]);
    }
}
```

---

### 2. Use in HTML Template

```html
<app-header-panel
    link="/general-settings/banking-settings/banks-form/new"
    [items]="rows"
    [search]="search"
    [pager]="pager"
    [filterConfig]="filterConfig"
    (searchChanged)="search = $event"
    (applyFilter)="onFilterApplied($event)"
    (changePager)="onChangePager($event)"
    (action)="handleExport($event)"
>
</app-header-panel>

<ng-datatable
    [pageSize]="pager.pageSize"
    [rows]="rows"
    [columns]="cols"
    [search]="search"
    (rowClick)="handleRowClick($event)"
>
</ng-datatable>
```

---

## 🔄 Filter Transformation

Sometimes your filters need to be rewritten before sending to the backend (e.g. date ranges, UI-only fields).
Override `transformFilters`:

```ts
protected override transformFilters(filters: FilterCriteriaModel[]): FilterCriteriaModel[] {
  const out = [...filters];

  // Example: remove empty values
  return out.filter(f => f.value !== '' && f.value !== null && f.value !== undefined);
}
```

---

## 📊 Lifecycle Flow

1. **`ngOnInit()`**

    - Calls `initializeCols()` → builds translated column headers
    - Calls `loadData()` → fetches first page
    - Subscribes to language changes

2. **`loadData()`**

    - Calls your `fetchPage(criteria)`
    - Updates `rows`, `totalCount`, and `pager.totalPages`
    - Calls `afterLoad(rows)`

3. **`onChangePager(event)`**

    - Updates `criteria.page` / `criteria.size`
    - Calls `loadData()`

4. **`onFilterApplied(filters)`**

    - Passes filters through `transformFilters()`
    - Resets to first page
    - Calls `loadData()`

5. **`handleRowClick(row)`**

    - Delegates to `onRowClick(row)`

6. **`handleExport(action)`**

    - Uses `exportTable` from `BaseComponent`

---

## ✅ Benefits

-   Less boilerplate in every list component
-   Consistent UX for filtering/paging/export
-   Easy to extend with hooks
-   Centralized error handling and i18n

---

📌 **Tip:** Put `BaseListComponent` in a `@shared/components/base-list` folder and document it in your project’s wiki so new developers know to extend it.
