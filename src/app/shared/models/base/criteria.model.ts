export class FilterCriteriaModel {
    propertyName: string = '';
    values: string[] = [];
    type: string = 'Equals';
    operator: string = 'And';

    constructor(init?: Partial<FilterCriteriaModel>) {
        Object.assign(this, init);
    }
}

export class SortModel {
    propertyName: string = '';
    direction: string = 'ASC';
}

export class CriteriaModel {
    pageNumber: number = 1;
    pageSize: number = 10;
    filters: FilterCriteriaModel[] = [];
    sorts: SortModel[] = [];
    searchTerm: string = '';
    totalCount?: number = 0;

    // add constructor to initialize with default searchTerm
    constructor(init?: Partial<CriteriaModel>) {
        Object.assign(this, init);
    }
}
