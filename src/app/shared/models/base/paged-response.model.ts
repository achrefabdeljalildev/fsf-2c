export interface PagedResponse<T> {
    isSuccess: boolean;
    statusCode: number;
    message: string;
    data: {
        items: T[];
    };
    meta: {
        total: number;
        page: number;
        size: number;
    };
    errors: any[];
    correlationId: string;
}
