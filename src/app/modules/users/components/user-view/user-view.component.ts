import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-user-view',
    templateUrl: './user-view.component.html',
    standalone: false,
})
export class UserViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() userId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.userId) {
            this.isEditMode = true;
            this.loadUser(this.userId);
        } else if (this.visible && !this.userId) {
            this.isEditMode = false;
            this.form?.reset();
        }
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            fullName: ['', [Validators.required]],
            identityNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            jobName: ['', [Validators.required]],
            rankName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    loadUser(id: number): void {
        this.isLoading = true;
        this.userService.getUserDetails(id).subscribe((response) => {
            const user = response.data as UserModel;

            if (user) {
                this.form.patchValue({
                    fullName: user.fullName,
                    identityNumber: user.identityNumber,
                    jobName: user.jobName,
                    rankName: user.rankName,
                    password: user.password,
                });
            }

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const userData = this.form.value;

        if (this.isEditMode) {
            // TODO: Implement update user API call
            setTimeout(() => {
                this.isLoading = false;
                this.showSuccessMessage(this.translate('validationMessages.userUpdatedSuccess'));
                this.onSave.emit();
                this.closeDialog();
            }, 500);
        } else {
            // Register new user
            this.authService.register(userData).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showSuccessMessage(this.translate('validationMessages.userAddedSuccess'));
                    this.onSave.emit();
                    this.closeDialog();
                },
                error: () => {
                    this.isLoading = false;
                    this.showErrorMessage(this.translate('validationMessages.userErrorSave'));
                },
            });
        }
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
        this.userId = null;
        this.isEditMode = false;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
