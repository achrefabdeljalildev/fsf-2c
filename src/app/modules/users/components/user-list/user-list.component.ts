import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    standalone: false,
})
export class UserListComponent extends BaseListComponent<UserModel> {
    showDialog: boolean = false;
    selectedUserId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;
    showRolesDialog: boolean = false;
    selectedUserIdForRoles: number | null = null;

    constructor(private userService: UserService) {
        super();
    }

    protected override getColumns() {
        return [
            { field: 'fullName', title: 'users.fullName' },
            { field: 'identityNumber', title: 'users.identityNumber' },
            { field: 'jobName', title: 'users.jobName' },
            { field: 'rankName', title: 'users.rankName' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage() {
        return this.userService.getUserList(this.criteria);
    }

    filterChange(event: any) {
        this.criteria.pageSize = event.pageSize;
        this.criteria.pageNumber = event.pageNumber;
        this.loadData();
    }

    openCreateDialog() {
        this.selectedUserId = null;
        this.showDialog = true;
    }

    openDetailsDialog(id: number) {
        this.selectedUserId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }

    removeUser(id: number) {
        this.itemToDelete = id;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.itemToDelete) {
            this.userService.deleteFakeUser(this.itemToDelete);
            this.showSuccessMessage(this.translate('validationMessages.userDeletedSuccess'));
            this.showDeleteDialog = false;
            this.itemToDelete = null;
            this.loadData();
        }
    }

    openRoleDialog(userId: number) {
        this.selectedUserIdForRoles = userId;
        this.showRolesDialog = true;
    }

    onRolesSave(roles: string[]) {
        console.log('User roles updated:', roles);
        this.showSuccessMessage(this.translate('validationMessages.userUpdatedSuccess'));
        this.loadData();
    }
}
