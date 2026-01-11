import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { EntityClassficationsService } from '../../services/entity-classfications.service';
import { EntityClassificationModel } from '../../models/entity-classification.model';

@Component({
    selector: 'app-entity-classfications-view',
    templateUrl: './entity-classfications-view.component.html',
    standalone: false,
})
export class EntityClassficationsViewComponent extends BaseComponent implements OnInit {
    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    entityId: number | null = null;

    constructor(private svc: EntityClassficationsService) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.route.params.subscribe((params) => {
            const id = params['id'] ? Number(params['id']) : null;
            this.entityId = id;
            this.isEditMode = !!id;

            if (this.isEditMode && this.entityId) {
                this.loadEntity(this.entityId);
            } else {
                this.form.reset();
            }
        });
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
            entityName: 'fieldSurvey',
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
                this.router.navigate(['/entity-classification/list']);
            },
            error: () => {
                this.isLoading = false;
                this.showErrorMessage('حدث خطأ أثناء حفظ التصنيف');
            },
        });

        this.subscriptions.add(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
