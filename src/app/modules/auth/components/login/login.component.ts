import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BaseComponent } from 'src/app/modules/shared/components/base-component/base-component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent extends BaseComponent implements OnInit {
    hasError: boolean = false;
    returnUrl: string = '';
    isLoading: boolean = false;

    loginForm!: FormGroup;
    showPassword: boolean = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
    ) {
        super();

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.initForm();
    }

    submit() {
        this.isLoading = true;
        this.hasError = false;

        if (this.loginForm.invalid) {
            this.isLoading = false;
            return;
        }

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.router.navigate(['/']);
            },
            error: (error: any) => {
                this.isLoading = false;
                this.hasError = true;
                this.showErrorMessage('invalid_login_credentials');
            },
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            emailOrPhone: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
            rememberMe: [false],
        });
    }
}
