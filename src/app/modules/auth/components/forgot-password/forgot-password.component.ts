import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { saudiNationalIdNumberValidator } from 'src/app/modules/shared/validators/saudi-arabia-id.validator';
import { AppService } from 'src/app/service/app.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    standalone: false,
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm!: FormGroup;
    hasError = false;
    messageError = '';
    isLoading = false;
    isArabic = false;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private translateService: TranslateService,
        private translate: TranslateService,

        private appSetting: AppService,
        public storeData: Store<any>,
    ) {
        this.isArabic = this.translateService.currentLang === 'ar';
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.forgotPasswordForm = this.fb.group({
            nationalId: [
                '',
                [Validators.required, saudiNationalIdNumberValidator()],
            ],
        });
    }

    get f() {
        return this.forgotPasswordForm.controls;
    }

    get nationalId() {
        return this.forgotPasswordForm.get('nationalId');
    }

    submit(): void {}

    private handleLoginError(error: any): void {
        this.isLoading = false;
        this.hasError = true;
        this.messageError = 'auth.nafath.error.general';
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
}
