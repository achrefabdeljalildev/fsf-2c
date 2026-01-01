import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { ProvinceService } from '../../services/province.service';
import { Province } from '../../models/province.model';
import { RegionService } from 'src/app/modules/regions/services/region.service';
import { Region } from 'src/app/modules/regions/models/region.model';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Component({
    selector: 'app-province-view',
    templateUrl: './province-view.component.html',
    standalone: false,
})
export class ProvinceViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() provinceId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    provinceForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    regions: Region[] = [];
    filteredRegions: Region[] = [];

    constructor(
        private fb: FormBuilder,
        private provinceService: ProvinceService,
        private regionService: RegionService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadRegions();
    }

    ngOnChanges(): void {
        if (this.visible && this.provinceId) {
            this.isEditMode = true;
            this.loadProvince(this.provinceId);
        } else if (this.visible && !this.provinceId) {
            this.isEditMode = false;
            this.provinceForm?.reset();
        }
    }

    initForm(): void {
        this.provinceForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            regionId: [null, [Validators.required]],
        });
    }

    loadProvince(id: number): void {
        this.isLoading = true;
        this.provinceService.getById(id).subscribe((response) => {
            this.provinceForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
                regionId: response.data.regionId,
            });

            this.isLoading = false;
        });
    }

    loadRegions(): void {
        const regionCriteria = new CriteriaModel();
        this.regionService.getPagedList(regionCriteria).subscribe((response) => {
            this.regions = response.data.items;
            this.filteredRegions = response.data.items;
        });
    }

    searchRegion(event: any): void {
        const query = event.query.toLowerCase();
        this.filteredRegions = this.regions.filter((region) =>
            region.nameAr.toLowerCase().includes(query),
        );
    }

    submit(): void {
        if (this.provinceForm.invalid) {
            this.provinceForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const provinceData: Province = this.provinceForm.value;

        const request = this.isEditMode
            ? this.provinceService.update({
                  id: this.provinceId!,
                  ...provinceData,
              })
            : this.provinceService.create(provinceData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? this.translate('validationMessages.provinceUpdatedSuccess')
                        : this.translate('validationMessages.provinceAddedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.provinceErrorSave'));
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
        this.provinceForm.reset();
        this.provinceId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.provinceId) return;
        this.isLoading = true;
        const subscription = this.provinceService.deleteById(this.provinceId).subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.translate('validationMessages.provinceDeletedSuccess'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage(this.translate('validationMessages.provinceErrorDelete'));
            },
        });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
