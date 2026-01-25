import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { HypotheseType } from '../../models/hypothese-type.model';
import { HypotheseTypeService } from '../../services/hypothese-type.service';

@Component({
    selector: 'app-hypothese-type-view',
    templateUrl: './hypothese-type-view.component.html',
    standalone: false,
})
export class HypotheseTypeViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() hypotheseTypeId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    hypotheseTypeForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private hypotheseTypeService: HypotheseTypeService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.hypotheseTypeId) {
            this.isEditMode = true;
            this.loadHypotheseType(this.hypotheseTypeId);
        } else if (this.visible && !this.hypotheseTypeId) {
            this.isEditMode = false;
            this.hypotheseTypeForm?.reset();
        }
    }

    initForm(): void {
        this.hypotheseTypeForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadHypotheseType(id: number): void {
        this.isLoading = true;
        this.hypotheseTypeService.getById(id).subscribe((response) => {
            this.hypotheseTypeForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.hypotheseTypeForm.invalid) {
            this.hypotheseTypeForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const hypotheseTypeData: HypotheseType = this.hypotheseTypeForm.value;

        const request = this.isEditMode
            ? this.hypotheseTypeService.update({ id: this.hypotheseTypeId!, ...hypotheseTypeData })
            : this.hypotheseTypeService.create(hypotheseTypeData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.hypotheseTypeUpdatedSuccess')
                        : this.translate('validationMessages.hypotheseTypeAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.hypotheseTypeErrorSave'));
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
        this.hypotheseTypeForm.reset();
        this.hypotheseTypeId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.hypotheseTypeId) return;

        this.confirmDelete(this.hypotheseTypeForm?.get('nameAr')?.value || 'HypotheseType', () => {
            this.isLoading = true;
            const subscription = this.hypotheseTypeService
                .deleteById(this.hypotheseTypeId!)
                .subscribe({
                    next: () => {
                        this.isLoading = false;
                        this.showSuccessMessage(
                            this.translate('validationMessages.hypotheseTypeDeletedSuccess'),
                        );
                        this.onSave.emit();
                        this.closeDialog();
                    },
                    error: () => {
                        this.isLoading = false;
                        this.showErrorMessage(
                            this.translate('validationMessages.hypotheseTypeErrorDelete'),
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
