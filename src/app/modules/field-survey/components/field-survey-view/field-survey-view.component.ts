import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { EntityClassificationModel } from 'src/app/modules/settings/entity-classfications/models/entity-classification.model';
import { EntityClassficationsService } from 'src/app/modules/settings/entity-classfications/services/entity-classfications.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { AttachmentItem } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { FileAttachmentService } from 'src/app/shared/services/file-attachment.service';
import { FieldSurvey } from '../../models/field-survey.model';
import { FieldSurveyService } from '../../services/field-survey.service';

export interface ClassificationFormModel {
    entityId: number;
    entityName: string;
    entityClassficationFormId: number;
    isSelected: boolean;
    note: string;
}

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
            } else {
                // Check for locationCode in query params (create from location)
                this.route.queryParams.subscribe((queryParams) => {
                    if (queryParams['locationCode']) {
                        this.searchLocation(queryParams['locationCode']);
                    }
                });
            }
        });
    }

    initForm(): void {
        this.fieldSurveyForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            locationCode: [''],
            locationId: [null],
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

            this.loadClassificationData(id);

            this.isLoading = false;
        });
    }

    patchLocationDetails(fieldSurvey: FieldSurvey): void {
        // patch location detail from filedSurvyLocation property
        this.fieldSurveyForm.patchValue({
            locationCode: fieldSurvey.fieldSurveyLocation?.code || 0,
            locationId: fieldSurvey.fieldSurveyLocation?.id || null,
            locationNameAr: fieldSurvey.fieldSurveyLocation?.nameAr || '',
            organization: fieldSurvey.fieldSurveyLocation?.organizationNameAr || '',
            region: fieldSurvey.fieldSurveyLocation?.province?.region?.nameAr || '',
            province: fieldSurvey.fieldSurveyLocation?.province?.nameAr || '',
        });
    }

    private searchLocation(locationCode: string): void {
        if (!locationCode || locationCode.trim() === '') {
            this.showErrorMessage('يرجى إدخال رمز الموقع');
            return;
        }

        this.isLoading = true;
        const criteria: CriteriaModel = new CriteriaModel();
        criteria.filters = [
            { propertyName: 'code', operator: 'And', values: [locationCode], type: 'Equals' },
        ];

        const subscription = this.locationService.getPagedList(criteria).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response?.data?.items && response.data.items.length > 0) {
                    const location = response.data.items[0];
                    this.fieldSurveyForm.patchValue({
                        locationId: location.id,
                        locationCode: location.code || 0,
                        locationNameAr: location.nameAr || '',
                        organization: location.organizationNameAr || '',
                        region: location.regionNameAr || '',
                        province: location.provinceNameAr || '',
                    });
                } else {
                    this.showErrorMessage('لم يتم العثور على موقع بهذا الرمز');
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('فشل تحميل بيانات الموقع');
                console.error('Failed to load location', error);
            },
        });

        this.subscriptions.add(subscription);
    }

    searchByCode(): void {
        const code = this.fieldSurveyForm.get('locationCode')?.value;
        this.searchLocation(code);
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

    private loadClassificationData(entityId: number): void {
        this.fieldSurveyService
            .getClassificationsData({ entityId, entityName: 'FieldSurvey' })
            .subscribe({
                next: (response: any) => {
                    if (
                        response?.data.classificationData &&
                        Array.isArray(response.data.classificationData)
                    ) {
                        // Populate form controls with loaded classification data
                        response.data.classificationData.forEach((item: any) => {
                            const textControlName = `form_${item.entityClassficationFormId}`;
                            const checkboxControlName = `form_${item.entityClassficationFormId}_checkbox`;

                            let textControl = this.fieldSurveyForm.get(textControlName);
                            let checkboxControl = this.fieldSurveyForm.get(checkboxControlName);

                            // Create controls if they don't exist yet
                            if (!textControl) {
                                this.fieldSurveyForm.addControl(
                                    textControlName,
                                    new FormControl(''),
                                );
                                textControl = this.fieldSurveyForm.get(textControlName);
                            }
                            if (!checkboxControl && item.isSelected !== undefined) {
                                this.fieldSurveyForm.addControl(
                                    checkboxControlName,
                                    new FormControl(false),
                                );
                                checkboxControl = this.fieldSurveyForm.get(checkboxControlName);
                            }

                            if (textControl) {
                                textControl.setValue(item.note || '');
                            }
                            if (checkboxControl) {
                                checkboxControl.setValue(item.isSelected || false);
                            }
                        });
                    }
                },
                error: (error) => {
                    console.error('Failed to load classification data', error);
                },
            });
    }

    loadEntityClassifications(): void {
        const criteria: CriteriaModel = new CriteriaModel({ pageSize: 10, pageNumber: 1 });
        this.entityClassificationsService.getPagedList(criteria).subscribe({
            next: (response) => {
                if (response?.data?.items && response.data.items.length > 0) {
                    this.classificationTabs = response.data.items;
                    // Load full details for each child to get entityClassficationForms
                    this.classificationTabs.forEach((tab) => {
                        if (tab.children && tab.children.length > 0) {
                            tab.children.forEach((child) => {
                                this.entityClassificationsService.getById(child.id!).subscribe({
                                    next: (detailResponse) => {
                                        if (detailResponse?.data) {
                                            // Update child with full details including forms
                                            const index = tab.children!.findIndex(
                                                (c) => c.id === child.id,
                                            );
                                            if (index > -1) {
                                                tab.children![index] = detailResponse.data;
                                                // Add form controls for each form
                                                this.addFormControls(detailResponse.data);
                                            }
                                        }
                                    },
                                    error: (error) => {
                                        console.error(
                                            `Failed to load details for child ${child.id}`,
                                            error,
                                        );
                                    },
                                });
                            });
                        }
                    });
                }
            },
            error: (error) => {
                console.error('Failed to load entity classifications', error);
            },
        });
    }

    private addFormControls(child: any): void {
        if (child.entityClassficationForms && child.entityClassficationForms.length > 0) {
            child.entityClassficationForms.forEach((form: any) => {
                const controlName = `form_${form.id}`;
                const checkboxControlName = `form_${form.id}_checkbox`;

                if (!this.fieldSurveyForm.get(controlName)) {
                    this.fieldSurveyForm.addControl(controlName, new FormControl(''));
                }

                if (form.isCheckBox && !this.fieldSurveyForm.get(checkboxControlName)) {
                    this.fieldSurveyForm.addControl(checkboxControlName, new FormControl(false));
                }
            });
        }
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
            ? this.fieldSurveyService.update({
                  id: this.fieldSurveyId!,
                  ...fieldSurveyData,
                  locationId: fieldSurveyData.locationId,
              })
            : this.fieldSurveyService.create(fieldSurveyData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode ? 'تم تحديث المسح بنجاح' : 'تم إضافة المسح بنجاح',
                );
                // Save classification forms data
                this.saveClassificationForms(response.data.id!);

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

    onClassificationFormChange(formId: number, value: string): void {
        const control = this.fieldSurveyForm.get(`form_${formId}`);
        if (control) {
            control.setValue(value);
        }
    }

    onClassificationFormSelect(formId: number, isSelected: boolean): void {
        const control = this.fieldSurveyForm.get(`form_${formId}_checkbox`);
        if (control) {
            control.setValue(isSelected);
        }
    }

    private saveClassificationForms(fieldSurveyId: number): void {
        const classificationModels: ClassificationFormModel[] = [];

        this.classificationTabs.forEach((tab) => {
            if (tab.children && tab.children.length > 0) {
                tab.children.forEach((child) => {
                    if (
                        child.entityClassficationForms &&
                        child.entityClassficationForms.length > 0
                    ) {
                        child.entityClassficationForms.forEach((form) => {
                            const value = this.fieldSurveyForm.get(`form_${form.id}`)?.value ?? '';
                            const isSelected =
                                this.fieldSurveyForm.get(`form_${form.id}_checkbox`)?.value ??
                                false;

                            classificationModels.push({
                                entityId: fieldSurveyId,
                                entityName: 'FieldSurvey',
                                entityClassficationFormId: form.id!,
                                isSelected: isSelected,
                                note: value,
                            });
                        });
                    }
                });
            }
        });

        if (classificationModels.length > 0) {
            this.fieldSurveyService.createClassificationsData(classificationModels).subscribe({
                next: () => {
                    // Silent success
                },
                error: (err: any) => {
                    console.error('Failed to save classification forms', err);
                },
            });
        }
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
}
