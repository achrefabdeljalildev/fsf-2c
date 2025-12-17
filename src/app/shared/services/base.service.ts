import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { PagedResponse } from 'src/app/shared/models/base/paged-response.model';

export class BaseService<T> {
    protected http = inject(HttpClient);

    constructor(protected baseUrl: string) {}

    getPagedList(criteria: CriteriaModel): Observable<PagedResponse<T>> {
        return this.http.post<PagedResponse<T>>(
            `${this.baseUrl}/List`,
            criteria,
        );
    }

    getAll(criteria?: CriteriaModel): Observable<T[]> {
        return this.http.post<T[]>(this.baseUrl, criteria || {});
    }

    create(item: T): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/Create`, item);
    }

    update(id: number, item: T): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${id}`, item);
    }

    deleteById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
