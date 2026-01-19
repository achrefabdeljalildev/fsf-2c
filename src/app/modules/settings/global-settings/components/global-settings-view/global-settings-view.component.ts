import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { GlobalSetting } from '../../models/global-settings.model';
import { GlobalSettingsService } from '../../services/global-settings.service';

@Component({
    selector: 'app-global-settings-view',
    templateUrl: './global-settings-view.component.html',
    standalone: false,
})
export class GlobalSettingsViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() settingId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    settingForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private globalSettingsService: GlobalSettingsService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.settingId) {
            this.isEditMode = true;
            this.loadSetting(this.settingId);
        } else if (this.visible && !this.settingId) {
            this.isEditMode = false;
            this.settingForm?.reset();
            // Enable the key field when creating new setting
            this.settingForm.get('key')?.enable();
        } else if (!this.visible) {
            // Reset form and state when dialog is closed
            this.settingForm?.reset();
            this.isEditMode = false;
            this.isLoading = false;
        }
    }

    initForm(): void {
        this.settingForm = this.fb.group({
            key: ['', [Validators.required]],
            value: ['', [Validators.required]],
        });
    }

    loadSetting(id: number): void {
        this.isLoading = true;
        this.globalSettingsService.getById(id).subscribe((response) => {
            this.settingForm.patchValue({
                key: response.data.key,
                value: response.data.value,
            });

            // Disable the key field in edit mode
            this.settingForm.get('key')?.disable();

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.settingForm.invalid) {
            this.settingForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const settingData: GlobalSetting = this.settingForm.value;

        const request = this.isEditMode
            ? this.globalSettingsService.update({ id: this.settingId!, ...settingData })
            : this.globalSettingsService.create(settingData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.globalSettingUpdatedSuccess')
                        : this.translate('validationMessages.globalSettingAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.globalSettingErrorSave'));
            },
        });

        this.subscriptions.add(subscription);
    }

    cancel(): void {
        this.closeDialog();
    }

    closeDialog(): void {
        this.settingForm.reset();
        this.isEditMode = false;
        this.isLoading = false;
        this.visible = false;
        this.visibleChange.emit(false);
    }
}
