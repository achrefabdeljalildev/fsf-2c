import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base-component/base-component';
import { AttachmentItem } from '../../../../shared/components/file-attachments/file-attachments.component';
import { CriteriaModel } from '../../../../shared/models/base/criteria.model';
import { FileAttachmentService } from '../../../../shared/services/file-attachment.service';
import { LocationService } from '../../../location/services/location.service';
import { ClassificationOfRiskImpactService } from '../../../settings/risk-register-settings/classification-of-risk-impact/services/classification-of-risk-impact.service';
import { ClassificationOfRiskSituationsService } from '../../../settings/risk-register-settings/classification-of-risk-situations/services/classification-of-risk-situations.service';
import { ClassificationOfRiskTypeService } from '../../../settings/risk-register-settings/classification-of-risk-type/services/classification-of-risk-type.service';
import { FallingLoadClassificationService } from '../../../settings/risk-register-settings/falling-load-classification/services/falling-load-classification.service';
import { LocationRisk } from '../../models/location-risk.model';
import { LocationRiskService } from '../../services/location-risk.service';

@Component({
    selector: 'app-location-risk-view',
    templateUrl: './location-risk-view.component.html',
    standalone: false,
})
export class LocationRiskViewComponent extends BaseComponent implements OnInit {
    locationRiskId: number | null = null;
    locationRiskForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    // Dropdowns data
    routeParamLocationId: number | null = null;
    locations: any[] = [];
    riskImpacts: any[] = [];
    riskTypes: any[] = [];
    riskStatuses: any[] = [];
    riskLikelihoods: any[] = [];

    // Attachments
    attachments: AttachmentItem[] = [];

    constructor(
        private fb: FormBuilder,
        private locationRiskService: LocationRiskService,
        private locationService: LocationService,
        private riskImpactService: ClassificationOfRiskImpactService,
        private riskTypeService: ClassificationOfRiskTypeService,
        private riskStatusService: ClassificationOfRiskSituationsService,
        private riskLikelihoodService: FallingLoadClassificationService,
        private fileAttachmentService: FileAttachmentService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadDropdownData();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.locationRiskId = +params['id'];
                this.isEditMode = true;
                this.loadLocationRisk(this.locationRiskId);
            }

