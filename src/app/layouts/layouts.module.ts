import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { AppLayout } from './app-layout/app-layout';
import { AuthLayout } from './auth-layout/auth-layout';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './sidebar/sidebar';

@NgModule({
    declarations: [AppLayout, AuthLayout, HeaderComponent, SidebarComponent],
    imports: [
        CommonModule,
        RouterModule,
        TranslateModule,
        ButtonModule,
        TreeModule,
    ],
})
export class AppLayoutsModule {}
