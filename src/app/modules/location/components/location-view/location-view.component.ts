import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationService } from '../../services/location.service';
import { Location, SiteType } from '../../models/location.model';
import { ProvinceService } from 'src/app/modules/province/services/province.service';
import { Province } from 'src/app/modules/province/models/province.model';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';
import { Organization } from 'src/app/modules/organization/models/organization.model';
import { RegionService } from 'src/app/modules/regions/services/region.service';
import { Region } from 'src/app/modules/regions/models/region.model';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

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

    filteredProvinces: Province[] = [];
    filteredOrganizations: Organization[] = [];
    filteredRegions: Region[] = [];

    siteTypeOptions = [
        { label: 'لا يوجد', value: SiteType.None },
        { label: 'موجود', value: SiteType.Found },
        { label: 'داخل', value: SiteType.Inside },
        { label: 'خارج', value: SiteType.Outside },
    ];
    filteredSiteTypes = this.siteTypeOptions;

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
        private provinceService: ProvinceService,
        private organizationService: OrganizationService,
        private regionService: RegionService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.searchOrganization();
        // this.searchProvince();
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
            provinceId: [0, [Validators.required]],
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
            siteType: [SiteType.None],
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

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.locationForm.invalid) {
            this.locationForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const locationData: Location = { ...this.locationForm.value } as Location;
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
                this.router.navigate(['/location/list']);
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
