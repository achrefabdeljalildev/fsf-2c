import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { RoleModel } from '../../models/role.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-roles-dialog',
    templateUrl: './user-roles-dialog.component.html',
    standalone: false,
})
export class UserRolesDialogComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() userId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<string[]>();

    allRoles: RoleModel[] = [];
    availableRoles: RoleModel[] = [];
    selectedRoles: RoleModel[] = [];
    isSaving: boolean = false;

    constructor(private userService: UserService) {
        super();
    }

    ngOnInit(): void {
        // this.loadRoles();
    }

    ngOnChanges(): void {
        if (this.visible && this.userId) {
            this.loadUserRoles();
        }
    }

    loadRoles(): void {
        this.userService.getAllRoles().subscribe((roles) => {
            this.allRoles = roles;
            this.updateRoleLists();
        });
    }

    loadUserRoles(): void {
        if (!this.userId) {
            this.selectedRoles = [];
            this.updateRoleLists();
            return;
        }

        this.userService.getUserRoles(this.userId).subscribe((response) => {
            const roles = response.data.roles || [];
            this.allRoles = roles;
            this.selectedRoles = roles.filter((role) => role.hasRole);
            this.updateRoleLists();
        });
    }

    updateRoleLists(): void {
        const selectedIds = new Set(this.selectedRoles.map((role) => role.id));
        this.availableRoles = this.allRoles
            .filter((role) => !selectedIds.has(role.id))
            .map((role) => ({ ...role, hasRole: false }));
    }

    addRole(role: RoleModel): void {
        if (!this.selectedRoles.some((r) => r.id === role.id)) {
            this.selectedRoles = [...this.selectedRoles, { ...role, hasRole: true }];
            this.updateRoleLists();
        }
    }

    removeRole(roleId: number): void {
        this.selectedRoles = this.selectedRoles.filter((role) => role.id !== roleId);
        this.updateRoleLists();
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
    }

    saveRoles(): void {
        if (!this.userId) {
            this.onSave.emit(this.selectedRoles.map((role) => role.name));
            this.closeDialog();
            return;
        }

        this.isSaving = true;
        const roleNames = this.selectedRoles.map((role) => role.name);

        this.userService.updateUserRoles(this.userId, roleNames).subscribe({
            next: () => {
                this.showSuccessMessage(
                    this.translate('validationMessages.userRolesUpdatedSuccess'),
                );

                this.closeDialog();
            },
            error: () => {
                this.isSaving = false;
            },
            complete: () => {
                this.isSaving = false;
            },
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
