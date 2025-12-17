import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { RegionService } from '../../services/region.service';
import { Region } from '../../models/region.model';

@Component({
    selector: 'app-region-view',
    templateUrl: './region-view.component.html',
    standalone: false,
})
export class RegionViewComponent extends BaseComponent implements OnInit {
    regionForm!: FormGroup;
    isLoading: boolean = false;
    regionId: number | null = null;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private regionService: RegionService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.checkEditMode();
    }

    initForm(): void {
        this.regionForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    checkEditMode(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'new') {
            this.regionId = +id;
            this.isEditMode = true;
            this.loadRegion(this.regionId);
        }
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
                        ? 'تم تحديث المنطقة بنجاح'
                        : 'تم إضافة المنطقة بنجاح',
                );
                this.router.navigate(['/regions']);
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ المنطقة');
            },
        });

        this.subscriptions.add(subscription);
    }

    cancel(): void {
        this.router.navigate(['/regions']);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
