import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { OrganizationService } from '../../services/organization.service';
import { Organization } from '../../models/organization.model';

@Component({
    selector: 'app-organization-view',
    templateUrl: './organization-view.component.html',
    standalone: false,
})
export class OrganizationViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() organizationId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    organizationForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private organizationService: OrganizationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.organizationId) {
            this.isEditMode = true;
            this.loadOrganization(this.organizationId);
        } else if (this.visible && !this.organizationId) {
            this.isEditMode = false;
            this.organizationForm?.reset();
        }
    }

    initForm(): void {
        this.organizationForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadOrganization(id: number): void {
        this.isLoading = true;
        this.organizationService.getById(id).subscribe((response) => {
            this.organizationForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.organizationForm.invalid) {
            this.organizationForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const organizationData: Organization = this.organizationForm.value;

        const request = this.isEditMode
            ? this.organizationService.update({
                  id: this.organizationId!,
                  ...organizationData,
              })
            : this.organizationService.create(organizationData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.organizationUpdatedSuccess')
                        : this.translate('validationMessages.organizationAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.organizationErrorSave'));
            },
        });

        this.subscriptions.add(subscription);
    }

    cancel(): void {
        this.closeDialog();
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.organizationForm.reset();
        this.organizationId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.organizationId) return;

        this.confirmDelete(this.organizationForm?.get('nameAr')?.value || 'Organization', () => {
            this.isLoading = true;
            const subscription = this.organizationService
                .deleteById(this.organizationId!)
                .subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.showSuccessMessage(
                            this.translate('validationMessages.organizationDeletedSuccess'),
                        );
                        this.onSave.emit();
                        this.closeDialog();
                    },
                    error: () => {
                        this.isLoading = false;
                        this.showErrorMessage(
                            this.translate('validationMessages.organizationErrorDelete'),
                        );
                    },
                });

            this.subscriptions.add(subscription);
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
