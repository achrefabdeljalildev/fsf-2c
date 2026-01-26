import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    standalone: false,
})
export class UserListComponent extends BaseListComponent<UserModel> {
    showDialog: boolean = false;
    selectedUserId: number | null = null;
    showRolesDialog: boolean = false;
    selectedUserIdForRoles: number | null = null;

    constructor(private userService: UserService) {
        super();
    }

    protected override getColumns() {
        return [
            { field: 'identityNumber', title: 'users.identityNumber' },
            { field: 'fullName', title: 'users.fullName' },
            { field: 'jobName', title: 'users.jobName' },
            { field: 'rankName', title: 'users.rankName' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage() {
        return this.userService.getUserList(this.criteria);
    }

    openCreateDialog() {
        this.selectedUserId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedUserId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeUser(id: number) {
        this.confirmDelete('User', () => {
            this.userService.deleteFakeUser(id);
            this.showSuccessMessage(this.translate('validationMessages.userDeletedSuccess'));
            this.loadData();
        });
    }

    openRoleDialog(userId: number) {
        this.selectedUserIdForRoles = userId;
        this.showRolesDialog = true;
    }

    onRolesSave(roles: string[]) {
        this.showSuccessMessage(this.translate('validationMessages.userUpdatedSuccess'));
        this.loadData();
    }
}
