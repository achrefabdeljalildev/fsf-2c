import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { InvolvedPartiesCriteria } from '../../models/involved-parties-criteria.model';
import { InvolvedPartiesCriteriaService } from '../../services/involved-parties-criteria.service';

@Component({
    selector: 'app-involved-parties-criteria-child-form',
    templateUrl: './involved-parties-criteria-child-form.component.html',
    standalone: false,
})
export class InvolvedPartiesCriteriaChildFormComponent
    extends BaseComponent
    implements OnInit, OnChanges
{
    @Input() visible: boolean = false;
    @Input() childData: InvolvedPartiesCriteria | null = null;
    @Input() parentId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    childForm!: FormGroup;
    isEditMode: boolean = false;
    isLoading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private criteriaService: InvolvedPartiesCriteriaService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.childData) {
            this.isEditMode = true;
            this.childForm?.patchValue({
                nameAr: this.childData.nameAr,
            });
        } else if (this.visible && !this.childData) {
            this.isEditMode = false;
            this.childForm?.reset();
        }
    }

    initForm(): void {
        this.childForm = this.fb.group({
            nameAr: ['', [Validators.required]],
        });
    }

    submit(): void {
        if (this.childForm.invalid) {
            this.childForm.markAllAsTouched();
            return;
        }

        if (!this.parentId && !this.isEditMode) {
            this.showErrorMessage(this.translate('validationMessages.parentCriteriaRequired'));
            return;
        }

        this.isLoading = true;
        const childData: InvolvedPartiesCriteria = {
            ...this.childForm.value,
            descriptionAr: '',
            parentId: this.parentId || this.childData?.parentId || 0,
        };

        const request = this.isEditMode
            ? this.criteriaService.update({ id: this.childData!.id!, ...childData })
            : this.criteriaService.create(childData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.childCriteriaUpdatedSuccess')
                        : this.translate('validationMessages.childCriteriaAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.childCriteriaErrorSave'));
            },
        });

        this.subscriptions.add(subscription);
    }

    closeDialog(): void {
        this.visibleChange.emit(false);
        this.childForm?.reset();
    }
}
