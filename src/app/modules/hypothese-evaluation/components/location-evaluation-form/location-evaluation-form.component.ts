import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hypothese } from 'src/app/modules/hypothese/models/hypothese.model';
import { LocationHypothesisCriteriaService } from 'src/app/modules/settings/hypothese-settings/location-hypothesis-criterias/services/location-hypothesis-criteria.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { HypothesisLocationEvaluationSub } from '../../models/hypothesis-location-evaluation.model';
import { HypothesisLocationEvaluationService } from '../../services/hypothesis-location-evaluation.service';

@Component({
    selector: 'app-location-evaluation-form',
    templateUrl: './location-evaluation-form.component.html',
    standalone: false,
})
export class LocationEvaluationFormComponent extends BaseComponent implements OnInit {
    @Input() hypothese: Hypothese | null = null;

    @Output() onSave = new EventEmitter<void>();

    evaluationForm!: FormGroup;
    isLoading: boolean = false;
    locationCriterias: any[] = [];
    evaluationCriterias: Map<number, number> = new Map();
    collapsedAll: boolean = true;

    get hypotheseId(): number | null {
        return this.hypothese?.id ?? null;
    }

    get existingEvaluation(): any {
        return this.hypothese?.locationHypothesisEvaluation;
    }

    constructor(
        private fb: FormBuilder,
        private locationCriteriaService: LocationHypothesisCriteriaService,
        private evaluationService: HypothesisLocationEvaluationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadLocationCriterias();
    }

    initForm(): void {
        this.evaluationForm = this.fb.group({});
    }

    loadLocationCriterias(): void {
        this.isLoading = true;
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });
        this.locationCriteriaService.getPagedList(criteria).subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data?.items) {
                    this.locationCriterias = response.data.items;
                    this.addFormControls();
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading location criterias', error);
                this.isLoading = false;
            },
        });
    }

    addFormControls(): void {
        this.locationCriterias.forEach((criteria) => {
            // Add controls only for child criteria (parentId is not null)
            if (criteria.children && criteria.children.length > 0) {
                criteria.children.forEach((child: any) => {
                    const controlName = `criteria_${child.id}`;
                    this.evaluationForm.addControl(
                        controlName,
                        this.fb.control('', [Validators.required]),
                    );
                });
            }
        });

        this.loadEvaluation();
    }

    updateFormValues(): void {
        this.locationCriterias.forEach((criteria) => {
            if (criteria.children && criteria.children.length > 0) {
                criteria.children.forEach((child: any) => {
                    const controlName = `criteria_${child.id}`;
                    const value = this.evaluationCriterias.get(child.id);
                    if (value !== undefined) {
                        this.evaluationForm.get(controlName)?.setValue(value);
                    }
                });
            }
        });
    }

    loadEvaluation(): void {
        if (!this.existingEvaluation) return;

        this.existingEvaluation?.forEach((criteria: any) => {
            this.evaluationCriterias.set(criteria.id, criteria.value);
        });

        this.updateFormValues();
    }

    submit(): void {
        if (this.evaluationForm.invalid) {
            this.evaluationForm.markAllAsTouched();
            return;
        }

        if (!this.hypotheseId) return;

        this.isLoading = true;
        const criterias: any[] = [];

        this.locationCriterias.forEach((criteria) => {
            if (criteria.children && criteria.children.length > 0) {
                criteria.children.forEach((child: any) => {
                    const controlName = `criteria_${child.id}`;
                    const value = this.evaluationForm.get(controlName)?.value;
                    if (value !== undefined && value !== '') {
                        criterias.push({
                            locationHypothesisCriteriaId: child.id,
                            value: parseInt(value, 10),
                        });
                    }
                });
            }
        });

        const hypothesisLocationEvaluation: HypothesisLocationEvaluationSub = {
            hypotheseId: this.hypotheseId,
            criterias,
        };

        const subscription = this.evaluationService
            .create({ hypothesisLocationEvaluation })
            .subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.showSuccessMessage(
                        this.translate('validationMessages.locationEvaluationSavedSuccess'),
                    );
                    this.onSave.emit();
                },
                error: (error) => {
                    this.isLoading = false;
                    this.showErrorMessage(
                        this.translate('validationMessages.errorSavingEvaluation'),
                    );
                },
            });

        this.subscriptions.add(subscription);
    }
}
