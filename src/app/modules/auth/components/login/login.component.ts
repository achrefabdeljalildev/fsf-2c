import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    standalone: false,
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
        this.loginForm = this.fb.group({
            identityNumber: [
                '',
                Validators.compose([Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
            ],
            password: ['', Validators.compose([Validators.required])],
            rememberMe: [false],
        });
    }

    submit() {
        this.isLoading = true;
        this.hasError = false;

        if (this.loginForm.invalid) {
            this.isLoading = false;
            return;
        }

        const subscription = this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.isLoading = false;
                this.router.navigate(['/']);
            },
            error: (error: any) => {
                this.isLoading = false;
                this.hasError = true;
                this.showErrorMessage('auth.usernameOrEmailIsNotCorrect');
            },
        });

        this.subscriptions.add(subscription);
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
