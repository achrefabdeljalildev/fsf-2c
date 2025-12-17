import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { DataTableColumn } from 'src/app/shared/components/base-datatable/base-datatable.component';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
}

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    standalone: false,
})
export class LocationListComponent extends BaseComponent {
    columns: DataTableColumn[] = [
        { field: 'id', label: 'ID' },
        { field: 'name', label: 'Name' },
        { field: 'email', label: 'Email' },
    ];

    // component.ts
    users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'Admin',
            active: true,
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'User',
            active: false,
        },
        {
            id: 3,
            name: 'Michael Brown',
            email: 'michael.brown@example.com',
            role: 'Manager',
            active: true,
        },
    ];

    totalRecords = 0;
    loading = false;

    loadUsers(event: any) {
        this.loading = true;
        console.log('test', event);

        setTimeout(() => {
            this.loading = false;
        }, 1000);
    }

    onRowSelected($event: any) {
        console.log($event);
    }
}
