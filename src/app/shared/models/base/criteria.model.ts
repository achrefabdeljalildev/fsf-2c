export class FilterCriteriaModel {
    propertyName: string = '';
    values: string[] = [];
    type: string = 'Equals';
    operator: string = 'And';
}

export class SortModel {
    propertyName: string = '';
    direction: string = 'ASC';
}

export class CriteriaModel {
    pageNumber: number = 1;
    pageSize: number = 15;
    filters: FilterCriteriaModel[] = [];
    sorts: SortModel[] = [];
    searchTerm: string = '';
    totalCount?: number = 0;
}
