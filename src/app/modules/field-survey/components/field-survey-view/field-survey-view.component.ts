import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationModel } from 'src/app/modules/location/models/location.model';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { EntityClassificationModel } from 'src/app/modules/settings/entity-classfications/models/entity-classification.model';
import { EntityClassficationsService } from 'src/app/modules/settings/entity-classfications/services/entity-classfications.service';
import { LocationClassification } from 'src/app/modules/settings/location-classification/models/location-classification.model';
import { LocationClassificationService } from 'src/app/modules/settings/location-classification/services/location-classification.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { AttachmentItem } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { FileAttachmentService } from 'src/app/shared/services/file-attachment.service';
import { SaudiMapComponent } from '../../../location/components/saudi-map/saudi-map.component';
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
    @ViewChild(SaudiMapComponent) mapComponent?: SaudiMapComponent;

    fieldSurveyId: number | null = null;
    fieldSurveyForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    currentTabIndex: string = '0';
    staticTabOffset: number = 4;
    classificationTabs: EntityClassificationModel[] = [];

    showMapDialog: boolean = false;
    selectedMarkerCoordinates: string = '';

    attachments: AttachmentItem[] = [];
    filteredLocationClassifications: LocationClassification[] = [];
    selectedImageName: string = '';
    imagePreviewUrl: string = '';
    locations: LocationModel[] = [];
    isImageUploading: boolean = false;
    private readonly imageBaseUrl: string = 'https://dev-operation-srv.fsf.gov.sa';
    private readonly noImageUrl: string =
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%25' height='100%25' fill='%23f3f4f6'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%230e8a8a' font-family='Arial' font-size='20' font-weight='600'>اختر صورة للمسح الجوي</text></svg>";

    siteTypeOptions = [
        { label: 'لا يوجد', id: 'None' },
        { label: 'موجود', id: 'Found' },
        { label: 'داخل', id: 'Inside' },
        { label: 'خارج', id: 'Outside' },
    ];
    filteredSiteTypes = this.siteTypeOptions;

    constructor(
        private fb: FormBuilder,
        private fieldSurveyService: FieldSurveyService,
        private locationService: LocationService,
        private fileAttachmentService: FileAttachmentService,
        private entityClassificationsService: EntityClassficationsService,
        private locationClassificationService: LocationClassificationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadLocations();
        this.searchLocationClassifications();
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
            locationId: [null],
            locationNameAr: [{ value: '', disabled: true }, [Validators.required]],
            organization: [{ value: '', disabled: true }],
            region: [{ value: '', disabled: true }],
            province: [{ value: '', disabled: true }],
            descriptionAr: [''],
            imagePath: [''],
            classificationId: [null],
            opearationCenter: [''],
            openingDate: [''],
            siteLocation: ['yes'],
            siteCoordinates: [''],
            siteReceiptDate: [''],
            nearestPoliceStation: [''],
            nearestDefenseCenter: [''],
            siteLength: [''],
            northBoundar: [''],
            southBoundar: [''],
            westBoundar: [''],
            eastBoundar: [''],
            siteType: ['None'],
            administrativeSite: [''],
            administrativeSiteDistance: [''],
            administrativeSiteType: [''],
            administrativeOfficeNumber: [null],
            administrativeWCNumber: [null],
            administrativeServiceNumber: [null],
            weaponsWarehouse: [false],
            warhouseArea: [''],
            maintainceWorkShop: [false],
            parkingSpaces: [false],
            parkingSpacesNumber: [null],
            staff: [0],
        });

        this.fieldSurveyForm.get('siteType')?.disable();
        this.fieldSurveyForm.get('siteLocation')?.disable();
        this.imagePreviewUrl = this.noImageUrl;
    }

    loadFieldSurvey(id: number): void {
        this.isLoading = true;
        this.fieldSurveyService.getById(id).subscribe((response) => {
            this.fieldSurveyForm.patchValue(response.data);
            this.fieldSurveyForm.patchValue({ siteType: 'None', siteLocation: 'yes' });
            this.imagePreviewUrl = this.buildImageUrl(response.data?.imagePath || '');
            this.patchLocationDetails(response.data);
            this.loadFieldSurveyAttachments(id);

            this.loadClassificationData(id);

            this.isLoading = false;
        });
    }

    patchLocationDetails(fieldSurvey: FieldSurvey): void {
        // patch location detail from filedSurvyLocation property
        this.fieldSurveyForm.patchValue({
            locationId: fieldSurvey.fieldSurveyLocation?.id || null,
            locationNameAr: fieldSurvey.fieldSurveyLocation?.nameAr || '',
            organization: fieldSurvey.fieldSurveyLocation?.organizationNameAr || '',
            region: fieldSurvey.fieldSurveyLocation?.province?.region?.nameAr || '',
            province: fieldSurvey.fieldSurveyLocation?.province?.nameAr || '',
        });
    }

    loadLocations(): void {
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });
        this.locationService.getPagedList(criteria).subscribe((response) => {
            if (response?.isSuccess && response.data?.items) {
                this.locations = response.data.items;
            }
        });
    }

    onLocationChange(): void {
        const locationId = this.fieldSurveyForm.get('locationId')?.value;
        const location = this.locations.find((item) => item.id === locationId);

        if (!location) {
            return;
        }

        this.fieldSurveyForm.patchValue({
            locationNameAr: location.nameAr || '',
            organization: location.organizationNameAr || location.organization?.nameAr || '',
            region: location.regionNameAr || location.region?.nameAr || '',
            province: location.provinceNameAr || location.province?.nameAr || '',
        });
    }

    onImageSelect(event: Event): void {
        const input = event.target as HTMLInputElement | null;
        const file = input?.files?.[0];
        if (!file) {
            return;
        }

        this.selectedImageName = file.name;
        this.fieldSurveyForm.patchValue({ imagePath: file.name });
        this.fieldSurveyForm.get('imagePath')?.markAsDirty();

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreviewUrl = typeof reader.result === 'string' ? reader.result : '';
        };
        reader.readAsDataURL(file);

        this.isImageUploading = true;
        const subscription = this.fileAttachmentService.uploadImage(file).subscribe({
            next: (response: any) => {
                if (response?.data?.filePath) {
                    this.fieldSurveyForm.patchValue({ imagePath: response.data.filePath });
                    this.fieldSurveyForm.get('imagePath')?.markAsDirty();
                    this.imagePreviewUrl = this.buildImageUrl(response.data.filePath);
                }
            },
            error: () => {
                this.showErrorMessage('فشل تحميل الصورة');
            },
            complete: () => {
                this.isImageUploading = false;
            },
        });

        this.subscriptions.add(subscription);

        if (input) {
            input.value = '';
        }
    }

    onImageClear(): void {
        this.selectedImageName = '';
        this.imagePreviewUrl = this.noImageUrl;
        this.fieldSurveyForm.patchValue({ imagePath: '' });
        this.fieldSurveyForm.get('imagePath')?.markAsDirty();
    }

    onImageError(): void {
        this.imagePreviewUrl = this.noImageUrl;
    }

    private buildImageUrl(path: string): string {
        if (!path) {
            return this.noImageUrl;
        }

        if (/^https?:\/\//i.test(path)) {
            return path;
        }

        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        return `${this.imageBaseUrl}${normalizedPath}`;
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
        const fieldSurveyData: FieldSurvey = { ...this.fieldSurveyForm.value } as FieldSurvey;
        fieldSurveyData.siteType = 'None';
        fieldSurveyData.siteLocation = 'yes';

        if (fieldSurveyData.openingDate) {
            fieldSurveyData.openingDate = new Date(fieldSurveyData.openingDate).toISOString();
        }
        if (fieldSurveyData.siteReceiptDate) {
            fieldSurveyData.siteReceiptDate = new Date(
                fieldSurveyData.siteReceiptDate,
            ).toISOString();
        }

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

    searchLocationClassifications(event: any = { query: '' }): void {
        const criteria = new CriteriaModel({ searchTerm: event.query });
        this.locationClassificationService.getPagedList(criteria).subscribe((response) => {
            this.filteredLocationClassifications = response.data.items;
        });
    }

    searchSiteType(event: any) {
        const query = event.query.toLowerCase();
        this.filteredSiteTypes = this.siteTypeOptions.filter((option) =>
            option.label.toLowerCase().includes(query),
        );
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

    /**
     * Open map selection dialog
     */
    openMapDialog(): void {
        this.showMapDialog = true;
        this.selectedMarkerCoordinates = '';
    }

    /**
     * Close map selection dialog
     */
    closeMapDialog(): void {
        this.showMapDialog = false;
        this.selectedMarkerCoordinates = '';
    }

    /**
     * Confirm map selection and update coordinates
     */
    confirmMapSelection(): void {
        if (this.selectedMarkerCoordinates) {
            this.fieldSurveyForm.patchValue({
                siteCoordinates: this.selectedMarkerCoordinates,
            });
            this.closeMapDialog();
        }
    }

    /**
     * Handle marker selection from map
     */
    onMapMarkerSelected(coordinates: string): void {
        this.selectedMarkerCoordinates = coordinates;
    }

    /**
     * Handle map dialog show event
     */
    onMapDialogShow(): void {
        setTimeout(() => {
            if (this.mapComponent) {
                this.mapComponent.initializeMap();
            }
        }, 100);
    }
}
