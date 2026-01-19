import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { GeneralSettingsService } from '../../services/general-settings.service';

@Component({
    selector: 'app-general-settings-view',
    templateUrl: './general-settings-view.component.html',
    standalone: false,
})
export class GeneralSettingsViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() itemId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    constructor(
        private fb: FormBuilder,
        private service: GeneralSettingsService,
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
            this.disableKeyField();
        } else if (this.visible && !this.itemId) {
            this.isEditMode = false;
            this.form?.reset();
            this.enableKeyField();
        }
    }

    disableKeyField(): void {
        const keyControl = this.form.get('key');
        if (keyControl) {
            keyControl.disable();
        }
    }

    enableKeyField(): void {
        const keyControl = this.form.get('key');
        if (keyControl) {
            keyControl.enable();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            key: ['', [Validators.required]],
            value: [''],
        });
    }
    loadItem(id: number): void {
        this.isLoading = true;
        this.service.getById(id).subscribe(
            (response: any) => {
                const item = response.data;
                this.form.patchValue({
                    key: item.key,
                    value: item.value,
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
        const formValue = this.form.getRawValue();

        if (this.isEditMode && this.itemId) {
            const itemToUpdate = { ...formValue, id: this.itemId };
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
            this.service.create(formValue).subscribe(
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
