import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Panel } from 'primeng/panel';
import { Hypothese } from 'src/app/modules/hypothese/models/hypothese.model';
import { InvolvedPartiesCriteriaService } from 'src/app/modules/settings/hypothese-settings/involved-parties-criterias/services/involved-parties-criteria.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { HypothesisParticipatingEvaluationSub } from '../../models/hypothesis-participating-evaluation.model';
import { HypothesisParticipatingEvaluationService } from '../../services/hypothesis-participating-evaluation.service';

@Component({
    selector: 'app-participating-evaluation-form',
    templateUrl: './participating-evaluation-form.component.html',
    standalone: false,
})
export class ParticipatingEvaluationFormComponent extends BaseComponent implements OnInit {
    @Input() hypothese: Hypothese | null = null;

    @Output() onSave = new EventEmitter<void>();

    @ViewChildren(Panel) panels!: QueryList<Panel>;

    evaluationForm!: FormGroup;
    isLoading: boolean = false;
    participatingCriterias: any[] = [];
    evaluationCriterias: Map<string, string> = new Map();
    collapsedAll: boolean = true;

    get hypotheseId(): number | null {
        return this.hypothese?.id ?? null;
    }

    get involvedParties(): any[] {
        return this.hypothese?.hypotheseInvolvedPartiesData || [];
    }

    get existingEvaluation(): any {
        return this.hypothese?.hypothesisParticipatingEvaluation;
    }

    constructor(
        private fb: FormBuilder,
        private participatingCriteriaService: InvolvedPartiesCriteriaService,
        private evaluationService: HypothesisParticipatingEvaluationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadParticipatingCriterias();
    }

    initForm(): void {
        this.evaluationForm = this.fb.group({});
    }

    loadParticipatingCriterias(): void {
        this.isLoading = true;
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });

        this.participatingCriteriaService.getPagedList(criteria).subscribe({
            next: (response: any) => {
                if (response?.isSuccess && response.data?.items) {
                    // Filter only first-level criteria (where parentId is null)
                    const parentCriterias = response.data.items.filter(
                        (item: any) => item.parentId === null,
                    );

                    this.participatingCriterias = parentCriterias;
                    this.addFormControls();
                    this.loadEvaluation();
                }
                this.isLoading = false;
            },
            error: (error: any) => {
                console.error('Error loading participating criterias', error);
                this.isLoading = false;
            },
        });
    }

    loadEvaluation(): void {
        if (!this.existingEvaluation) return;

        this.existingEvaluation?.forEach((criteria: any) => {
            const key = `${criteria.participatingHypothesisCriteriaId}_${criteria.hypothesesInvolvedPartiesId}`;
            this.evaluationCriterias.set(key, criteria.value);
        });

        this.updateFormValues();
    }

    addFormControls(): void {
        this.participatingCriterias.forEach((parentCriteria: any) => {
            // Add controls for child criteria if they exist
            if (parentCriteria.children && parentCriteria.children.length > 0) {
                parentCriteria.children.forEach((childCriteria: any) => {
                    this.involvedParties.forEach((party) => {
                        const controlName = `criteria_${childCriteria.id}_party_${party.id}`;
                        this.evaluationForm.addControl(
                            controlName,
                            this.fb.control('', [Validators.required]),
                        );
                    });
                });
            } else {
                // Add controls for parent criteria if they have no children
                this.involvedParties.forEach((party) => {
                    const controlName = `criteria_${parentCriteria.id}_party_${party.id}`;
                    this.evaluationForm.addControl(
                        controlName,
                        this.fb.control('', [Validators.required]),
                    );
                });
            }
        });
    }

    updateFormValues(): void {
        this.involvedParties.forEach((party) => {
            this.participatingCriterias.forEach((parentCriteria: any) => {
                // Update child criteria if they exist
                if (parentCriteria.children && parentCriteria.children.length > 0) {
                    parentCriteria.children.forEach((childCriteria: any) => {
                        const controlName = `criteria_${childCriteria.id}_party_${party.id}`;
                        const key = `${childCriteria.id}_${party.id}`;
                        const value = this.evaluationCriterias.get(key);
                        if (value !== undefined) {
                            this.evaluationForm.get(controlName)?.setValue(value);
                        }
                    });
                } else {
                    // Update parent criteria if they have no children
                    const controlName = `criteria_${parentCriteria.id}_party_${party.id}`;
                    const key = `${parentCriteria.id}_${party.id}`;
                    const value = this.evaluationCriterias.get(key);
                    if (value !== undefined) {
                        this.evaluationForm.get(controlName)?.setValue(value);
                    }
                }
            });
        });
    }

    submit(): void {
        if (this.evaluationForm.invalid) {
            this.evaluationForm.markAllAsTouched();
            return;
        }

        if (!this.hypotheseId) return;

        this.isLoading = true;
        const criterias: any[] = [];

        this.involvedParties.forEach((party) => {
            this.participatingCriterias.forEach((parentCriteria: any) => {
                // Process child criteria if they exist
                if (parentCriteria.children && parentCriteria.children.length > 0) {
                    parentCriteria.children.forEach((childCriteria: any) => {
                        const controlName = `criteria_${childCriteria.id}_party_${party.id}`;
                        const value = this.evaluationForm.get(controlName)?.value;
                        if (value !== undefined && value !== '') {
                            criterias.push({
                                participatingHypothesisCriteriaId: childCriteria.id,
                                hypothesesInvolvedPartiesId: party.id,
                                value,
                            });
                        }
                    });
                } else {
                    // Process parent criteria if they have no children
                    const controlName = `criteria_${parentCriteria.id}_party_${party.id}`;
                    const value = this.evaluationForm.get(controlName)?.value;
                    if (value !== undefined && value !== '') {
                        criterias.push({
                            participatingHypothesisCriteriaId: parentCriteria.id,
                            hypothesesInvolvedPartiesId: party.id,
                            value,
                        });
                    }
                }
            });
        });

        const hypothesisParticipatingEvaluation: HypothesisParticipatingEvaluationSub = {
            hypotheseId: this.hypotheseId,
            criterias,
        };

        const subscription = this.evaluationService
            .create({ hypothesisParticipatingEvaluation })
            .subscribe({
                next: (response) => {
                    this.isLoading = false;
                    this.showSuccessMessage(
                        this.translate('validationMessages.participatingEvaluationSavedSuccess'),
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
