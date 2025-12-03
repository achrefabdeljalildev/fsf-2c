import {Component} from "@angular/core";


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AppService} from '../../../../service/app.service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
})
export class VerificationComponent {
    isArabic: boolean = false;
    activationForm: FormGroup;
    store: any;

    constructor(
        private fb: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        private appSetting: AppService,
        public storeData: Store<any>,
    ) {
        const currentLang = this.translate.currentLang || 'en';
        this.isArabic = currentLang === 'ar';
        this.translate.setDefaultLang('en');
        // Create the FormGroup with a 'activationCode' control
        this.activationForm = this.fb.group({
            activationCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
        });
    }

    onSubmit() {
        if (this.activationForm.valid) {
            const code = this.activationForm.value.activationCode;
            this.router.navigate(['/']);
        } else {
            console.error('Form is invalid');
        }
    }

    toggleLanguage() {
        const newLang = this.isArabic ? 'en' : 'ar';
        this.translate.use(newLang);
        this.isArabic = newLang === 'ar';
        this.translate.use(newLang);
        this.appSetting.toggleLanguage(newLang);
        if (newLang === 'ar') {
            this.storeData.dispatch({type: 'toggleRTL', payload: 'rtl'});
            localStorage.setItem('i18n_locale', 'ar');
        } else {
            this.storeData.dispatch({type: 'toggleRTL', payload: 'ltr'});
            localStorage.setItem('i18n_locale', 'en');
        }
        window.location.reload();
    }
}
