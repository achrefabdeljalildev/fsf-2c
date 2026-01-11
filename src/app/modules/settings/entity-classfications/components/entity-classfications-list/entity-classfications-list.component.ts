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
