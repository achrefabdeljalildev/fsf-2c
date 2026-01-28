export interface ExcutedProcess {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    color: string;
    isOptinalApprove: true;
    processId: 0;
    userId: 0;
    isPrimary: true;
    processApprovalId: 0;
    entityType: string;
    entityId: 0;
    taskId: 0;
    reason: string;
    pageNumber: 0;
    pageSize: 0;
    filters: {
        propertyName: string;
        values: [string];
    };
}
