import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { EntityClassificationModel } from '../../models/entity-classification.model';
import { EntityClassficationsService } from '../../services/entity-classfications.service';

@Component({
    selector: 'app-entity-classfications-list',
    templateUrl: './entity-classfications-list.component.html',
    standalone: false,
})
export class EntityClassficationsListComponent
    extends BaseListComponent<EntityClassificationModel>
    implements OnInit
{
    showDialog: boolean = false;
    selectedEntityId: number | null = null;

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

    removeEntityClassification(id: number, classificationName: string) {
        this.confirmDelete(classificationName, () => {
            this.svc.deleteById(id).subscribe({
                next: () => {
                    this.showSuccessMessage(
                        this.translate('messages.deletedSuccessfully') || 'تم الحذف بنجاح',
                    );
                    this.loadData();
                },
                error: (error) => {
                    this.showErrorMessage(
                        error?.error?.message ||
                            this.translate('messages.deleteFailed') ||
                            'فشل الحذف',
                    );
                },
            });
        });
    }

    openCreateDialog() {
        this.selectedEntityId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedEntityId = id;
        this.showDialog = true;
    }

    onDialogSaved() {
        this.showDialog = false;
        this.loadData();
    }

    openTree(id: number) {
        this.router.navigate([`/entity-classification/tree/${id}`]);
    }
}
