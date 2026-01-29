import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { LocationClassification } from '../../models/location-classification.model';
import { LocationClassificationService } from '../../services/location-classification.service';

@Component({
    selector: 'app-location-classification-list',
    templateUrl: './location-classification-list.component.html',
    standalone: false,
})
export class LocationClassificationListComponent
    extends BaseListComponent<LocationClassification>
    implements OnInit
{
    showDialog: boolean = false;
    selectedClassificationId: number | null = null;

    constructor(private svc: LocationClassificationService) {
        super();
    }

    protected override getColumns() {
        return [
            { field: 'nameAr', title: 'locationClassification.name' },
            { field: 'color', title: 'locationClassification.color' },
            // { field: 'descriptionAr', title: 'locationClassification.description' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage() {
        return this.svc.getPagedList(this.criteria);
    }

    removeLocationClassification(id: number, classificationName: string) {
        this.confirmDelete(classificationName, () => {
            this.svc.deleteById(id).subscribe(() => {
                this.showSuccessMessage(
                    this.translate('validationMessages.classificationDeletedSuccess'),
                );
                this.loadData();
            });
        });
    }

    openCreateDialog() {
        this.selectedClassificationId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedClassificationId = id;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
    }
}
