import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { EntityClassficationsService } from '../../services/entity-classfications.service';
import { EntityClassificationModel } from '../../models/entity-classification.model';

@Component({
    selector: 'app-entity-classfications-tree',
    templateUrl: './entity-classfications-tree.component.html',
    styleUrls: ['./entity-classfications-tree.component.scss'],
    standalone: false,
})
export class EntityClassficationsTreeComponent extends BaseComponent implements OnInit {
    @Input() entityId: number | null = null;
    nodes: TreeNode[] = [];
    isLoading = false;
    errorMessage = '';
    addDialogVisible = false;
    selectedParent: TreeNode | null = null;
    childForm!: FormGroup;
    viewMode: 'chart' | 'table' = 'chart';

    constructor(private svc: EntityClassficationsService) {
        super();
    }

    ngOnInit(): void {
        this.loadTree();
        this.initForm();
    }

    private initForm(): void {
        this.childForm = this.formBuilder.group({
            nameAr: ['', Validators.required],
            descriptionAr: [''],
            entityName: ['', Validators.required],
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
                this.nodes = [this.toTreeNode(data as EntityClassificationModel)];
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
        return {
            type: 'person',
            data: {
                label: item.nameAr,
                id: item.id,
                description: item.descriptionAr,
                entityName: item.entityName,
            },
            expanded: true,
            children: (item.children || []).map((child) => this.toTreeNode(child)),
        } as TreeNode;
    }

    addChild(node: TreeNode): void {
        this.selectedParent = node;
        this.childForm.reset({
            nameAr: '',
            descriptionAr: '',
            entityName: node?.data?.entityName || '',
        });
        this.addDialogVisible = true;
    }

    closeAddDialog(): void {
        this.addDialogVisible = false;
        this.selectedParent = null;
    }

    saveChild(): void {
        if (this.childForm.invalid || !this.selectedParent?.data?.id) {
            this.childForm.markAllAsTouched();
            return;
        }

        const payload: EntityClassificationModel = {
            ...this.childForm.value,
            parentId: this.selectedParent.data.id,
        };

        this.isLoading = true;
        const sub = this.svc.create(payload).subscribe({
            next: () => {
                this.showSuccessMessage(this.translate('validationMessages.savedSuccessfully'));
                this.addDialogVisible = false;
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

    toggleViewMode(): void {
        this.viewMode = this.viewMode === 'chart' ? 'table' : 'chart';
    }
}
