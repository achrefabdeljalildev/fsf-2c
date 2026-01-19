import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { EntityClassificationModel } from '../../models/entity-classification.model';
import { EntityClassficationsService } from '../../services/entity-classfications.service';

@Component({
    selector: 'app-entity-classfications-view',
    templateUrl: './entity-classfications-view.component.html',
    standalone: false,
})
export class EntityClassficationsViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() entityId: number | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() saved = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(private svc: EntityClassficationsService) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible) {
            this.isEditMode = !!this.entityId;
            if (this.isEditMode && this.entityId) {
                this.loadEntity(this.entityId);
            } else {
                this.form.reset();
            }
        }
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }

    loadEntity(id: number): void {
        this.isLoading = true;
        this.svc.getById(id).subscribe((response) => {
            const data = (response as any)?.data || response;
            this.form.patchValue({
                nameAr: data.nameAr,
                descriptionAr: data.descriptionAr,
            });
            this.isLoading = false;
        });
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const payload: EntityClassificationModel = {
            ...this.form.value,
            entityName: 'FieldSurvey',
        };

        const request = this.isEditMode
            ? this.svc.update({ id: this.entityId!, ...payload })
            : this.svc.create(payload);

        const subscription = request.subscribe({
            next: () => {
                this.isLoading = false;
                this.showSuccessMessage(
                    this.isEditMode ? 'تم تحديث التصنيف بنجاح' : 'تم إضافة التصنيف بنجاح',
                );
                this.closeDialog();
                this.saved.emit();
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ التصنيف');
            },
        });

        this.subscriptions.add(subscription);
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
        this.entityId = null;
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
