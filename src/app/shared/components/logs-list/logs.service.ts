import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditLog, AuditLogsResponse } from './audit-log.model';

@Injectable({
    providedIn: 'root',
})
export class LogsService {
    private baseUrl = '/GetAuditById';

    constructor(private http: HttpClient) {}

    /**
     * Get audit logs for a specific table
     * @param tableKey The primary key of the record
     * @param tableName The name of the table
     * @returns Observable with audit logs
     */
    getAuditLogs(tableKey: number, tableName: string): Observable<any> {
        const params = {
            TableKey: tableKey.toString(),
            TableName: tableName,
        };
        return this.http.get<any>(this.baseUrl, { params });
    }
}
