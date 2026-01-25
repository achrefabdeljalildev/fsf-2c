import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { HypothesesInvolvedParty } from '../../models/hypotheses-involved-party.model';
import { HypothesesInvolvedPartyService } from '../../services/hypotheses-involved-party.service';

@Component({
    selector: 'app-hypotheses-involved-party-view',
    templateUrl: './hypotheses-involved-party-view.component.html',
    standalone: false,
})
export class HypothesesInvolvedPartyViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() hypothesesInvolvedPartyId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    hypothesesInvolvedPartyForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private hypothesesInvolvedPartyService: HypothesesInvolvedPartyService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.hypothesesInvolvedPartyId) {
            this.isEditMode = true;
            this.loadHypothesesInvolvedParty(this.hypothesesInvolvedPartyId);
        } else if (this.visible && !this.hypothesesInvolvedPartyId) {
            this.isEditMode = false;
            this.hypothesesInvolvedPartyForm?.reset();
        }
    }

    initForm(): void {
        this.hypothesesInvolvedPartyForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadHypothesesInvolvedParty(id: number): void {
        this.isLoading = true;
        this.hypothesesInvolvedPartyService.getById(id).subscribe((response) => {
            this.hypothesesInvolvedPartyForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.hypothesesInvolvedPartyForm.invalid) {
            this.hypothesesInvolvedPartyForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const hypothesesInvolvedPartyData: HypothesesInvolvedParty =
            this.hypothesesInvolvedPartyForm.value;

        const request = this.isEditMode
            ? this.hypothesesInvolvedPartyService.update({
                  id: this.hypothesesInvolvedPartyId!,
                  ...hypothesesInvolvedPartyData,
              })
            : this.hypothesesInvolvedPartyService.create(hypothesesInvolvedPartyData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.hypothesesInvolvedPartyUpdatedSuccess')
                        : this.translate('validationMessages.hypothesesInvolvedPartyAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(
                    this.translate('validationMessages.hypothesesInvolvedPartyErrorSave'),
                );
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
        this.hypothesesInvolvedPartyForm.reset();
        this.hypothesesInvolvedPartyId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.hypothesesInvolvedPartyId) return;

        this.confirmDelete(
            this.hypothesesInvolvedPartyForm?.get('nameAr')?.value || 'HypothesesInvolvedParty',
            () => {
                this.isLoading = true;
                const subscription = this.hypothesesInvolvedPartyService
                    .deleteById(this.hypothesesInvolvedPartyId!)
                    .subscribe({
                        next: () => {
                            this.isLoading = false;
                            this.showSuccessMessage(
                                this.translate(
                                    'validationMessages.hypothesesInvolvedPartyDeletedSuccess',
                                ),
                            );
                            this.onSave.emit();
                            this.closeDialog();
                        },
                        error: () => {
                            this.isLoading = false;
                            this.showErrorMessage(
                                this.translate(
                                    'validationMessages.hypothesesInvolvedPartyErrorDelete',
                                ),
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
