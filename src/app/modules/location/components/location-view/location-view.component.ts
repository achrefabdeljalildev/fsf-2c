import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';

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

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.locationId = +params['id'];
                this.isEditMode = true;
                this.loadLocation(this.locationId);
            }
        });
    }

    initForm(): void {
        this.locationForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            code: ['', [Validators.required]],
            area: [''],
            countryId: [0, [Validators.required]],
            destinationId: [0],
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
            administrativeOfficeNumber: [0],
            administrativeWCNumber: [0],
            administrativeServiceNumber: [0],
            weaponsWarehouse: [false],
            warhouseArea: [''],
            maintainceWorkShop: [false],
            parkingSpaces: [false],
            parkingSpacesNumber: [0],
            staff: [0],
        });
    }

    loadLocation(id: number): void {
        this.isLoading = true;
        this.locationService.getById(id).subscribe((response) => {
            this.locationForm.patchValue(response.data);
            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.locationForm.invalid) {
            this.locationForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const locationData: Location = this.locationForm.value;

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

    search(event: any) {
        // Implement search logic here
    }
}
