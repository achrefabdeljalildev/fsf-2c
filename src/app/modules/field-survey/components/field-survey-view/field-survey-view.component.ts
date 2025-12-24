import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { FieldSurveyService } from '../../services/field-survey.service';
import { FieldSurvey } from '../../models/field-survey.model';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Component({
    selector: 'app-field-survey-view',
    templateUrl: './field-survey-view.component.html',
    standalone: false,
})
export class FieldSurveyViewComponent extends BaseComponent implements OnInit {
    fieldSurveyId: number | null = null;
    fieldSurveyForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private fieldSurveyService: FieldSurveyService,
        private locationService: LocationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.fieldSurveyId = +params['id'];
                this.isEditMode = true;
                this.loadFieldSurvey(this.fieldSurveyId);
            }
        });
    }

    initForm(): void {
        this.fieldSurveyForm = this.fb.group({
            surveyCode: ['', [Validators.required]],
            locationId: [0],
            nameAr: ['', [Validators.required]],
            organization: [''],
            region: [''],
            province: [''],
            surveyType: [''],
            roomType: [''],
            area: [''],
            otherExperiments: [''],
            descriptionAr: [''],
        });
    }

    loadFieldSurvey(id: number): void {
        this.isLoading = true;
        this.fieldSurveyService.getById(id).subscribe((response) => {
            this.fieldSurveyForm.patchValue(response.data);
            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.fieldSurveyForm.invalid) {
            this.fieldSurveyForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const fieldSurveyData: FieldSurvey = this.fieldSurveyForm.value;

        const request = this.isEditMode
            ? this.fieldSurveyService.update({ id: this.fieldSurveyId!, ...fieldSurveyData })
            : this.fieldSurveyService.create(fieldSurveyData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode ? 'تم تحديث المسح بنجاح' : 'تم إضافة المسح بنجاح',
                );
                this.router.navigate(['/field-survey/list']);
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ المسح');
            },
        });

        this.subscriptions.add(subscription);
    }

    cancel(): void {
        this.router.navigate(['/field-survey/list']);
    }

    remove(): void {
        if (!this.fieldSurveyId) return;
        this.isLoading = true;
        const subscription = this.fieldSurveyService.deleteById(this.fieldSurveyId).subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage('تم حذف المسح بنجاح');
                this.router.navigate(['/field-survey/list']);
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حذف المسح');
            },
        });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    search(event: any) {
        // Implement search logic here
    }

    searchByCode(): void {
        const code = this.fieldSurveyForm.get('surveyCode')?.value;
        if (!code || code.trim() === '') {
            this.showErrorMessage('يرجى إدخال رمز الموقع');
            return;
        }

        this.isLoading = true;
        // Create a filter criteria to search by code
        const criteria: CriteriaModel = new CriteriaModel();
        criteria.filters = [
            { propertyName: 'code', operator: 'And', values: [code], type: 'Equals' },
        ];

        const subscription = this.locationService.getPagedList(criteria).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response.data.items && response.data.items.length > 0) {
                    const location = response.data.items[0];
                    // Populate form fields with location data
                    this.fieldSurveyForm.patchValue({
                        locationId: location.id,
                        nameAr: location.nameAr,
                        organization: location.organizationNameAr || '',
                        region: location.area || '',
                        province: location.provinceNameAr || '',
                    });
                    this.showSuccessMessage('تم العثور على الموقع بنجاح');
                } else {
                    this.showErrorMessage('لم يتم العثور على موقع بهذا الرمز');
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء البحث عن الموقع');
            },
        });

        this.subscriptions.add(subscription);
    }
}
