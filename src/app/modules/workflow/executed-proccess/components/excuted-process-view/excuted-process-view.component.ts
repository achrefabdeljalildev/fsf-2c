import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { ProcessService } from '../../services/process.service';
import { CriteriaModel } from '@shared/models/base/criteria.model';

@Component({
    selector: 'app-excuted-process-view',
    templateUrl: './excuted-process-view.component.html',
    standalone: false,
})
export class ExcutedProcessViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() itemId: number | null = null;

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    processes: any[] = [];
    processApprovalUser: any[] = [];
    processApproval: any[] = [];
    allprocessApproval: any[] = [];

    constructor(
        private fb: FormBuilder,
        private ProcessService: ProcessService,
        private ExcutedProcessService: ProcessService,
    ) {
        super();

        this.loadDropdownData();
    }

    loadDropdownData(): void {
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });

        // Load processes
        this.ProcessService.getPagedList(criteria).subscribe((response) => {
            if (response?.isSuccess && response.data?.items) {
                this.processes = response.data.items;
            }
        });

        // Load all process approvals
        this.ExcutedProcessService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.allprocessApproval = response.data.items;
            }
        });
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
        const keyControl = this.form.get('nameAr');
        if (keyControl) {
            keyControl.disable();
        }
    }

    enableKeyField(): void {
        const keyControl = this.form.get('nameAr');
        if (keyControl) {
            keyControl.enable();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: [''],
            processId: [null, [Validators.required]],
            isOptinalApprover: [false],
        });
    }

    loadItem(id: number): void {
        this.isLoading = true;
        this.ProcessService.getById(id).subscribe(
            (response: any) => {
                const item = response.data;
                this.form.patchValue({
                    nameAr: item.key,
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
        const formValue = this.form.getRawValue();

        if (this.isEditMode && this.itemId) {
            const itemToUpdate = { ...formValue, id: this.itemId };
            this.ProcessService.update(itemToUpdate).subscribe(
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
            this.ProcessService.create(formValue).subscribe(
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
