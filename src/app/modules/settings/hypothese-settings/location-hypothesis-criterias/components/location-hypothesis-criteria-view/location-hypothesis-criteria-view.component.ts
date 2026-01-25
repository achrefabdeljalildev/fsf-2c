import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationHypothesisCriteria } from '../../models/location-hypothesis-criteria.model';
import { LocationHypothesisCriteriaService } from '../../services/location-hypothesis-criteria.service';

@Component({
    selector: 'app-location-hypothesis-criteria-view',
    templateUrl: './location-hypothesis-criteria-view.component.html',
    standalone: false,
})
export class LocationHypothesisCriteriaViewComponent
    extends BaseComponent
    implements OnInit, OnChanges
{
    @Input() visible: boolean = false;
    @Input() criteriaId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    criteriaForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    children: LocationHypothesisCriteria[] = [];
    showChildModal: boolean = false;
    editingChildIndex: number | null = null;

    cols = [
        { field: 'nameAr', title: this.translate('formLabels.name') },
        { field: 'actions', title: this.translate('dataTable.actions'), width: '60px' },
    ];

    constructor(
        private fb: FormBuilder,
        private criteriaService: LocationHypothesisCriteriaService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.criteriaId) {
            this.isEditMode = true;
            this.loadCriteria(this.criteriaId);
        } else if (this.visible && !this.criteriaId) {
            this.isEditMode = false;
            this.criteriaForm?.reset();
            this.children = [];
        }
    }

    initForm(): void {
        this.criteriaForm = this.fb.group({
            nameAr: ['', [Validators.required]],
        });
    }

    loadCriteria(id: number): void {
        this.isLoading = true;
        this.criteriaService.getById(id).subscribe((response) => {
            this.criteriaForm.patchValue({
                nameAr: response.data.nameAr,
            });
            this.children = response.data.children || [];
            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.criteriaForm.invalid) {
            this.criteriaForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const criteriaData: LocationHypothesisCriteria = this.criteriaForm.value;

        const request = this.isEditMode
            ? this.criteriaService.update({ id: this.criteriaId!, ...criteriaData })
            : this.criteriaService.create(criteriaData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate(
                              'validationMessages.locationHypothesisCriteriaUpdatedSuccess',
                          )
                        : this.translate(
                              'validationMessages.locationHypothesisCriteriaAddedSuccess',
                          ),
                );
                this.visibleChange.emit(false);
                this.onSave.emit();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(
                    this.translate('validationMessages.locationHypothesisCriteriaErrorSave'),
                );
            },
        });

        this.subscriptions.add(subscription);
    }

    closeDialog() {
        this.visibleChange.emit(false);
    }

    openChildModal(): void {
        if (!this.criteriaId) {
            this.showErrorMessage(this.translate('validationMessages.saveParentFirst'));
            return;
        }
        this.editingChildIndex = null;
        this.showChildModal = true;
    }

    editChild(id: number): void {
        this.editingChildIndex = this.children.findIndex((c) => c.id === id);
        this.showChildModal = true;
    }

    onChildSaved(): void {
        this.showChildModal = false;
        if (this.criteriaId) {
            this.loadCriteria(this.criteriaId);
        }
    }

    removeChild(id: number): void {
        const child = this.children.find((c) => c.id === id);
        if (!child) {
            return;
        }
        if (!child.id) {
            this.children = this.children.filter((c) => c !== child);
            return;
        }

        const subscription = this.criteriaService.deleteById(child.id).subscribe({
            next: () => {
                this.showSuccessMessage(
                    this.translate('validationMessages.childCriteriaDeletedSuccess'),
                );
                this.children = this.children.filter((c) => c !== child);
            },
            error: () => {
                this.showErrorMessage(
                    this.translate('validationMessages.childCriteriaErrorDelete'),
                );
            },
        });

        this.subscriptions.add(subscription);
    }

    getEditingChild(): LocationHypothesisCriteria | null {
        return this.editingChildIndex !== null ? this.children[this.editingChildIndex] : null;
    }

    trackByIndex(index: number): number {
        return index;
    }
}
