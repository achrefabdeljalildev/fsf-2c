import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { LogsService } from './logs.service';
import { AuditLog } from './audit-log.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-logs-list',
    templateUrl: './logs-list.component.html',
    standalone: false,
})
export class LogsListComponent implements OnInit, OnDestroy {
    @Input() tableKey: number | null = null;
    @Input() tableName: string | null = null;

    logs: AuditLog[] = [];
    isLoading: boolean = false;
    errorMessage: string | null = null;
    private destroy$ = new Subject<void>();

    constructor(private logsService: LogsService) {}

    ngOnInit(): void {
        if (this.tableKey !== null && this.tableName) {
            this.loadLogs();
        }
    }

    loadLogs(): void {
        if (this.tableKey === null || !this.tableName) {
            this.errorMessage = 'TableKey and TableName are required';
            return;
        }

        this.isLoading = true;
        this.errorMessage = null;

        this.logsService
            .getAuditLogs(this.tableKey, this.tableName)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response: any) => {
                    this.logs = response.data || response || [];
                    this.isLoading = false;
                },
                error: (error: any) => {
                    console.error('Error loading logs:', error);
                    this.errorMessage = 'Failed to load audit logs';
                    this.isLoading = false;
                },
            });
    }

    /**
     * Get action icon based on action type
     */
    getActionIcon(action: string): string {
        switch (action?.toLowerCase()) {
            case 'insert':
                return 'pi-plus-circle';
            case 'update':
                return 'pi-pencil';
            case 'delete':
                return 'pi-trash';
            default:
                return 'pi-circle';
        }
    }

    /**
     * Get action color based on action type
     */
    getActionColor(action: string): string {
        switch (action?.toLowerCase()) {
            case 'insert':
                return 'green';
            case 'update':
                return 'blue';
            case 'delete':
                return 'red';
            default:
                return 'gray';
        }
    }

    /**
     * Get action label
     */
    getActionLabel(action: string): string {
        switch (action?.toLowerCase()) {
            case 'insert':
                return 'إضافة';
            case 'update':
                return 'تعديل';
            case 'delete':
                return 'حذف';
            default:
                return action;
        }
    }

    /**
     * Format timestamp
     */
    formatTimestamp(timestamp: string): string {
        try {
            return new Date(timestamp).toLocaleString('ar-EG');
        } catch {
            return timestamp;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
