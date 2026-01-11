import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { FieldSurveyService } from '../../services/field-survey.service';
import { FieldSurvey } from '../../models/field-survey.model';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { AttachmentItem } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { FileAttachmentService } from 'src/app/shared/services/file-attachment.service';
import { EntityClassficationsService } from 'src/app/modules/settings/entity-classfications/services/entity-classfications.service';
import { EntityClassificationModel } from 'src/app/modules/settings/entity-classfications/models/entity-classification.model';

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
    classificationTabs: EntityClassificationModel[] = [];

    attachments: AttachmentItem[] = [];

    constructor(
        private fb: FormBuilder,
        private fieldSurveyService: FieldSurveyService,
        private locationService: LocationService,
        private fileAttachmentService: FileAttachmentService,
        private entityClassificationsService: EntityClassficationsService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadEntityClassifications();
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
            nameAr: ['', [Validators.required]],
            locationCode: [0],
            locationNameAr: [{ value: '', disabled: true }, [Validators.required]],
            organization: [{ value: '', disabled: true }],
            region: [{ value: '', disabled: true }],
            province: [{ value: '', disabled: true }],
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
            this.patchLocationDetails(response.data);
            this.loadFieldSurveyAttachments(id);
            this.isLoading = false;
        });
    }

    patchLocationDetails(fieldSurvey: FieldSurvey): void {
        // patch location detail from filedSurvyLocation property
        this.fieldSurveyForm.patchValue({
            locationCode: fieldSurvey.filedSurvyLocation?.code || 0,
            locationNameAr: fieldSurvey.filedSurvyLocation?.nameAr || '',
            organization: fieldSurvey.filedSurvyLocation?.organizationNameAr || '',
            region: fieldSurvey.filedSurvyLocation?.province?.region?.nameAr || '',
            province: fieldSurvey.filedSurvyLocation?.province?.nameAr || '',
        });
    }

    /**
     * Load attachments for the current field survey
     */
    private loadFieldSurveyAttachments(fieldSurveyId: number): void {
        this.fileAttachmentService.getFilesByEntity(fieldSurveyId, 'FieldSurvey').subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data) {
                    this.attachments = response.data.map((file: any) => ({
                        id: file.id,
                        name: file.originalName,
                        size: file.size,
                        url: file.url,
                        extension: file.extension,
                    }));
                }
            },
            error: (error) => {
                console.error('Failed to load attachments', error);
            },
        });
    }

    loadEntityClassifications(): void {
        const criteria: CriteriaModel = new CriteriaModel({ pageSize: 10, pageNumber: 1 });
        this.entityClassificationsService.getPagedList(criteria).subscribe({
            next: (response) => {
                if (response?.data?.items && response.data.items.length > 0) {
                    const firstClassification = response.data.items[1];
                    if (firstClassification.id) {
                        this.loadClassificationChildren(firstClassification.id);
                    }
                }
            },
            error: (error) => {
                console.error('Failed to load entity classifications', error);
            },
        });
    }

    loadClassificationChildren(id: number): void {
        this.entityClassificationsService.getById(id).subscribe({
            next: (response) => {
                if (response?.data?.children) {
                    this.classificationTabs = response.data.children;
                }
            },
            error: (error) => {
                console.error('Failed to load classification children', error);
            },
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
                // If created new record, upload pending attachments
                if (!this.isEditMode && response?.data?.id) {
                    const pendingUploads = this.attachments.filter((attachment) => attachment.file);

                    if (pendingUploads.length > 0) {
                        this.fileAttachmentService
                            .uploadFiles(
                                pendingUploads.map((attachment) => ({
                                    file: attachment.file!,
                                    entityName: 'FieldSurvey',
                                    entityKey: response.data.id!.toString(),
                                    path: 'FieldSurveys',
                                    category: 'Documents',
                                })),
                            )
                            .subscribe({
                                next: () => {
                                    this.router.navigate(['/field-survey/list']);
                                },
                                error: (error) => {
                                    console.error('Failed to upload attachments', error);
                                    this.router.navigate(['/field-survey/list']);
                                },
                            });
                    } else {
                        this.router.navigate(['/field-survey/list']);
                    }
                } else {
                    this.router.navigate(['/field-survey/list']);
                }
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

        this.confirmDelete(this.fieldSurveyForm?.get('nameAr')?.value || 'Survey', () => {
            this.isLoading = true;
            const subscription = this.fieldSurveyService.deleteById(this.fieldSurveyId!).subscribe({
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
        });
    }

    onFileAdded(file: File): void {
        const attachment: AttachmentItem = {
            id: `${Date.now()}-${file.name}`,
            name: file.name,
            size: file.size,
            file: file,
        };

        this.attachments = [...this.attachments, attachment];
    }

    onAttachmentDownload(attachment: AttachmentItem): void {
        if (attachment.url) {
            window.open(attachment.url, '_blank');
        }
    }

    onAttachmentRemove(attachment: AttachmentItem): void {
        // If not yet uploaded
        if (!attachment.id || attachment.file) {
            this.attachments = this.attachments.filter((item) => item.id !== attachment.id);
            return;
        }

        this.fileAttachmentService.deleteFile(attachment.id).subscribe({
            next: () => {
                this.attachments = this.attachments.filter((item) => item.id !== attachment.id);
                this.showSuccessMessage('تم حذف المرفق بنجاح');
            },
            error: (error) => {
                this.showErrorMessage('فشل حذف المرفق');
                console.error('Delete file error:', error);
            },
        });
    }

    onUploadSuccess(response: any): void {
        this.showSuccessMessage('تم تحميل الملف بنجاح');
    }

    onUploadError(error: any): void {
        this.showErrorMessage('فشل تحميل الملف');
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    search(event: any) {
        // Implement search logic here
    }

    searchByCode(): void {
        const code = this.fieldSurveyForm.get('locationCode')?.value;
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
                        locationNameAr: location.nameAr,
                        organization: location.organizationNameAr || '',
                        region: location.regionNameAr || '',
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
