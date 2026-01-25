import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CriteriaModel } from '@shared/models/base/criteria.model';
import { HypotheseType } from 'src/app/modules/settings/hypothese-settings/hypothese-types/models/hypothese-type.model';
import { HypotheseTypeService } from 'src/app/modules/settings/hypothese-settings/hypothese-types/services/hypothese-type.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { HypotheseTitle } from '../../models/hypothese-title.model';
import { HypotheseTitleService } from '../../services/hypothese-title.service';

@Component({
    selector: 'app-hypothese-title-view',
    templateUrl: './hypothese-title-view.component.html',
    standalone: false,
})
export class HypotheseTitleViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() hypotheseTitleId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    hypotheseTitleForm!: FormGroup;
    hypotheseTypes: HypotheseType[] = [];
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private hypotheseTitleService: HypotheseTitleService,
        private hypotheseTypeService: HypotheseTypeService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadHypotheseTypes();
    }

    ngOnChanges(): void {
        if (this.visible && this.hypotheseTitleId) {
            this.isEditMode = true;
            this.loadHypotheseTitle(this.hypotheseTitleId);
        } else if (this.visible && !this.hypotheseTitleId) {
            this.isEditMode = false;
            this.hypotheseTitleForm?.reset();
        }
    }

    initForm(): void {
        this.hypotheseTitleForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            hypotheseTypeId: ['', [Validators.required]],
        });
    }

    loadHypotheseTypes(): void {
        const criteria = new CriteriaModel({ pageSize: 1000 });
        this.hypotheseTypeService.getPagedList(criteria).subscribe((response) => {
            this.hypotheseTypes = response.data.items;
        });
    }

    loadHypotheseTitle(id: number): void {
        this.isLoading = true;
        this.hypotheseTitleService.getById(id).subscribe((response) => {
            this.hypotheseTitleForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
                hypotheseTypeId: response.data.hypotheseTypeId,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.hypotheseTitleForm.invalid) {
            this.hypotheseTitleForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const hypotheseTitleData: HypotheseTitle = this.hypotheseTitleForm.value;

        const request = this.isEditMode
            ? this.hypotheseTitleService.update({
                  id: this.hypotheseTitleId!,
                  ...hypotheseTitleData,
              })
            : this.hypotheseTitleService.create(hypotheseTitleData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.hypotheseTitleUpdatedSuccess')
                        : this.translate('validationMessages.hypotheseTitleAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.hypotheseTitleErrorSave'));
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
        this.hypotheseTitleForm.reset();
        this.hypotheseTitleId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.hypotheseTitleId) return;

        this.confirmDelete(
            this.hypotheseTitleForm?.get('nameAr')?.value || 'HypotheseTitle',
            () => {
                this.isLoading = true;
                const subscription = this.hypotheseTitleService
                    .deleteById(this.hypotheseTitleId!)
                    .subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.showSuccessMessage(
                                this.translate('validationMessages.hypotheseTitleDeletedSuccess'),
                            );
                            this.onSave.emit();
                            this.closeDialog();
                        },
                        error: () => {
                            this.isLoading = false;
                            this.showErrorMessage(
                                this.translate('validationMessages.hypotheseTitleErrorDelete'),
                            );
                        },
                    });

                this.subscriptions.add(subscription);
            },
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
