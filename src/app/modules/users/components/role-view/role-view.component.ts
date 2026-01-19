import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { RoleModel } from '../../models/role.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-role-view',
    templateUrl: './role-view.component.html',
    standalone: false,
})
export class RoleViewComponent extends BaseComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() role: RoleModel | null = null;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;

    constructor(private userService: UserService) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['visible'] && this.visible) {
            this.prepareForm();
        }
        if (changes['role'] && this.visible) {
            this.prepareForm();
        }
    }

    initForm(): void {
        this.form = this.formBuilder.group({
            roleName: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

    private prepareForm(): void {
        if (!this.form) {
            this.initForm();
        }

        if (this.role) {
            this.isEditMode = true;
            this.form.patchValue({
                roleName: this.role.name,
            });
        } else {
            this.isEditMode = false;
            this.form.reset();
        }
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const { roleName } = this.form.value;

        const request$ =
            this.isEditMode && this.role?.id
                ? this.userService.updateRole(this.role.id, roleName)
                : this.userService.createRole(roleName);

        request$.subscribe({
            next: () => {
                this.isLoading = false;
                const successKey = this.isEditMode
                    ? 'validationMessages.roleUpdatedSuccess'
                    : 'validationMessages.roleAddedSuccess';
                this.showSuccessMessage(
                    this.translate(successKey) ||
                        (this.isEditMode ? 'Role updated successfully' : 'Role added successfully'),
                );
                this.onSave.emit();
                this.closeDialog();
            },
            error: () => {
                this.isLoading = false;
                const errorKey = this.isEditMode
                    ? 'validationMessages.roleErrorUpdate'
                    : 'validationMessages.roleErrorSave';
                this.showErrorMessage(
                    this.translate(errorKey) ||
                        (this.isEditMode
                            ? 'An error occurred while updating the role'
                            : 'An error occurred while saving the role'),
                );
            },
        });
    }

    closeDialog(): void {
        this.visible = false;
        this.visibleChange.emit(false);
        this.form.reset();
        this.isEditMode = false;
    }
}
