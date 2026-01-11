import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserRolesDialogComponent } from './components/user-roles-dialog/user-roles-dialog.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleViewComponent } from './components/role-view/role-view.component';
import { Tree } from 'primeng/tree';
import { Skeleton } from 'primeng/skeleton';

const routes: Routes = [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserViewComponent },
    { path: 'edit/:id', component: UserViewComponent },
    { path: 'roles', component: RoleListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule, Tree, Skeleton],
    declarations: [
        UserListComponent,
        UserViewComponent,
        RoleListComponent,
        UserRolesDialogComponent,
        RoleViewComponent,
    ],
})
export class UsersModule {}
