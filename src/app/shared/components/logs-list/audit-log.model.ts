export interface AuditLog {
    id: number;
    tableName: string;
    tableKey: number;
    action: 'Insert' | 'Update' | 'Delete';
    userName: string;
    userEmail: string;
    timestamp: string;
    changes?: Record<string, any>;
    description?: string;
}

export interface AuditLogsResponse {
    items: AuditLog[];
    totalCount?: number;
}
