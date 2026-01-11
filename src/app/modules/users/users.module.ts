import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserRolesDialogComponent } from './components/user-roles-dialog/user-roles-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserViewComponent },
    { path: 'edit/:id', component: UserViewComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
    declarations: [
        UserListComponent,
        UserViewComponent,
        UserRolesDialogComponent,
        UserDetailsComponent,
    ],
})
export class UsersModule {}
