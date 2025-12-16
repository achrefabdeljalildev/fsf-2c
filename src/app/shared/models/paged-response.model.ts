export interface PagedResponse<T> {
  data: T[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}