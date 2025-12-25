import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationService } from '../../services/location.service';
import { LocationModel } from '../../models/location.model';
import { ProvinceService } from 'src/app/modules/province/services/province.service';
import { Province } from 'src/app/modules/province/models/province.model';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';
import { Organization } from 'src/app/modules/organization/models/organization.model';
import { RegionService } from 'src/app/modules/regions/services/region.service';
import { Region } from 'src/app/modules/regions/models/region.model';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { FlatpickrDefaultsInterface } from 'angularx-flatpickr';
import { AttachmentItem } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { FileAttachmentService } from 'src/app/shared/services/file-attachment.service';
import HijriDateConfig from 'src/app/shared/util/hijri-date-config';

@Component({
    selector: 'app-location-view',
    templateUrl: './location-view.component.html',
    standalone: false,
})
export class LocationViewComponent extends BaseComponent implements OnInit {
    locationId: number | null = null;
    locationForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    currentTabIndex: string = '0';

    filteredProvinces: Province[] = [];
    filteredOrganizations: Organization[] = [];
    filteredRegions: Region[] = [];
    attachments: AttachmentItem[] = [];

    dateBasic: FlatpickrDefaultsInterface = HijriDateConfig;

    siteTypeOptions = [
        { label: 'لا يوجد', id: 'None' },
        { label: 'موجود', id: 'Found' },
        { label: 'داخل', id: 'Inside' },
        { label: 'خارج', id: 'Outside' },
    ];
    filteredSiteTypes = this.siteTypeOptions;

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
        private provinceService: ProvinceService,
        private organizationService: OrganizationService,
        private regionService: RegionService,
        private fileAttachmentService: FileAttachmentService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.searchOrganization();
        this.searchRegion();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.locationId = +params['id'];
                this.isEditMode = true;
                this.loadLocation(this.locationId);
            }
        });

        // when region changes, update provinces
        this.subscriptions.add(
            this.locationForm.get('regionId')!.valueChanges.subscribe((regionId) => {
                this.searchRelatedRegionProvince(regionId);
                // Clear province selection when region changes
                this.locationForm.patchValue({ provinceId: null });

                // enable province control
                this.locationForm.get('provinceId')!.enable();
            }),
        );
    }

    initForm(): void {
        this.locationForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            code: ['', [Validators.required]],
            area: [''],
            regionId: [null],
            provinceId: [{ value: null, disabled: true }, [Validators.required]],
            organizationId: [0],
            opearationCenter: [''],
            openingDate: [''],
            siteLocation: [''],
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
    }

    loadLocation(id: number): void {
        this.isLoading = true;
        this.locationService.getById(id).subscribe((response) => {
            this.locationForm.patchValue(response.data);
            this.locationForm.patchValue({
                organizationId: response?.data?.organization?.id ?? null,
                regionId: response?.data?.province?.region?.id ?? null,
                provinceId: response?.data?.province?.id ?? null,
            });

            // Load attachments for this location
            this.loadLocationAttachments(id);
            this.isLoading = false;
        });
    }

    /**
     * Load attachments for the current location
     */
    private loadLocationAttachments(locationId: number): void {
        this.fileAttachmentService.getFilesByEntity(locationId, 'Location').subscribe({
            next: (response) => {
                if (response.isSuccess && response.data) {
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

    submit(): void {
        if (this.locationForm.invalid) {
            this.locationForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const locationData: LocationModel = { ...this.locationForm.value } as LocationModel;
        // regionId is used for UI only; backend expects area (string)
        // Avoid sending regionId if backend model doesn't support it
        delete (locationData as any).regionId;

        // Convert dates to ISO format
        if (locationData.openingDate) {
            locationData.openingDate = new Date(locationData.openingDate).toISOString();
        }
        if (locationData.siteReceiptDate) {
            locationData.siteReceiptDate = new Date(locationData.siteReceiptDate).toISOString();
        }

        const request = this.isEditMode
            ? this.locationService.update({ id: this.locationId!, ...locationData })
            : this.locationService.create(locationData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode ? 'تم تحديث الموقع بنجاح' : 'تم إضافة الموقع بنجاح',
                );
                console.log(response);

                // if the location is created successfully, create the attachments relationhip
                if (response.data.id && !this.isEditMode) {
                    // Filter out attachments that don't have a file object (already uploaded ones)
                    const pendingUploads = this.attachments.filter((attachment) => attachment.file);

                    if (pendingUploads.length > 0) {
                        // upload attachments
                        this.fileAttachmentService
                            .uploadFiles(
                                pendingUploads.map((attachment) => ({
                                    file: attachment.file!,
                                    entityName: 'Location',
                                    entityKey: response.data.id!.toString(),
                                    path: 'Location',
                                    category: 'Images',
                                })),
                            )
                            .subscribe({
                                next: () => {
                                    this.router.navigate(['/location/list']);
                                    console.log('Attachments associated successfully');
                                },
                                error: (error) => {
                                    console.error('Failed to associate attachments', error);
                                },
                            });
                    }
                }
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ الموقع');
            },
        });

        this.subscriptions.add(subscription);
    }
    onRegionSelected(region: Region) {
        if (region?.nameAr) {
            this.locationForm.patchValue({ area: region.nameAr });
        }
    }

    cancel(): void {
        this.router.navigate(['/location/list']);
    }

    onFileAdded(file: File): void {
        const attachment: AttachmentItem = {
            id: `${Date.now()}-${file.name}`,
            name: file.name,
            size: file.size,
            file: file, // Store the actual File object
        };

        this.attachments = [...this.attachments, attachment];
    }

    onAttachmentDownload(attachment: AttachmentItem): void {
        // Hook your download logic here (e.g., call a download endpoint using attachment.id or attachment.url)
        if (attachment.url) {
            window.open(attachment.url, '_blank');
        }
    }

    onAttachmentRemove(attachment: AttachmentItem): void {
        if (!attachment.id) {
            this.attachments = this.attachments.filter((item) => item.id !== attachment.id);
            return;
        }

        // Delete file from server if it has an ID (already uploaded)
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

    remove(): void {
        if (!this.locationId) return;
        this.isLoading = true;
        const subscription = this.locationService.deleteById(this.locationId).subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage('تم حذف الموقع بنجاح');
                this.router.navigate(['/location/list']);
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حذف الموقع');
            },
        });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    searchRelatedRegionProvince(regionId: number): void {
        const criteria = new CriteriaModel({
            filters: [
                {
                    propertyName: 'regionId',
                    values: [`${regionId}`],
                    operator: 'And',
                    type: 'Equals',
                },
            ],
        });

        this.provinceService.getPagedList(criteria).subscribe((response) => {
            this.filteredProvinces = response.data.items;
        });
    }

    searchOrganization(event: any = { query: '' }): void {
        const criteria = new CriteriaModel({ searchTerm: event.query });
        this.organizationService.getPagedList(criteria).subscribe((response) => {
            this.filteredOrganizations = response.data.items;
        });
    }

    searchRegion(event: any = { query: '' }): void {
        const criteria = new CriteriaModel({ searchTerm: event.query });
        this.regionService.getPagedList(criteria).subscribe((response) => {
            this.filteredRegions = response.data.items;
        });
    }

    search(event: any) {
        // Implement search logic here
    }

    searchSiteType(event: any) {
        const query = event.query.toLowerCase();
        this.filteredSiteTypes = this.siteTypeOptions.filter((option) =>
            option.label.toLowerCase().includes(query),
        );
    }
}
