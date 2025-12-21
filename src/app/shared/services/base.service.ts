import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';

export class BaseService<T> {
    protected http = inject(HttpClient);

    constructor(protected baseUrl: string) {}

    getPagedList(criteria: CriteriaModel): Observable<ApiResponseModel<PagedResponse<T>>> {
        return this.http.post<ApiResponseModel<PagedResponse<T>>>(`${this.baseUrl}/List`, criteria);
    }

    getAll(criteria?: CriteriaModel): Observable<ApiResponseModel<PagedResponse<T>>> {
        return this.http.post<ApiResponseModel<PagedResponse<T>>>(this.baseUrl, criteria || {});
    }

    getById(id: number): Observable<ApiResponseModel<T>> {
        return this.http.get<ApiResponseModel<T>>(`${this.baseUrl}/${id}`);
    }

    create(item: T): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/Create`, item);
    }

    update(item: T): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/Edit`, item);
    }

    deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
