import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { EntityClassficationsService } from '../../services/entity-classfications.service';
import { EntityClassificationFormsService } from '../../services/entity-classification-forms.service';
import { EntityClassificationModel } from '../../models/entity-classification.model';
import { EntityClassificationFormModel } from '../../models/entity-classification-form.model';

@Component({
    selector: 'app-entity-classfications-tree',
    templateUrl: './entity-classfications-tree.component.html',
    styleUrls: ['./entity-classfications-tree.component.scss'],
    standalone: false,
})
export class EntityClassficationsTreeComponent extends BaseComponent implements OnInit {
    @Input() entityId: number | null = null;

    nodes: TreeNode[] = [];
    rootEntity: any | null = null;
    isLoading = false;
    errorMessage = '';
    addChildDialogVisible = false;
    addFormDialogVisible = false;
    viewDetailsDialogVisible = false;
    editDialogVisible = false;
    selectedParent: any | null = null;
    selectedNode: any | null = null;
    selectedNodeForms: EntityClassificationFormModel[] = [];
    childForm!: FormGroup;
    formNodeForm!: FormGroup;
    editForm!: FormGroup;

    constructor(
        private svc: EntityClassficationsService,
        private formSvc: EntityClassificationFormsService,
    ) {
        super();

        // on route chqnge load tree
        this.subscriptions.add(
            this.route.params.subscribe(() => {
                this.loadTree();
            }),
        );
    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.childForm = this.formBuilder.group({
            nameAr: ['', Validators.required],
            descriptionAr: [''],
            entityName: ['FieldSurvey', Validators.required],
        });

        this.formNodeForm = this.formBuilder.group({
            nameAr: ['', Validators.required],
            descriptionAr: [''],
            isCheckBox: [false],
            isText: [false],
        });

        this.editForm = this.formBuilder.group({
            nameAr: ['', Validators.required],
            descriptionAr: [''],
            entityName: ['FieldSurvey'],
        });
    }

    private loadTree(): void {
        this.isLoading = true;
        this.errorMessage = '';

        const routeId = this.route.snapshot.paramMap.get('id');
        const queryId = this.route.snapshot.queryParamMap.get('id');
        const parsedRouteId = routeId ? Number(routeId) : null;
        const parsedQueryId = queryId ? Number(queryId) : null;
        const targetId = this.entityId ?? parsedRouteId ?? parsedQueryId;

        if (!targetId || Number.isNaN(targetId)) {
            this.isLoading = false;
            this.errorMessage =
                this.translate('messages.requiredField') || 'يرجى اختيار تصنيف لعرض المخطط';
            return;
        }

        const sub = this.svc.getById(targetId).subscribe({
            next: (response) => {
                const data = response.data;
                if (!data) {
                    this.errorMessage = this.translate('common.noDataOnList') || 'لا توجد بيانات';
                    this.isLoading = false;
                    return;
                }
                // Store root entity separately
                this.rootEntity = {
                    label: data.nameAr,
                    id: data.id,
                    description: data.descriptionAr,
                    entityName: data.entityName,
                    children: data.children,
                    forms: data.entityClassficationForms,
                };

                // Only show children and forms in the tree
                this.nodes = (data.children || []).map((child) =>
                    this.toTreeNode(child as EntityClassificationModel),
                );

                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load entity classification hierarchy', error);
                this.errorMessage =
                    this.translate('common.errorLoadingData') || 'حدث خطأ أثناء تحميل التصنيفات';
                this.isLoading = false;
            },
        });

        this.subscriptions.add(sub);
    }

    private toTreeNode(item: EntityClassificationModel): TreeNode {
        // Map children classifications
        const childrenNodes = (item.children || []).map((child) => this.toTreeNode(child));

        return {
            type: 'person',
            data: {
                label: item.nameAr,
                id: item.id,
                description: item.descriptionAr,
                entityName: item.entityName,
                children: item.children,
                forms: item.entityClassficationForms,
            },
            expanded: false,
            children: childrenNodes,
        } as TreeNode;
    }

    addChild(node: TreeNode): void {
        this.selectedParent = node;
        this.childForm.reset({
            nameAr: '',
            descriptionAr: '',
            entityName: 'FieldSurvey',
        });
        this.addChildDialogVisible = true;
    }

    closeAddChildDialog(): void {
        this.addChildDialogVisible = false;
        this.selectedParent = null;
    }

    addClassificationForm(node: TreeNode): void {
        this.selectedParent = node;
        this.formNodeForm.reset({
            nameAr: '',
            descriptionAr: '',
            isCheckBox: false,
            isText: false,
        });
        this.addFormDialogVisible = true;
    }

    closeAddFormDialog(): void {
        this.addFormDialogVisible = false;
        this.selectedParent = null;
    }

    saveChild(): void {
        if (this.childForm.invalid || !this.selectedParent?.id) {
            this.childForm.markAllAsTouched();
            return;
        }

        const payload: EntityClassificationModel = {
            ...this.childForm.value,
            parentId: this.selectedParent.id,
        };

        this.isLoading = true;
        const sub = this.svc.create(payload).subscribe({
            next: () => {
                this.showSuccessMessage(this.translate('validationMessages.savedSuccessfully'));
                this.addChildDialogVisible = false;
                this.selectedParent = null;
                this.loadTree();
            },
            error: (err) => {
                console.error('Failed to create child classification', err);
                this.showErrorMessage(this.translate('messages.error') || 'حدث خطأ أثناء الحفظ');
                this.isLoading = false;
            },
        });

        this.subscriptions.add(sub);
    }

