import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: { returnUrl: window.location.pathname },
            },
            {
                path: 'verification',
                component: VerificationComponent,
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent,
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        VerificationComponent,
        ForgotPasswordComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
    ],
})
export class AuthModule {}
