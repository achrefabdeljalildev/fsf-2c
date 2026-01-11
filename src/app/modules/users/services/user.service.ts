import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { UserModel } from '../models/user.model';
import { RoleModel } from '../models/role.model';
import { API_URL_USERS } from 'src/app/shared/consts/api.urls';
import { map, Observable, of } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService<UserModel> {
    constructor() {
        super(API_URL_USERS);
    }

    getUserList(
        criteria: CriteriaModel = new CriteriaModel(),
    ): Observable<ApiResponseModel<PagedResponse<UserModel>>> {
        const params = this.buildQueryParams(criteria);
        return this.http.get<ApiResponseModel<PagedResponse<UserModel>>>(
            '/AuthorizationRouting/Role/User-List',
            {
                params,
            },
        );
    }

    buildQueryParams(criteria: CriteriaModel = new CriteriaModel()): any {
        return { ...criteria, search: criteria.searchTerm ?? '' };
    }

    getFakeById(id: number): Observable<UserModel | undefined> {
        return of({} as UserModel);
    }

    deleteFakeUser(id: number): void {
        // Fake delete implementation
    }

    getRoles(
        criteria: CriteriaModel = new CriteriaModel(),
    ): Observable<ApiResponseModel<PagedResponse<RoleModel>>> {
        const params = this.buildQueryParams(criteria);
        return this.http.get<ApiResponseModel<PagedResponse<RoleModel>>>(
            '/AuthorizationRouting/Role/Role-List',
            {
                params,
            },
        );
    }

    getUserRoles(
        userId: number,
    ): Observable<ApiResponseModel<{ userId: number; roles: RoleModel[] }>> {
        return this.http.get<ApiResponseModel<{ userId: number; roles: RoleModel[] }>>(
            `/AuthorizationRouting/Role/ManageUserRoles/${userId}`,
        );
    }

    updateUserRoles(userId: number, roles: string[]): Observable<ApiResponseModel<void>> {
        return this.http.put<ApiResponseModel<void>>(
            '/AuthorizationRouting/Role/Update-User-Roles',
            {
                userId,
                roles,
            },
        );
    }

    createRole(roleName: string): Observable<ApiResponseModel<RoleModel>> {
        return this.http.post<ApiResponseModel<RoleModel>>('/AuthorizationRouting/Role/Create', {
            roleName,
        });
    }

    updateRole(id: number, roleName: string): Observable<ApiResponseModel<RoleModel>> {
        return this.http.put<ApiResponseModel<RoleModel>>('/AuthorizationRouting/Role/Edit', {
            roleId: id,
            roleName,
        });
    }

    getAllRoles(criteria: CriteriaModel = new CriteriaModel()): Observable<RoleModel[]> {
        return this.getRoles(criteria).pipe(map((response) => response.data.items));
    }
}
