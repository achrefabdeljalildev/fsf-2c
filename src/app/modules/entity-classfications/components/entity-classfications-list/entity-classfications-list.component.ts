import { Component, OnInit } from '@angular/core';
import { EntityClassficationsService } from '../../services/entity-classfications.service';
import { EntityClassificationModel } from '../../models/entity-classification.model';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';

@Component({
    selector: 'app-entity-classfications-list',
    templateUrl: './entity-classfications-list.component.html',
    standalone: false,
})
export class EntityClassficationsListComponent
    extends BaseListComponent<EntityClassificationModel>
    implements OnInit
{
    showDeleteDialog: boolean = false;
    selectedId: number = 0;

    constructor(private svc: EntityClassficationsService) {
        super();
    }

    protected override getColumns() {
        return [
            { field: 'nameAr', title: 'entityClassification.name' },
            { field: 'descriptionAr', title: 'entityClassification.description' },
            { field: 'entityName', title: 'entityClassification.entityName' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    protected override fetchPage() {
        return this.svc.getPagedList(this.criteria);
    }

    confirmDelete() {
        this.svc.deleteById(this.selectedId).subscribe(() => {
            this.showSuccessMessage(
                this.translate('validationMessages.classificationDeletedSuccess'),
            );
            this.loadData();
        });
    }

    removeEntityClassification(id: number) {
        this.selectedId = id;
        this.showDeleteDialog = true;
    }

    openCreateDialog() {
        this.router.navigate(['/entity-classification/create']);
    }

    openEditDialog(id: number) {
        this.router.navigate([`/entity-classification/tree/${id}`]);
    }

    openTree() {
        const root =
            (this.rows as any)?.find((r: any) => r.parentId === 0) ?? (this.rows as any)?.[0];
        if (!root || !root.id) {
            this.showErrorMessage(this.translate('common.noDataOnList') || 'لا توجد بيانات');
            return;
        }
        this.router.navigate([`/entity-classification/tree/${root.id}`]);
    }
}
