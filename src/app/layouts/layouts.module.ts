import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TreeModule } from 'primeng/tree';
import { AppLayout } from './app-layout/app-layout';
import { AuthLayout } from './auth-layout/auth-layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';

@NgModule({
    declarations: [AppLayout, AuthLayout, HeaderComponent, SidebarComponent, DashboardComponent],
    imports: [CommonModule, RouterModule, TranslateModule, ButtonModule, TreeModule, ConfirmDialog],
})
export class AppLayoutsModule {}
