import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CriteriaModel } from '@shared/models/base/criteria.model';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { ProcessService } from '../../../executed-proccess/services/process.service';
import { ProcessApprovalUserService } from '../../services/process-approval-user.service';
import { ProcessApprovalService } from '../../services/process-approval.service';

@Component({
    selector: 'app-process-approval-view',
    templateUrl: './process-approval-view.component.html',
    standalone: false,
})
export class ProcessApprovalViewComponent extends BaseComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() itemId: number | null = null;
    @Input() selectedInvolvedParties: any[] = [];

    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() onSave = new EventEmitter<void>();

    partyCheckboxes: Map<number, FormControl> = new Map();
    form!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    processList: any[] = [];
    processApprovalUser: any[] = [];
    processApproval: any[] = [];
    allprocessApproval: any[] = [];

    constructor(
        private fb: FormBuilder,
        private excutedProcessService: ProcessService,
        private processApprovalService: ProcessApprovalService,
        private processApprovalUserService: ProcessApprovalUserService,
    ) {
        super();

        this.loadDropdownData();
    }

    loadDropdownData(): void {
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });

        // Load process approval users
        this.excutedProcessService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.processList = response.data.items;
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
        } else if (this.visible && !this.itemId) {
            this.isEditMode = false;
            this.form?.reset();
        }
    }

    initForm(): void {
        this.form = this.fb.group({
            nameAr: ['', [Validators.required]],
            descriptionAr: ['descriptionAr shouldnt be required'],
            processId: [null, [Validators.required]],
            isOptinalApprove: [false],
        });
    }

    loadItem(id: number): void {
        this.isLoading = true;
        this.processApprovalService.getById(id).subscribe(
            (response: any) => {
                const item = response.data;
                this.form.patchValue({
                    nameAr: item.nameAr,
                    descriptionAr: item.descriptionAr,
                    processId: item.processId,
                    isOptinalApprove: item.isOptinalApprove,
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
        const formValue = {
            ...this.form.getRawValue(),
            descriptionAr: 'descriptionAr shouldnt be required',
        };

        if (this.isEditMode && this.itemId) {
            const itemToUpdate = { ...formValue, id: this.itemId };
            this.processApprovalService.update(itemToUpdate).subscribe(
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
            this.processApprovalService.create(formValue).subscribe(
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
