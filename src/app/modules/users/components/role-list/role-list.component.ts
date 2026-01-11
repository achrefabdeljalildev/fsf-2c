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

        // Load full menus, then role-allowed items to preselect
        this.menuService.getMenusTree().subscribe({
            next: (res) => {
                this.treeNodes = res.data.items.map((m) => this.mapMenuToNode(m));
                // Fetch allowed permissions for the role and preselect
                this.menuService.getRoleAllowedMenus(role.id).subscribe({
                    next: (allowedRes) => {
                        this.selectedNodes = this.extractAllowedNodesFromRole(
                            allowedRes.data.items,
                        );

                        this.loadingPermissions = false;
                    },
                    error: (err) => {
                        console.error('Error loading role allowed menus:', err);
                        // Fall back to no preselection on error
                        this.selectedNodes = [];
                        this.loadingPermissions = false;
                    },
                });
            },
            error: (err) => {
                console.error('Error loading menus:', err);
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
                id: f.menuFormId,
                code: f.formCode,
                url: f.url,
                isAllowed: f.isAllowed,
            },
            selectable: true,
        }));

        const menuChildren = (menu.children || []).map((c) => this.mapMenuToNode(c));

        return {
            key: `menu-${menu.menuId}`,
            label: menu.menuName,
            data: {
                type: 'menu',
                id: menu.menuId,
                icon: menu.menuIcon,
                url: menu.url,
                isAllowed: menu.isAllowed,
            },
            selectable: true,
            children: [...formChildren, ...menuChildren],
        };
    }

    private extractAllowedNodes(menus: MenuDto[]): any[] {
        const allowed: any[] = [];
        const collect = (nodes: MenuDto[]) => {
            nodes.forEach((node) => {
                if (node.isAllowed) {
                    allowed.push(`menu-${node.menuId}`);
                }
                if (node.forms) {
                    node.forms.forEach((f) => {
                        if (f.isAllowed) {
                            allowed.push(`form-${f.menuFormId}`);
                        }
                    });
                }
                if (node.children && node.children.length > 0) {
                    collect(node.children);
                }
            });
        };
        collect(menus);
        return allowed;
    }

    private extractAllowedNodesFromRole(menus: MenuDto[]): any[] {
        // In /Menus/{roleId}, any element present is allowed
        const allowedKeys: any[] = [];
        const traverse = (nodes: MenuDto[]) => {
            nodes.forEach((node) => {
                allowedKeys.push(`menu-${node.menuId}`);

                if (node.forms) {
                    node.forms.forEach((f) => {
                        allowedKeys.push(`form-${f.menuFormId}`);
                    });
                }

                if (node.children && node.children.length > 0) {
                    traverse(node.children);
                }
            });
        };

        traverse(menus);
        console.log(allowedKeys);

        return allowedKeys;
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
            if (!node || !node.data || node.data.type !== 'menu') return;

            const isMenuSelected = this.selectedNodes.some((s) => {
                return typeof s === 'object' && s.key === node.key;
            });

            const forms: any[] = [];

            if (node.children && node.children.length) {
                node.children.forEach((child: any) => {
                    if (child.data?.type === 'form') {
                        const isFormSelected = this.selectedNodes.some((s) => {
                            return typeof s === 'object' && s.key === child.key;
                        });

                        if (isFormSelected) {
                            forms.push({
                                menuFormId: child.data.id,
                                isAllowed: true,
                            });
                        }
                    } else if (child.data?.type === 'menu') {
                        // Recursively process nested menus; they will be added separately
                        processMenuNode(child);
                    }
                });
            }

            // Include this menu only if it's selected or any of its forms are selected
            if (isMenuSelected || forms.length > 0) {
                menus.push({
                    menuId: node.data.id,
                    isAllowed: isMenuSelected,
                    forms,
                });
            }
        };

        this.treeNodes.forEach(processMenuNode);

        return {
            menus: {
                roleId: this.selectedRole?.id || 0,
                menus,
            },
        };
    }
}
