import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

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
    columns: colDef[] = [
        { field: 'id', title: 'ID' },
        { field: 'name', title: 'Name' },
        { field: 'email', title: 'Email' },
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
