import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { preparingTheNamesOfHypothesesService } from '../../services/preparing-the-names-of-hypotheses.service';
import { TypeOfHypotheses } from 'src/app/modules/settings/assumption-settings/Types-of-hypotheses/models/Types-of-hypotheses.model';
import { TypeOfHypothesesService } from 'src/app/modules/settings/assumption-settings/Types-of-hypotheses/services/Types-of-hypotheses.service';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Component({
    selector: 'app-preparing-the-names-of-hypotheses-view',
    templateUrl: './preparing-the-names-of-hypotheses-view.component.html',
    standalone: false,
})
export class PreparingTheNamesOfHypothesesViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() itemId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    hypotheses: TypeOfHypotheses[] = [];
    filteredHypotheses: TypeOfHypotheses[] = [];

    constructor(
        private fb: FormBuilder,
        private service: preparingTheNamesOfHypothesesService,
        private hypothesesService: TypeOfHypothesesService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadHypotheses();
    }

    ngOnChanges(): void {
        if (this.visible && this.itemId) {
            this.isEditMode = true;
            this.loadItem(this.itemId);
        } else if (this.visible && !this.itemId) {
            this.isEditMode = false;
            this.form?.reset();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            nameAr: ['', [Validators.required]],
            HypotheseTypeId: [''],
        });
    }

    loadHypotheses(): void {
        const criteria = new CriteriaModel();
        this.hypothesesService.getPagedList(criteria).subscribe((response) => {
            this.hypotheses = response.data.items;
            this.filteredHypotheses = response.data.items;
        });
    }

    searchHypotheses(event: any): void {
        const query = event.query.toLowerCase();
        this.filteredHypotheses = this.hypotheses.filter((hypothesis) =>
            hypothesis.nameAr.toLowerCase().includes(query),
        );
    }

    loadItem(id: number): void {
        this.isLoading = true;
        this.service.getById(id).subscribe(
            (response: any) => {
                const item = response.data;
                this.form.patchValue({
                    nameAr: item.NameAr,
                    HypotheseTypeId: item.HypotheseTypeId,
                });
                this.isLoading = false;
            },
            (error: any) => {
                console.error('Error loading item', error);
                this.isLoading = false;
            },
        );
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const formValue = this.form.getRawValue();

        if (this.isEditMode && this.itemId) {
            const itemToUpdate = { ...formValue, id: this.itemId };
            this.service.update(itemToUpdate).subscribe(
                () => {
                    this.isLoading = false;
                    this.closeDialog();
                    this.onSave.emit();
                },
                (error: any) => {
                    console.error('Error updating item', error);
                    this.isLoading = false;
                },
            );
        } else {
            this.service.create(formValue).subscribe(
                () => {
                    this.isLoading = false;
                    this.closeDialog();
                    this.onSave.emit();
                },
                (error: any) => {
                    console.error('Error creating item', error);
                    this.isLoading = false;
                },
            );
        }
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
    }
}
