import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { NumberOfParticipatingEntitiesService } from '../../services/number-of-participating-entities.service';

@Component({
    selector: 'app-number-of-participating-entities-view',
    templateUrl: './number-of-participating-entities-view.component.html',
    standalone: false,
})
export class NumberOfParticipatingEntitiesViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() itemId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    constructor(
        private fb: FormBuilder,
        private service: NumberOfParticipatingEntitiesService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(): void {
        if (this.visible && this.itemId) {
            this.isEditMode = true;
            this.loadItem(this.itemId);
        } else if (this.visible && !this.itemId) {
            this.isEditMode = false;
            this.form?.reset();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
        });
    }
    loadItem(id: number): void {
        this.isLoading = true;
        this.service.getById(id).subscribe(
            (response: any) => {
                const item = response.data;
                this.form.patchValue({
                    nameAr: item.nameAr,
                    descriptionAr: item.descriptionAr,
                });
                this.isLoading = false;
            },
            (error: any) => {
                console.error('Error loading item', error);
                this.isLoading = false;
            },
        );
    }

    submit(): void {
        if (this.form.invalid) {
            return;
        }

        this.isLoading = true;
        const formDescriptionAr = this.form.getRawValue();

        if (this.isEditMode && this.itemId) {
            const itemToUpdate = { ...formDescriptionAr, id: this.itemId };
            this.service.update(itemToUpdate).subscribe(
                () => {
                    this.isLoading = false;
                    this.closeDialog();
                    this.onSave.emit();
                },
                (error: any) => {
                    console.error('Error updating item', error);
                    this.isLoading = false;
                },
            );
        } else {
            this.service.create(formDescriptionAr).subscribe(
                () => {
                    this.isLoading = false;
                    this.closeDialog();
                    this.onSave.emit();
                },
                (error: any) => {
                    console.error('Error creating item', error);
                    this.isLoading = false;
                },
            );
        }
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
    }
}