            if (params['locationId']) {
                this.routeParamLocationId = +params['locationId'];
                this.locationRiskForm.patchValue({ locationId: this.routeParamLocationId });

                this.onLocationChange();
            }
        });
    }

    initForm(): void {
        this.locationRiskForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            locationId: [null, [Validators.required]],
            locationCode: [{ value: '', disabled: true }],
            locationName: [{ value: '', disabled: true }],
            organization: [{ value: '', disabled: true }],
            region: [{ value: '', disabled: true }],
            province: [{ value: '', disabled: true }],
            riskImpactId: [null, [Validators.required]],
            riskLikeliHoodId: [null, [Validators.required]],
            riskStatusId: [null, [Validators.required]],
            riskTypeId: [null, [Validators.required]],
        });
    }

    loadDropdownData(): void {
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });

        // Load locations
        this.locationService.getPagedList(criteria).subscribe((response) => {
            if (response?.isSuccess && response.data?.items) {
                this.locations = response.data.items;
            }
        });

        // Load risk impacts
        this.riskImpactService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.riskImpacts = response.data.items;
            }
        });

        // Load risk types
        this.riskTypeService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.riskTypes = response.data.items;
            }
        });

        // Load risk statuses
        this.riskStatusService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.riskStatuses = response.data.items;
            }
        });

        // Load risk likelihoods
        this.riskLikelihoodService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.riskLikelihoods = response.data.items;
            }
        });
    }

    loadLocationRisk(id: number): void {
        this.isLoading = true;
        this.locationRiskService.getById(id).subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data) {
                    this.locationRiskForm.patchValue(response.data);
                    // Patch location code and details from location object
                    if (response.data.location) {
                        this.locationRiskForm.patchValue({
                            locationCode: response.data.location.code || '',
                            locationName: response.data.location.nameAr || '',
                            organization: response.data.location.organization?.nameAr || '',
                            region: response.data.location.province?.region?.nameAr || '',
                            province: response.data.location.province?.nameAr || '',
                            // ensure locationId is set from nested object when editing
                            locationId: response.data.location.id ?? null,
                        });
                    }

                    // Explicitly set related risk selection IDs from nested objects
                    this.locationRiskForm.patchValue({
                        riskTypeId: response.data.riskType?.id ?? null,
                        riskImpactId: response.data.riskImpact?.id ?? null,
                        riskLikeliHoodId: response.data.riskLikeliHood?.id ?? null,
                        riskStatusId: response.data.riskStatus?.id ?? null,
                    });
                    this.loadLocationRiskAttachments(id);
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load location risk', error);
                this.isLoading = false;
            },
        });
    }

    /**
     * Load attachments for the current location risk
     */
    private loadLocationRiskAttachments(locationRiskId: number): void {
        this.fileAttachmentService.getFilesByEntity(locationRiskId, 'LocationRisk').subscribe({
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

    onLocationChange(): void {
        const selectedLocationId = this.locationRiskForm.get('locationId')?.value;
        if (selectedLocationId) {
            this.locationService.getById(selectedLocationId).subscribe((response) => {
                const selectedLocation = response.data;

                if (selectedLocation) {
                    this.locationRiskForm.patchValue({
                        locationCode: selectedLocation.code || '',
                        locationName: selectedLocation.nameAr || '',
                        organization:
                            selectedLocation.organizationNameAr ||
                            selectedLocation.organization?.nameAr ||
                            '',
                        region:
                            selectedLocation.regionNameAr ||
                            selectedLocation.province?.region?.nameAr ||
                            '',
                        province:
                            selectedLocation.provinceNameAr ||
                            selectedLocation.province?.nameAr ||
                            '',
                    });
                }
            });
        }
    }

    submit(): void {
        if (this.locationRiskForm.invalid) {
            this.locationRiskForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const locationRiskData: LocationRisk = this.locationRiskForm.value;

        const request = this.isEditMode
            ? this.locationRiskService.update({ id: this.locationRiskId!, ...locationRiskData })
            : this.locationRiskService.create(locationRiskData);

        request.subscribe({
            next: (response) => {
                if (response?.isSuccess) {
                    this.showSuccessMessage(
                        this.translateService.instant('validationMessages.savedSuccessfully'),
                    );
                    // If created new record, upload pending attachments
                    if (!this.isEditMode && response?.data?.id) {
                        const pendingUploads = this.attachments.filter(
                            (attachment) => attachment.file,
                        );

                        if (pendingUploads.length > 0) {
                            this.fileAttachmentService
                                .uploadFiles(
                                    pendingUploads.map((attachment) => ({
                                        file: attachment.file!,
                                        entityName: 'LocationRisk',
                                        entityKey: response.data.id!.toString(),
                                        path: 'LocationRisks',
                                        category: 'Documents',
                                    })),
                                )
                                .subscribe({
                                    next: () => {
                                        this.redirectToList();
                                    },
                                    error: (error) => {
                                        console.error('Failed to upload attachments', error);
                                        this.showErrorMessage(
                                            this.translateService.instant('messages.error'),
                                        );

                                        this.isLoading = false;
                                    },
                                });
                        } else {
                            this.redirectToList();
                        }
                    } else {
                        this.redirectToList();
                    }
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to save location risk', error);
                this.showErrorMessage(this.translateService.instant('messages.error'));
                this.isLoading = false;
            },
        });
    }

    onFileAdded(event: any): void {
        if (!this.isEditMode && event?.file) {
            this.attachments = [...this.attachments, event];
        }
    }

    onAttachmentDownload(event: any): void {
        if (event && event.url) {
            window.open(event.url, '_blank');
        }
    }

    onAttachmentRemove(event: any): void {
        if (event && event.id) {
            if (this.isEditMode) {
                this.fileAttachmentService.deleteFile(event.id).subscribe({
                    next: () => {
                        this.showSuccessMessage(
                            this.translateService.instant('messages.deletedSuccessfully'),
                        );
                        if (this.locationRiskId) {
                            this.loadLocationRiskAttachments(this.locationRiskId);
                        }
                    },
                    error: () => {
                        this.showErrorMessage(this.translateService.instant('messages.error'));
                    },
                });
            } else {
                this.attachments = this.attachments.filter((a) => a.id !== event.id);
            }
        }
    }

    onUploadSuccess(event: any): void {
        this.showSuccessMessage('تم تحميل الملف بنجاح');
        if (this.isEditMode && this.locationRiskId) {
            this.loadLocationRiskAttachments(this.locationRiskId);
        }
    }

    onUploadError(event: any): void {
        this.showErrorMessage('فشل تحميل الملف');
    }

    redirectToList(): void {
        if (this.routeParamLocationId) {
            this.router.navigate(['/location-risk/list', this.routeParamLocationId]);
        } else {
            this.router.navigate(['/location-risk/list']);
        }
    }
}
