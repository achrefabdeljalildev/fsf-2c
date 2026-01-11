import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChildren,
    QueryList,
    ElementRef,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AppService } from '../../../../shared/services/app.service';
import { BaseStore } from 'src/app/store/base.store';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    standalone: false,
})
export class VerificationComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

    isArabic: boolean = false;
    activationForm: FormGroup;

    // OTP properties
    otpDigits: string[] = ['', '', '', ''];
    timer: number = 60;
    timerInterval: any;
    canResend: boolean = false;
    isLoading: boolean = false;
    identityNumber: string = '';

    constructor(
        private fb: FormBuilder,
        private translate: TranslateService,
        private router: Router,
        private appSetting: AppService,
        private ui: BaseStore,
        private authService: AuthService,
    ) {
        const currentLang = this.translate.currentLang || 'en';
        this.isArabic = currentLang === 'ar';
        this.translate.setDefaultLang('en');
        // Create the FormGroup with OTP controls
        this.activationForm = this.fb.group({
            digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
            digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
            digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
            digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
        });
    }

    ngOnInit(): void {
        // Get identity number from session storage
        const storedIdentity = sessionStorage.getItem('pendingOtpIdentity');
        if (!storedIdentity) {
            // If no pending OTP session, redirect to login
            this.router.navigate(['/auth/login']);
            return;
        }
        this.identityNumber = storedIdentity;
        this.startTimer();
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    ngAfterViewInit(): void {
        // Focus the first OTP input by default after view initializes
        setTimeout(() => {
            this.otpInputs.first?.nativeElement.focus();
        }, 100);
    }

    startTimer(): void {
        this.timer = 60;
        this.canResend = false;

        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = setInterval(() => {
            this.timer--;
            if (this.timer <= 0) {
                clearInterval(this.timerInterval);
                this.canResend = true;
            }
        }, 1000);
    }

    getFormattedTime(): string {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    onOtpInput(event: any, index: number): void {
        const input = event.target;
        const value = input.value;

        // Only allow digits
        if (value && !/^[0-9]$/.test(value)) {
            input.value = '';
            return;
        }

        this.otpDigits[index] = value;
        this.activationForm.patchValue({
            [`digit${index + 1}`]: value,
        });

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = this.otpInputs.toArray()[index + 1];
            if (nextInput) {
                nextInput.nativeElement.focus();
            }
        }
    }

    onOtpKeydown(event: any, index: number): void {
        const input = event.target;

        // Handle backspace
        if (event.key === 'Backspace' && !input.value && index > 0) {
            const prevInput = this.otpInputs.toArray()[index - 1];
            if (prevInput) {
                prevInput.nativeElement.focus();
            }
        }

        // Handle paste
        if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, '').slice(0, 4).split('');
                digits.forEach((digit, i) => {
                    if (i < 4) {
                        this.otpDigits[i] = digit;
                        this.activationForm.patchValue({
                            [`digit${i + 1}`]: digit,
                        });
                        const inputElement = this.otpInputs.toArray()[i];
                        if (inputElement) {
                            inputElement.nativeElement.value = digit;
                        }
                    }
                });
                // Focus last filled input
                const lastIndex = Math.min(digits.length, 3);
                this.otpInputs.toArray()[lastIndex]?.nativeElement.focus();
            });
        }
    }

    resendCode(): void {
        if (!this.canResend || this.isLoading) return;

        this.isLoading = true;
        const otpRequest = {
            identityNumber: Number(this.identityNumber),
        };

        this.authService.requestOtp(otpRequest).subscribe({
            next: () => {
                this.isLoading = false;
                // Reset form and timer
                this.otpDigits = ['', '', '', ''];
                this.activationForm.reset();
                this.startTimer();

                // Focus first input
                setTimeout(() => {
                    this.otpInputs.first?.nativeElement.focus();
                }, 100);
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Failed to resend OTP', error);
            },
        });
    }

    onSubmit(): void {
        if (this.activationForm.invalid || this.isLoading) {
            this.activationForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const code = this.otpDigits.join('');
        const validationRequest = {
            identityNumber: Number(this.identityNumber),
            otpCode: code,
        };

        this.authService.validateOtp(validationRequest).subscribe({
            next: (response) => {
                this.isLoading = false;
                // Clear the pending OTP session
                sessionStorage.removeItem('pendingOtpIdentity');
                // Navigate to home
                this.router.navigate(['/']);
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('OTP validation failed', error);
                // You might want to show an error message to the user here
            },
        });
    }

    toggleLanguage() {
        const newLang = this.isArabic ? 'en' : 'ar';
        this.translate.use(newLang);
        this.isArabic = newLang === 'ar';
        this.translate.use(newLang);
        this.appSetting.toggleLanguage(newLang);
        if (newLang === 'ar') {
            this.ui.toggleRTL('rtl');
            localStorage.setItem('i18n_locale', 'ar');
        } else {
            this.ui.toggleRTL('ltr');
            localStorage.setItem('i18n_locale', 'en');
        }
        window.location.reload();
    }
}
