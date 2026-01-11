# Project Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Modular Architecture](#modular-architecture)
4. [Generic Components](#generic-components)
5. [Layouts System](#layouts-system)
6. [Shared Module](#shared-module)
7. [State Management](#state-management)
8. [Routing Strategy](#routing-strategy)
9. [Best Practices](#best-practices)

---

## Overview

This is an Angular-based application following a **modular architecture** pattern. The project is structured to promote code reusability, maintainability, and scalability through feature modules, shared components, and a centralized state management system.

### Technology Stack

- **Framework**: Angular 18+
- **UI Library**: PrimeNG
- **State Management**: NgRx Store
- **Styling**: TailwindCSS
- **Internationalization**: ngx-translate
- **Build Tool**: Angular CLI with esbuild

---

## Project Structure

```
src/
├── app/
│   ├── layouts/                    # Layout components
│   │   ├── app-layout/            # Main application layout
│   │   ├── auth-layout/           # Authentication layout
│   │   ├── dashboard/             # Dashboard component
│   │   ├── header/                # Header component
│   │   └── sidebar/               # Sidebar component
│   │
│   ├── modules/                    # Feature modules
│   │   ├── auth/                  # Authentication module
│   │   ├── users/                 # User management
│   │   ├── location/              # Location management
│   │   ├── province/              # Province management
│   │   ├── regions/               # Regions management
│   │   ├── organization/          # Organization management
│   │   ├── field-survey/          # Field survey module
│   │   ├── entity-classfications/ # Entity classifications
│   │   ├── location-classification/
│   │   └── saudi-maps/            # Maps integration
│   │
│   ├── shared/                     # Shared module
│   │   ├── components/            # Reusable components
│   │   ├── services/              # Shared services
│   │   ├── directives/            # Custom directives
│   │   ├── pipes/                 # Custom pipes
│   │   ├── models/                # Shared interfaces/types
│   │   ├── validators/            # Form validators
│   │   ├── util/                  # Utility functions
│   │   ├── consts/                # Constants & API URLs
│   │   └── pages/                 # Generic pages (404, maintenance)
│   │
│   ├── store/                      # NgRx store
│   │   └── index.reducer.ts       # Root reducer
│   │
│   ├── app.module.ts               # Root module
│   ├── app.route.ts                # Application routes
│   └── app.component.ts            # Root component
│
├── assets/                         # Static assets
│   ├── css/                       # Stylesheets
│   ├── i18n/                      # Translation files (ar.json, en.json)
│   ├── images/                    # Images and icons
│   └── js/                        # External JS libraries
│
└── environments/                   # Environment configurations
```

---

## Modular Architecture

The application follows a **feature-based modular architecture** where each business domain is encapsulated in its own module.

### Module Structure

Each feature module follows this standard structure:

```
module-name/
├── components/              # Module-specific components
│   ├── module-list/        # List view component
│   └── module-view/        # Create/Edit form component
├── models/                  # Module-specific interfaces
├── services/                # Module-specific services
└── module-name.module.ts   # Module definition
```

### Example: Users Module

**File**: `src/app/modules/users/users.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserViewComponent } from './components/user-view/user-view.component';

const routes: Routes = [
    { path: 'list', component: UserListComponent },
    { path: 'create', component: UserViewComponent },
    { path: 'edit/:id', component: UserViewComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedModule, // Import shared components and services
    ],
    declarations: [UserListComponent, UserViewComponent],
})
export class UsersModule {}
```

### Key Principles

1. **Lazy Loading**: Modules are lazy-loaded to improve initial load time
2. **Self-Contained**: Each module has its own routing, components, and services
3. **Shared Dependencies**: Common functionality is imported from `SharedModule`
4. **Consistent Structure**: All modules follow the same organizational pattern

### Example: Module Routes in app.route.ts

```typescript
export const routes: Routes = [
    {
        path: 'users',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule),
    },
    {
        path: 'location',
        canActivate: [AuthGuard],
        component: AppLayout,
        loadChildren: () =>
            import('./modules/location/location.module').then((m) => m.LocationModule),
    },
    // ... other modules
];
```

---

## Generic Components

The application includes a suite of reusable generic components that standardize UI patterns across all modules.

### 1. MainContentComponent

**Purpose**: Provides a consistent wrapper for list pages with proper height constraints and scrolling.

**Location**: `src/app/shared/components/main-content/`

**Usage**:

```html
<main-content>
    <!-- Your content here -->
    <list-header ... />
    <ng-datatable ... />
</main-content>
```

**Features**:

- Fixed height calculation: `h-[calc(100vh-150px)]`
- Automatic overflow handling
- Consistent panel styling
- Used across all list pages

**Example** (from user-list.component.html):

```html
<p-breadcrumb [model]="breadcrumbItems" />

<main-content>
    <list-header
        tableTitle="{{ 'users.userList' | translate }}"
        addNewRecordLabel="{{ 'users.addNewUser' | translate }}"
        [paginationInfo]="paginationInfo"
        (search)="onSearch($event)"
        (addNewRecord)="openCreateDialog()"
    />

    <ng-datatable [rows]="rows" [columns]="cols" [loading]="isLoading" [pagination]="true">
        <!-- ... -->
    </ng-datatable>
</main-content>
```

---

### 2. ListHeaderComponent

**Purpose**: Standardized header for list pages with search, add button, and pagination info.

**Location**: `src/app/shared/components/list-header/`

**Inputs**:

- `tableTitle`: string - Title of the list
- `addNewRecordLabel`: string - Label for add button
- `paginationInfo`: string - Pagination text (e.g., "1-10 of 50")
- `showAddNewRecordButton`: boolean - Show/hide add button
- `showFilterButton`: boolean - Show/hide filter button
- `showMapsButton`: boolean - Show/hide maps toggle button

**Outputs**:

- `search`: EventEmitter<string> - Emits search term
- `addNewRecord`: EventEmitter<void> - Emits when add button clicked
- `clickMaps`: EventEmitter<void> - Emits when maps button clicked

**Example**:

```html
<list-header
    tableTitle="{{ 'province.provinceList' | translate }}"
    addNewRecordLabel="{{ 'province.addNewProvince' | translate }}"
    [paginationInfo]="paginationInfo"
    [showMapsButton]="true"
    (search)="onSearch($event)"
    (addNewRecord)="openCreateDialog()"
    (clickMaps)="toggleMapView()"
/>
```

---

### 3. BaseFormHeaderComponent

**Purpose**: Standardized header for create/edit forms with action buttons.

**Location**: `src/app/shared/components/base-form-header/`

**Inputs**:

- `isLoading`: boolean - Shows loading state
- `isEditMode`: boolean - Differentiates between create/edit
- `isDisabled`: boolean - Disables action buttons

**Outputs**:

- `submit`: EventEmitter<void> - Emits on save/update
- `cancel`: EventEmitter<void> - Emits on cancel
- `remove`: EventEmitter<void> - Emits on delete

**Example**:

```html
<base-form-header
    [isLoading]="isLoading"
    [isEditMode]="isEditMode"
    [isDisabled]="form.invalid"
    (submit)="onSubmit()"
    (cancel)="onCancel()"
    (remove)="onDelete()"
/>
```

---

### 4. BaseComponent

**Purpose**: Abstract base class providing common functionality for all components.

**Location**: `src/app/shared/components/base-component/base-component.ts`

**Features**:

- Automatic dependency injection (Router, TranslateService, FormBuilder, etc.)
- Common utility methods
- Subscription management
- Toast notifications

**Usage**:

```typescript
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

export class UserListComponent extends BaseComponent implements OnInit {
    constructor() {
        super();
        // All dependencies are automatically injected
    }

    ngOnInit() {
        this.loadUsers();
    }

    deleteUser(id: string) {
        this.userService.delete(id).subscribe({
            next: () => {
                this.showSuccessMessage('User deleted successfully');
                this.navigateTo('/users/list');
            },
            error: () => this.showErrorMessage('Failed to delete user'),
        });
    }
}
```

**Available Methods**:

- `showMessage(message, title)` - Generic message
- `showSuccessMessage(message)` - Success toast
- `showErrorMessage(message)` - Error toast
- `navigateTo(url)` - Navigate to route
- `isActiveLink(route)` - Check if route is active

---

### 5. BaseListComponent

**Purpose**: Abstract base class for building list/grid pages with built-in pagination, search, filtering, and data loading capabilities. Extends `BaseComponent` to add list-specific functionality.

**Location**: `src/app/shared/components/base-list-component/base-list-component.ts`

**Type**: Generic `BaseListComponent<T>` where `T` is your model type

**Features**:

- ✅ Automatic pagination with page size and page number tracking
- ✅ Search functionality with debouncing
- ✅ Column definitions with automatic translation
- ✅ Loading state management
- ✅ Data fetching with error handling
- ✅ Lifecycle hooks for customization
- ✅ Subscription management (auto-cleanup on destroy)

**Abstract Methods** (must be implemented):

```typescript
// Define table columns
protected abstract getColumns(): colDef[];

// Fetch paginated data from your service
protected abstract fetchPage(): Observable<ApiResponseModel<PagedResponse<T>>>;
```

**Lifecycle Hooks** (optional to override):

```typescript
// Called after data is loaded
protected afterLoad(rows: T[]): void {}
```

**Built-in Properties**:

- `cols: colDef[]` - Table column definitions
- `rows: T[]` - Current page data
- `isLoading: boolean` - Loading state
- `paginationInfo: string` - Pagination text (e.g., "عرض 1 - 10 من 50")
- `criteria: CriteriaModel` - Search criteria (pageNumber, pageSize, searchTerm, totalCount)

**Built-in Methods**:

- `loadData()` - Fetch data using criteria
- `onPageChange(event)` - Handle page navigation
- `onFilterApplied()` - Reset to first page and reload
- `onSearch(searchTerm)` - Search and reset to first page
- `getRangeLabel()` - Generate pagination text

**Complete Example** (from UserListComponent):

```typescript
import { Component } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
})
export class UserListComponent extends BaseListComponent<UserModel> {
    showDialog: boolean = false;
    selectedUserId: number | null = null;
    showDeleteDialog: boolean = false;
    itemToDelete: number | null = null;

    constructor(private userService: UserService) {
        super(); // Call parent constructor
    }

    // Required: Define table columns
    protected override getColumns() {
        return [
            { field: 'firstname', title: 'users.firstname' },
            { field: 'lastname', title: 'users.lastname' },
            { field: 'militaryRank', title: 'users.militaryRank' },
            { field: 'age', title: 'users.age' },
            { field: 'dateOfBirthday', title: 'users.dateOfBirthday' },
            { field: 'actions', title: 'dataTable.actions', width: '150px' },
        ];
    }

    // Required: Fetch data from service
    protected override fetchPage() {
        return this.userService.getFakeList(this.criteria);
    }

    // Optional: Custom behavior after data loads
    protected override afterLoad(rows: UserModel[]): void {
        console.info(`Loaded ${rows.length} users`);
    }

    // Custom methods
    openCreateDialog() {
        this.selectedUserId = null;
        this.showDialog = true;
    }

    openEditDialog(id: number) {
        this.selectedUserId = id;
        this.showDialog = true;
    }

    removeUser(id: number) {
        this.itemToDelete = id;
        this.showDeleteDialog = true;
    }

    confirmDelete() {
        if (this.itemToDelete) {
            this.userService.deleteFakeUser(this.itemToDelete);
            this.showSuccessMessage(this.translate('validationMessages.userDeletedSuccess'));
            this.showDeleteDialog = false;
            this.itemToDelete = null;
            this.loadData(); // Reload data after delete
        }
    }

    onDialogSave() {
        this.loadData(); // Reload data after save
    }
}
```

**Template Example**:

```html
<main-content>
    <list-header
        [tableTitle]="'users.userList' | translate"
        [paginationInfo]="paginationInfo"
        (search)="onSearch($event)"
        (addNewRecord)="openCreateDialog()"
    />

    <ng-datatable
        [rows]="rows"
        [columns]="cols"
        [loading]="isLoading"
        [pagination]="true"
        [pageSize]="criteria.pageSize"
    >
        <ng-template slot="actions" let-value="data">
            <div class="flex gap-2">
                <div (click)="openEditDialog(value.id)">
                    <i class="pi pi-pencil"></i>
                </div>
                <div (click)="removeUser(value.id)">
                    <i class="pi pi-trash"></i>
                </div>
            </div>
        </ng-template>
    </ng-datatable>
</main-content>
```

**Lifecycle Flow**:

1. **`ngOnInit()`**
    - Calls `initializeCols()` → translates column titles
    - Calls `loadData()` → fetches first page
    - Subscribes to language changes → updates columns when language switches

2. **`loadData()`**
    - Sets `isLoading = true`
    - Calls `fetchPage()` with current criteria
    - Updates `rows` and `criteria.totalCount`
    - Calls `afterLoad(rows)` hook
    - Generates pagination label
    - Sets `isLoading = false`

3. **User Interaction**
    - Search: `onSearch(term)` → updates criteria, resets to page 1, reloads
    - Page change: `onPageChange(event)` → updates page number, reloads
    - Filter: `onFilterApplied()` → resets to page 1, reloads

4. **`ngOnDestroy()`**
    - Automatically unsubscribes from all subscriptions

**Benefits**:

- 🚀 **Rapid Development**: No need to rewrite pagination/search logic for every list
- 🔄 **Consistency**: All lists behave the same way
- 🌍 **i18n Ready**: Automatic column translation on language change
- 🧹 **Clean Code**: Reduces boilerplate by ~60 lines per list component
- 🐛 **Error Handling**: Centralized error handling with user-friendly messages
- 📊 **Type Safety**: Generic typing ensures compile-time safety

**Real-World Usage**:
Currently used in 9 list components across the application:

- `UserListComponent`
- `ProvinceListComponent`
- `RegionListComponent`
- `OrganizationListComponent`
- `LocationListComponent`
- `FieldSurveyListComponent`
- `EntityClassificationsListComponent`
- `LocationClassificationListComponent`

---

### 6. FileAttachmentsComponent

**Purpose**: Handle file uploads and attachments.

**Location**: `src/app/shared/components/file-attachments/`

---

### 7. LogsListComponent

**Purpose**: Display activity logs and audit trails.

**Location**: `src/app/shared/components/logs-list/`

---

### 8. PdfViewerComponent

**Purpose**: Display PDF documents inline.

**Location**: `src/app/shared/components/pdf-viewer/`

---

## Layouts System

The application uses a layout-based routing strategy with two main layouts:

### 1. AppLayout

**Purpose**: Main application layout with header, sidebar, and content area.

**Location**: `src/app/layouts/app-layout/`

**Features**:

- Responsive header
- Collapsible sidebar navigation
- Content area with routing outlet
- Scroll-to-top functionality

**Usage**: Wraps all authenticated routes

```typescript
{
    path: 'users',
    canActivate: [AuthGuard],
    component: AppLayout,  // <- Layout wrapper
    loadChildren: () => import('./modules/users/users.module')
}
```

---

### 2. AuthLayout

**Purpose**: Minimal layout for authentication pages.

**Location**: `src/app/layouts/auth-layout/`

**Features**:

- Centered content
- No header/sidebar
- Clean authentication UI

**Usage**: Wraps authentication routes

```typescript
{
    path: 'auth',
    component: AuthLayout,  // <- Auth layout
    loadChildren: () => import('./modules/auth/auth.module')
}
```

---

### 3. Dashboard

**Location**: `src/app/layouts/dashboard/`

**Purpose**: Landing page after authentication showing key metrics and quick actions.

---

### 4. Header Component

**Location**: `src/app/layouts/header/`

**Features**:

- User profile dropdown
- Language switcher (AR/EN)
- Notifications
- Breadcrumbs

---

### 5. Sidebar Component

**Location**: `src/app/layouts/sidebar/`

**Features**:

- Hierarchical navigation menu
- Active route highlighting
- Collapsible sections
- Role-based menu visibility

---

## Shared Module

The `SharedModule` exports commonly used components, directives, pipes, and services to be imported by feature modules.

**Location**: `src/app/shared/shared.module.ts`

### Exported Components

- `MainContentComponent`
- `ListHeaderComponent`
- `BaseFormHeaderComponent`
- `ConfirmDeleteComponent`
- `FileAttachmentsComponent`
- `LogsListComponent`
- `PdfViewerComponent`

### Exported Directives

- `LoadingDirective` - Shows loading spinner
- `ButtonBusyDirective` - Disables button during async operations

### Exported Pipes

- `SafePipe` - Sanitizes HTML/URLs

### Re-exported Modules

- `FormsModule`
- `ReactiveFormsModule`
- `TranslateModule`
- PrimeNG modules (Dialog, Table, Button, etc.)
- `DataTableModule`

**Usage in Feature Module**:

```typescript
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule, // <- Import once, get everything
    ],
    declarations: [
        /* module components */
    ],
})
export class MyFeatureModule {}
```

---

## State Management

The application uses **NgRx Store** for centralized state management.

**Location**: `src/app/store/`

### Store Structure

```typescript
// index.reducer.ts
import { createReducer } from '@ngrx/store';

export const indexReducer = createReducer(
    // Initial state
    {
        user: null,
        theme: 'light',
        language: 'ar',
        // ... other state
    },
);
```

### Usage in Components

```typescript
import { Store } from '@ngrx/store';

export class MyComponent {
    constructor(private store: Store<any>) {
        // Subscribe to state changes
        this.store.subscribe((state) => {
            console.info('Current user:', state.user);
        });
    }
}
```

---

### Signals Store (Alternative)

In addition to NgRx, a lightweight signal-based store is available for local UI state using Angular Signals.

**Location**: `src/app/store/ui.signal.store.ts`

**API Overview**:

```typescript
import { UiSignalStore } from 'src/app/store/ui.signal.store';

export class HeaderComponent {
    constructor(private ui: UiSignalStore) {}

    readonly theme = this.ui.theme; // computed signal
    readonly sidebar = this.ui.sidebar; // computed signal

    toggleDark() {
        this.ui.toggleTheme('dark');
    }
    toggleSidebar() {
        this.ui.toggleSidebar();
    }
}
```

The signal store mirrors the reducer actions: `toggleTheme`, `toggleMenu`, `toggleLayout`, `toggleRTL`, `toggleNavbar`, `toggleLocale`, `toggleSidebar`, `toggleSemidark`, `toggleAnimation`, and `toggleDirection`. It also persists relevant values to `localStorage` and updates the DOM (`html[dir]`, `body.dark`) to match existing behavior.

Use the signals store for component-local or UI-centric state where NgRx may be too heavy, while keeping NgRx for app-wide data and effects.

---

## Routing Strategy

### Route Protection

Routes are protected using `AuthGuard`:

```typescript
{
    path: 'users',
    canActivate: [AuthGuard],  // <- Requires authentication
    component: AppLayout,
    loadChildren: () => import('./modules/users/users.module')
}
```

### Lazy Loading

All feature modules are lazy-loaded for optimal performance:

```typescript
loadChildren: () => import('./modules/users/users.module').then((m) => m.UsersModule);
```

### Common Route Patterns

**List Route**: `/module-name/list`

```typescript
{ path: 'list', component: ModuleListComponent }
```

**Create Route**: `/module-name/create`

```typescript
{ path: 'create', component: ModuleViewComponent }
```

**Edit Route**: `/module-name/edit/:id`

```typescript
{ path: 'edit/:id', component: ModuleViewComponent }
```

---

## Best Practices

### 1. Module Organization

- Each feature has its own module
- Modules are self-contained and lazy-loaded
- Shared functionality goes in `SharedModule`

### 2. Component Design

- Extend `BaseComponent` for common functionality
- Use generic components (`main-content`, `list-header`) for consistency
- Keep components focused and single-purpose

### 3. Naming Conventions

- Components: `kebab-case.component.ts`
- Modules: `kebab-case.module.ts`
- Services: `kebab-case.service.ts`
- Models: `kebab-case.model.ts`

### 4. Template Structure

**List Page Pattern**:

```html
<p-breadcrumb [model]="breadcrumbItems" />

<main-content>
    <list-header
        [tableTitle]="title"
        [paginationInfo]="paginationInfo"
        (search)="onSearch($event)"
        (addNewRecord)="openCreateDialog()"
    />

    <ng-datatable [rows]="rows" [columns]="cols" [loading]="isLoading">
        <ng-template slot="actions" let-value="data">
            <!-- Action buttons -->
        </ng-template>
    </ng-datatable>
</main-content>
```

**Form Page Pattern**:

```html
<p-breadcrumb [model]="breadcrumbItems" />

<main-content>
    <base-form-header
        [isEditMode]="isEditMode"
        [isLoading]="isLoading"
        (submit)="onSubmit()"
        (cancel)="onCancel()"
    />

    <form [formGroup]="form">
        <!-- Form fields -->
    </form>
</main-content>
```

### 5. Service Patterns

**CRUD Service Example**:

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {}

    getAll(criteria: SearchCriteria): Observable<PagedResult<User>> {
        return this.http.post<PagedResult<User>>(API_URLS.USERS.SEARCH, criteria);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${API_URLS.USERS.BASE}/${id}`);
    }

    create(user: User): Observable<User> {
        return this.http.post<User>(API_URLS.USERS.BASE, user);
    }

    update(id: string, user: User): Observable<User> {
        return this.http.put<User>(`${API_URLS.USERS.BASE}/${id}`, user);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${API_URLS.USERS.BASE}/${id}`);
    }
}
```

### 6. Internationalization

Use translation keys consistently:

```html
{{ 'users.userList' | translate }} {{ 'buttons.save' | translate }} {{ 'messages.confirmDelete' |
translate }}
```

Translation files located in: `src/assets/i18n/`

- `ar.json` - Arabic translations
- `en.json` - English translations

### 7. Error Handling

Use `BaseComponent` methods for consistent error handling:

```typescript
this.userService.delete(id).subscribe({
    next: () => this.showSuccessMessage('User deleted'),
    error: (err) => this.showErrorMessage(err.message),
});
```

---

## Summary

This modular architecture provides:

✅ **Scalability**: Easy to add new features as modules  
✅ **Maintainability**: Clear separation of concerns  
✅ **Reusability**: Generic components reduce code duplication  
✅ **Consistency**: Standardized patterns across the application  
✅ **Performance**: Lazy loading and optimized bundle sizes  
✅ **Developer Experience**: Clear structure and conventions

By following these patterns and utilizing the generic components, developers can quickly build new features with a consistent look and feel while maintaining code quality and best practices.
