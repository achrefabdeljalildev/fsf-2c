import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../service/app.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    hasError: boolean = false;
    messageError: string = '';
    returnUrl: string = '';
    isLoading: boolean = false;

    isArabic: boolean = false;
    loginForm!: FormGroup;
    showPassword: boolean = false;
    constructor(
        private translate: TranslateService,
        private router: Router,
        private fb: FormBuilder,
        private appSetting: AppService,
        public storeData: Store<any>,
    ) {
        const currentLang = this.translate.currentLang || 'en';
        this.isArabic = currentLang === 'ar';
    }

    ngOnInit(): void {
        this.initForm();
    }

    toggleLanguage() {
        const newLang = this.isArabic ? 'en' : 'ar';
        this.translate.use(newLang);
        this.isArabic = newLang === 'ar';
        this.translate.use(newLang);
        this.appSetting.toggleLanguage(newLang);
        if (newLang === 'ar') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
            localStorage.setItem('i18n_locale', 'ar');
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
            localStorage.setItem('i18n_locale', 'en');
        }
        window.location.reload();
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }
        this.router.navigate(['/auth/verification']);
    }

    submit() {
        this.isLoading = true;
        this.hasError = false;
    }

    private handleError(status?: string) {
        this.hasError = true;
        this.messageError = status === '502' ? 'serverError.serverUnavailable' : 'serverError.unknownError';
    }

    get username() {
        return this.loginForm.get('username');
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    get f() {
        return this.loginForm.controls;
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])],
        });
    }
}
