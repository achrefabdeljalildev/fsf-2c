import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
    selector: 'app-country-view',
    templateUrl: './country-view.component.html',
    standalone: false,
})
export class CountryViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() countryId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    countryForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private countryService: CountryService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.countryId) {
            this.isEditMode = true;
            this.loadCountry(this.countryId);
        } else if (this.visible && !this.countryId) {
            this.isEditMode = false;
            this.countryForm?.reset();
        }
    }

    initForm(): void {
        this.countryForm = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadCountry(id: number): void {
        this.isLoading = true;
        this.countryService.getById(id).subscribe((response) => {
            this.countryForm.patchValue({
                nameAr: response.data.nameAr,
                descriptionAr: response.data.descriptionAr,
            });

            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.countryForm.invalid) {
            this.countryForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const countryData: Country = this.countryForm.value;

        const request = this.isEditMode
            ? this.countryService.update({
                  id: this.countryId!,
                  ...countryData,
              })
            : this.countryService.create(countryData);

        const subscription = request.subscribe({
            next: (response) => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode
                        ? 'تم تحديث الدولة بنجاح'
                        : 'تم إضافة الدولة بنجاح',
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: (error) => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ الدولة');
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
        this.countryForm.reset();
        this.countryId = null;
        this.isEditMode = false;
    }

    remove(): void {
        if (!this.countryId) return;
        this.isLoading = true;
        const subscription = this.countryService
            .deleteById(this.countryId)
            .subscribe({
                next: () => {
                    this.isLoading = false;
                    this.showSuccessMessage('تم حذف الدولة بنجاح');
                    this.onSave.emit();
                    this.closeDialog();
                },
                error: () => {
                    this.isLoading = false;
                    this.showErrorMessage('حدث خطأ أثناء حذف الدولة');
                },
            });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
