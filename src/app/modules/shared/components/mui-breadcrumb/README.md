# 📚 MuiBreadcrumbComponent

A reusable Angular component for displaying **breadcrumb navigation** in your application.
It automatically builds breadcrumbs from your application's stored menu structure (from `localStorage`) or accepts manually provided breadcrumb items.

---

## 📦 Installation

Include the component in your Angular project:

1. Place the `mui-breadcrumb.component.ts` file inside your shared/components folder.
2. Declare it in the desired Angular module:

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MuiBreadcrumbComponent } from './mui-breadcrumb.component';

@NgModule({
    declarations: [MuiBreadcrumbComponent],
    imports: [CommonModule, RouterModule],
    exports: [MuiBreadcrumbComponent],
})
export class SharedModule {}
```

3. Ensure `RouterModule` is imported because the component uses Angular's router for navigation.

---

## ⚙️ Inputs

| Input            | Type               | Description                                                                                             |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `items`          | `BreadcrumbItem[]` | Optional. If provided, this completely **overrides all other breadcrumb sources** (menus, routes, etc.) |
| `baseModulePath` | `string`           | Optional. If provided, it will be used as the base path instead of the current `router.url`             |
| `extraPath`      | `string`           | Optional. Appends an additional breadcrumb item as a **final label** (no route)                         |

### `BreadcrumbItem` Interface

```ts
export interface BreadcrumbItem {
    label: string;
    route?: string; // Optional route for clickable breadcrumb
}
```

---

## 🔑 Features

-   ✅ **Automatic Breadcrumb Generation**
    Uses the current route and the `menus` stored in `localStorage` to generate breadcrumbs.

-   ✅ **Manual Override**
    Pass `items` to the component to override the automatic breadcrumb generation.

-   ✅ **Custom Base Path**
    Use `baseModulePath` to start the breadcrumb from a different module path.

-   ✅ **Extra Path**
    Append a single custom breadcrumb label to the generated breadcrumb.

-   ✅ **Responsive and Accessible**
    Uses Tailwind classes for styling and supports translations (`| translate` pipe).

---

## 💾 How Menus Work

The component expects a `menus` JSON object stored in `localStorage` with the following structure:

```json
[
    {
        "name": "Dashboard",
        "route": "/dashboard",
        "children": [
            {
                "name": "Reports",
                "route": "/dashboard/reports",
                "children": [{ "name": "Monthly", "route": "/dashboard/reports/monthly" }]
            }
        ]
    },
    {
        "name": "Settings",
        "route": "/settings"
    }
]
```

> ⚠️ The component **recursively traverses the `menus` tree** to find the breadcrumb path for the current route.

---

## 🚀 Usage

### 1. Default Automatic Breadcrumb

Breadcrumbs are generated based on the current router URL and `menus` in localStorage.

```html
<mui-breadcrumb></mui-breadcrumb>
```

---

### 2. Specify a Base Module Path

Use a fixed starting point for breadcrumbs.

```html
<mui-breadcrumb [baseModulePath]="'/dashboard'"></mui-breadcrumb>
```

---

### 3. Add an Extra Path

Append an extra label after the generated breadcrumbs.

```html
<mui-breadcrumb [extraPath]="'Details'"></mui-breadcrumb>
```

Example result:

```
Home / Dashboard / Reports / Details
```

---

### 4. Override All with Items

Provide custom breadcrumb items to fully control the breadcrumb.

```html
<mui-breadcrumb
    [items]="[
    { label: 'Home', route: '/' },
    { label: 'Profile', route: '/profile' },
    { label: 'Edit' }
  ]"
></mui-breadcrumb>
```

Result:

```
Home / Profile / Edit
```

> ⚠️ When `items` is provided, `baseModulePath` and `extraPath` are ignored.

---

## 🎨 Styling

The component uses Tailwind CSS classes:

-   `text-primary` → Highlights active links.
-   `font-bold` → Emphasizes breadcrumb text.
-   `hover:underline` → Adds hover underline for links.
-   Responsive font sizes: `text-sm` (mobile) and `text-base` (desktop).

You can adjust these classes in the component template to fit your design system.

---

## 🔄 Lifecycle Hooks

-   `ngOnInit()`

    -   Loads `menus` from `localStorage`.
    -   Sets up a listener for `NavigationEnd` to update breadcrumbs on route change.

-   `ngOnChanges()`

    -   Updates breadcrumbs when input properties change.

---

## 🛠️ Example Menus + Routing Setup

```ts
localStorage.setItem(
    'menus',
    JSON.stringify([
        { name: 'Home', route: '/' },
        {
            name: 'Dashboard',
            route: '/dashboard',
            children: [
                { name: 'Reports', route: '/dashboard/reports' },
                { name: 'Analytics', route: '/dashboard/analytics' },
            ],
        },
    ]),
);
```

Routing example:

```ts
const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/reports', component: ReportsComponent },
];
```

---

## ⚡ Notes

-   If `menus` does not contain a matching route for the current URL, breadcrumbs will be empty unless you provide `items` or `extraPath`.
-   Ensure translations for breadcrumb labels exist if using the `| translate` pipe.
-   The component assumes all routes in `menus` start with `/`.
