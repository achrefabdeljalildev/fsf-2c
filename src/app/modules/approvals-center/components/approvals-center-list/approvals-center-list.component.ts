import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseListComponent } from '@shared/components/base-list-component/base-list-component';
import { Observable } from 'rxjs';
import { approvalsCenterModel } from '../../models/approvals-center.model';
import { approvalsCenterService } from '../../services/approvals-center.service';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
interface StatCard {
    icon: string;
    value: string;
    label: string;
}

interface RequestItem {
    id: string;
    company: string;
    description: string;
    city: string;
    category: string;
    priority: string;
    date: string;
    status: 'draft' | 'pending';
    user: string;
    role: string;
    avatar: string;
}

@Component({
    selector: 'app-approvals-center-list',
    templateUrl: './approvals-center-list.component.html',
    standalone: false,
})
export class approvalsCenterListComponent extends BaseListComponent<approvalsCenterModel> {
    showDialog: boolean = false;
    selectedItemId: number | null = null;

    constructor(private service: approvalsCenterService) {
        super();
    }
    stats: StatCard[] = [
        {
            icon: 'assets/images/icons/location-logo.svg',
            value: '19',
            label: 'طلبات جديدة',
        },
        {
            icon: 'assets/images/icons/location-important-logo.svg',
            value: '15',
            label: 'طلبات متاخرة',
        },
        {
            icon: 'assets/images/icons/location-whait-active-logo.svg',
            value: '08',
            label: 'طلبات منهية',
        },
    ];

    requests: RequestItem[] = [
        {
            id: 'A-7654-09',
            company: 'شركة أرامكون للبترول',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلسل...',
            city: 'الرياض',
            category: 'المنشآت البترولية',
            priority: 'عالية الحساسية',
            date: '2026/02/15',
            status: 'draft',
            user: 'خالد عبدالله الأحمدي',
            role: 'مدخل بيانات',
            avatar: '',
        },
        {
            id: 'A-7654-09',
            company: 'شركة أرامكون للبترول',
            description: 'وصف سريع يتناسب مع هذه الجزئية بشكل مبسط وسلسل...',
            city: 'الرياض',
            category: 'المنشآت البترولية',
            priority: 'عالية الحساسية',
            date: '2026/02/15',
            status: 'pending',
            user: 'خالد عبدالله الأحمدي',
            role: 'مدخل بيانات',
            avatar: '',
        },
    ];

    protected override getColumns(): colDef[] {
        return [
            { field: 'codeId', title: 'formLabels.codeId' },
            { field: 'locationName', title: 'formLabels.codeIlocationName' },
            { field: 'region', title: 'formLabels.region' },
            { field: 'governorate', title: 'formLabels.governorate' },
            { field: 'affiliatedEntities', title: 'formLabels.affiliatedEntities' },
            { field: 'planUpdates', title: 'formLabels.planUpdates' },
            { field: 'actions', title: 'dataTable.actions', width: '100px' },
        ];
    }

    protected override fetchPage(): Observable<
        ApiResponseModel<PagedResponse<approvalsCenterModel>>
    > {
        return this.service.getPagedList(this.criteria);
    }

    openCreateDialog() {
        this.selectedItemId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedItemId = id;
        this.showDialog = true;
    }

    removeItem(id: number) {
        this.confirmDelete('Item', () => {
            this.service.deleteById(id).subscribe(
                () => {
                    this.loadData();
                },
                (error: any) => {
                    console.error('Error deleting item', error);
                },
            );
        });
    }

    onDialogSave() {
        this.showDialog = false;
        this.selectedItemId = null;
        this.loadData();
    }
}
