import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { BaseService } from 'src/app/shared/services/base.service';

export interface MenuFormDto {
    menuFormId: number;
    formName: string;
    formCode: string;
    url: string | null;
    sortOrder: number;
    isActive: boolean;
    isAllowed: boolean;
}

export interface MenuDto {
    menuId: number;
    menuName: string;
    url: string | null;
    menuIcon: string | null;
    sortOrder: number;
    isActive: boolean;
    isAllowed: boolean;
    forms: MenuFormDto[];
    children: MenuDto[];
}

@Injectable({ providedIn: 'root' })
export class MenuService extends BaseService<MenuDto> {
    constructor() {
        super('/Menus');
    }

    getMenusTree(): Observable<ApiResponseModel<PagedResponse<MenuDto>>> {
        return this.http.get<ApiResponseModel<PagedResponse<MenuDto>>>('/Menus/List');
    }

    getRoleAllowedMenus(roleId: number): Observable<ApiResponseModel<PagedResponse<MenuDto>>> {
        return this.http.get<ApiResponseModel<PagedResponse<MenuDto>>>(
            `/MenusAllowNotAllow/${roleId}`,
        );
    }

    createRolePermissions(payload: any): Observable<ApiResponseModel<any>> {
        return this.http.post<ApiResponseModel<any>>('/Menus/Create', payload);
    }
}
