import { Component } from '@angular/core';
import { colDef } from '@bhplugin/ng-datatable';
import { Observable } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component/base-list-component';
import { ApiResponseModel, PagedResponse } from 'src/app/shared/models/base/paged-response.model';
import { RoleModel } from '../../models/role.model';
import { MenuDto, MenuService } from '../../services/menu.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    standalone: false,
})
export class RoleListComponent extends BaseListComponent<RoleModel> {
    showDialog: boolean = false;
    showPermissionsDialog: boolean = false;
    selectedRole: RoleModel | null = null;

    // Permissions tree
    treeNodes: any[] = [];
    selectedNodes: any[] = [];
    loadingPermissions: boolean = false;
    saveLoadingPermissions: boolean = false;

    constructor(
        private userService: UserService,
        private menuService: MenuService,
    ) {
        super();
    }

    protected override getColumns(): colDef[] {
        return [
            { field: 'name', title: 'formLabels.name' },
            { field: 'actions', title: 'dataTable.actions', width: '120px' },
        ];
    }

    protected override fetchPage(): Observable<ApiResponseModel<PagedResponse<RoleModel>>> {
        return this.userService.getRoles(this.criteria);
    }

    openCreateDialog() {
        this.selectedRole = null;
        this.showDialog = true;
    }

    openEditDialog(role: RoleModel) {
        this.selectedRole = role;
        this.showDialog = true;
    }

    onDialogSave() {
        this.loadData();
        this.selectedRole = null;
    }

    openPermissionsDialog(role: RoleModel) {
        this.selectedRole = role;
        this.showPermissionsDialog = true;
        this.loadingPermissions = true;
        this.selectedNodes = [];

        // Load role-specific permissions (already filtered by backend)
        this.menuService.getRoleAllowedMenus(role.id).subscribe({
            next: (allowedRes) => {
                // Transform the role's allowed menus to tree nodes
                this.treeNodes = allowedRes.data.items.map((m) => this.mapMenuToNode(m));
                // Pre-select all allowed items
                this.selectedNodes = this.extractAllowedNodes(this.treeNodes);
                // Expand parents if any descendant is selected
                this.expandSelectedPaths(this.treeNodes);
                this.loadingPermissions = false;
            },
            error: (err) => {
                console.error('Error loading role allowed menus:', err);
                this.selectedNodes = [];
                this.loadingPermissions = false;
            },
        });
    }

    private mapMenuToNode(menu: MenuDto): any {
        const formChildren = (menu.forms || []).map((f) => ({
            key: `form-${f.menuFormId}`,
            label: f.formName,
            data: {
                type: 'form',
                ...f, // Store complete form data
            },
            selectable: true,
        }));

        const menuChildren = (menu.children || []).map((c) => this.mapMenuToNode(c));

        return {
            key: `menu-${menu.menuId}`,
            label: menu.menuName,
            data: {
                type: 'menu',
                ...menu, // Store complete menu data
                forms: undefined, // Remove forms from data to avoid duplication
                children: undefined, // Remove children from data to avoid duplication
            },
            selectable: true,
            children: [...formChildren, ...menuChildren],
        };
    }

    private extractAllowedNodes(treeNodes: any[]): any[] {
        const allowed: any[] = [];
        const collect = (nodes: any[]) => {
            nodes.forEach((node) => {
                // Check if this node is allowed based on its data
                if (node.data?.isAllowed) {
                    allowed.push(node);
                }
                // Recursively collect from children
                if (node.children && node.children.length > 0) {
                    collect(node.children);
                }
            });
        };
        collect(treeNodes);
        return allowed;
    }

    private expandSelectedPaths(nodes: any[]): boolean {
        let hasSelectedDescendant = false;

        nodes.forEach((node) => {
            // Check if current node is selected
            const isNodeSelected = this.selectedNodes.some((s) => s.key === node.key);

            // Recurse into children
            const childHasSelection = node.children?.length
                ? this.expandSelectedPaths(node.children)
                : false;

            // Expand node if selected or any child is selected
            node.expanded = isNodeSelected || childHasSelection;

            if (node.expanded) {
                hasSelectedDescendant = true;
            }
        });

        return hasSelectedDescendant;
    }

    savePermissions() {
        if (!this.selectedRole) return;
        this.saveLoadingPermissions = true;

        // Build allowed items list from selection
        const payload = this.buildAllowedItems();

        this.menuService.createRolePermissions(payload).subscribe({
            next: () => {
                this.showPermissionsDialog = false;
                this.saveLoadingPermissions = false;
                this.showSuccessMessage('validationMessages.roleUpdatedSuccess');
            },
            error: (err) => {
                console.error('Error saving permissions:', err);
                this.saveLoadingPermissions = false;
                this.showErrorMessage('validationMessages.roleErrorUpdate');
            },
        });
    }

    private buildAllowedItems(): any {
        const menus: any[] = [];

        const processMenuNode = (node: any) => {
            if (!node || !node.data || node.data.type !== 'menu') return null;

            const isMenuSelected = this.selectedNodes.some((s) => s.key === node.key);

            const forms: any[] = [];
            const childMenus: any[] = [];

            if (node.children && node.children.length) {
                node.children.forEach((child: any) => {
                    if (child.data?.type === 'form') {
                        const isFormSelected = this.selectedNodes.some((s) => s.key === child.key);
                        forms.push({
                            menuFormId: child.data.menuFormId,
                            isAllowed: isFormSelected,
                        });
                    } else if (child.data?.type === 'menu') {
                        const childMenuResult = processMenuNode(child);
                        if (childMenuResult) {
                            childMenus.push(childMenuResult);
                        }
                    }
                });
            }

            const menuItem: any = {
                menuId: node.data.menuId,
                isAllowed: isMenuSelected,
            };

            // Always add forms array, even if empty
            if (forms.length > 0) {
                menuItem.forms = forms;
            }

            // Always add children array, even if empty
            if (childMenus.length > 0) {
                menuItem.children = childMenus;
            }

            return menuItem;
        };

        this.treeNodes.forEach((node) => {
            const result = processMenuNode(node);
            if (result) {
                menus.push(result);
            }
        });

        return {
            menus: {
                roleId: this.selectedRole?.id || 0,
                menus,
            },
        };
    }
}
