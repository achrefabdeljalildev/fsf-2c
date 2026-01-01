export interface ApiResponseModel<T> {
    isSuccess?: boolean;
    statusCode?: number;
    message?: string;
    data: T;
    meta: {
        total: number;
        page: number;
        size: number;
    };
    errors?: any[];
    correlationId?: string;
}

export interface PagedResponse<T> {
    items: T[];
}