    saveClassificationForm(): void {
        if (this.formNodeForm.invalid || !this.selectedParent?.id) {
            this.formNodeForm.markAllAsTouched();
            return;
        }

        const formPayload: EntityClassificationFormModel = {
            ...this.formNodeForm.value,
            entityClassficationId: this.selectedParent.id,
        };

        // Save the classification form directly
        this.isLoading = true;
        const formSub = this.formSvc.create(formPayload).subscribe({
            next: () => {
                this.showSuccessMessage(this.translate('validationMessages.savedSuccessfully'));
                this.addFormDialogVisible = false;
                this.selectedParent = null;
                this.loadTree();
            },
            error: (err) => {
                console.error('Failed to create classification form', err);
                this.showErrorMessage(this.translate('messages.error') || 'حدث خطأ أثناء الحفظ');
                this.isLoading = false;
            },
        });

        this.subscriptions.add(formSub);
    }

    hasChildren(rowNode: any): boolean {
        return rowNode?.node?.children.some((child: any) => !child.data?.isFormNode);
    }

    hasFormChild(rowNode: any): boolean {
        return rowNode?.node?.children.some((child: any) => child.data?.isFormNode);
    }

    viewDetails(rowData: any): void {
        this.selectedNode = rowData;
        this.selectedNodeForms = [];
        this.viewDetailsDialogVisible = true;

        // Load forms for this classification
        if (rowData?.id) {
            this.isLoading = true;
            const sub = this.svc.getById(rowData.id).subscribe({
                next: (response) => {
                    const data = response.data;
                    if (data?.entityClassficationForms) {
                        this.selectedNodeForms = data.entityClassficationForms;
                    }
                    this.isLoading = false;
                },
                error: (err) => {
                    console.error('Failed to load classification forms', err);
                    this.isLoading = false;
                },
            });
            this.subscriptions.add(sub);
        }
    }

    closeViewDetailsDialog(): void {
        this.viewDetailsDialogVisible = false;
        this.selectedNode = null;
    }

    deleteClassificationForm(form: EntityClassificationFormModel): void {
        if (!form?.id) return;

        const formLabel = form.nameAr || this.translate('entityClassification.classificationForm');

        this.confirmDelete(formLabel, () => {
            this.isLoading = true;
            const sub = this.formSvc.deleteById(form.id!).subscribe({
                next: () => {
                    this.showSuccessMessage(this.translate('messages.deletedSuccessfully'));
                    // Refresh the forms list
                    if (this.selectedNode?.id) {
                        this.viewDetails(this.selectedNode);
                    }
                },
                error: (err) => {
                    console.error('Failed to delete classification form', err);
                    this.showErrorMessage(
                        this.translate('messages.error') || 'حدث خطأ أثناء الحذف',
                    );
                    this.isLoading = false;
                },
            });
            this.subscriptions.add(sub);
        });
    }

    editClassificationEntity(entity: any, isLocalEdit: boolean = false): void {
        if (!entity?.id) return;
        if (isLocalEdit) {
            this.editForm.patchValue({
                nameAr: entity.label,
                descriptionAr: entity.description,
                entityName: 'FieldSurvey',
            });
            this.editDialogVisible = true;
            return;
        }

        this.router.navigate(['/entity-classification/tree', entity.id]);
    }

    closeEditDialog(): void {
        this.editDialogVisible = false;
        this.selectedNode = null;
    }

    saveEdit(): void {
        if (this.editForm.invalid || !this.rootEntity?.id) {
            this.editForm.markAllAsTouched();
            return;
        }

        const payload: EntityClassificationModel = {
            ...this.editForm.value,
            id: this.rootEntity.id,
        };

        this.isLoading = true;
        const sub = this.svc.update(payload).subscribe({
            next: () => {
                this.showSuccessMessage(this.translate('validationMessages.savedSuccessfully'));
                this.editDialogVisible = false;
                this.selectedNode = null;
                this.loadTree();
            },
            error: (err) => {
                console.error('Failed to update classification', err);
                this.showErrorMessage(this.translate('messages.error') || 'حدث خطأ أثناء الحفظ');
                this.isLoading = false;
            },
        });

        this.subscriptions.add(sub);
    }

    deleteNode(rowData: any): void {
        if (!rowData?.id) return;

        const isFormNode = rowData?.isFormNode || false;
        const itemType = isFormNode
            ? this.translate('entityClassification.classificationForm')
            : this.translate('entityClassification.classification');
        const itemLabel = rowData?.label || itemType;

        this.confirmDelete(itemLabel, () => {
            this.performDelete(rowData.id, isFormNode);
        });
    }

    private performDelete(id: number, isFormNode: boolean): void {
        this.isLoading = true;

        const deleteObservable = isFormNode ? this.formSvc.deleteById(id) : this.svc.deleteById(id);

        const sub = deleteObservable.subscribe({
            next: () => {
                this.showSuccessMessage(this.translate('messages.deletedSuccessfully'));
                this.loadTree();
            },
            error: (err) => {
                console.error('Failed to delete node', err);
                this.showErrorMessage(this.translate('messages.error') || 'حدث خطأ أثناء الحذف');
                this.isLoading = false;
            },
        });

        this.subscriptions.add(sub);
    }
}
