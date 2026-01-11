import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region.model';

@Component({
    selector: 'app-region-view',
    templateUrl: './region-view.component.html',
    standalone: false,
})
export class RegionViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() regionId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    regionForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private regionService: RegionService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.regionId) {
            this.isEditMode = true;
            this.loadRegion(this.regionId);
        } else if (this.visible && !this.regionId) {
            this.isEditMode = false;
            this.regionForm?.reset();
        }
    }

    initForm(): void {
        this.regionForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadRegion(id: number): void {
        this.isLoading = true;
        this.regionService.getById(id).subscribe((response) => {
            this.regionForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.regionForm.invalid) {
            this.regionForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const regionData: Region = this.regionForm.value;

        const request = this.isEditMode
            ? this.regionService.update({ id: this.regionId!, ...regionData })
            : this.regionService.create(regionData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.regionUpdatedSuccess')
                        : this.translate('validationMessages.regionAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.regionErrorSave'));
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
        this.regionForm.reset();
        this.regionId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.regionId) return;

        this.confirmDelete(this.regionForm?.get('nameAr')?.value || 'Region', () => {
            this.isLoading = true;
            const subscription = this.regionService.deleteById(this.regionId!).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showSuccessMessage(
                        this.translate('validationMessages.regionDeletedSuccess'),
                    );
                    this.onSave.emit();
                    this.closeDialog();
                },
                error: () => {
                    this.isLoading = false;
                    this.showErrorMessage(this.translate('validationMessages.regionErrorDelete'));
                },
            });

            this.subscriptions.add(subscription);
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
