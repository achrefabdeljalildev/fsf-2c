import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
    BreadcrumbItem,
    BreadcrumbService,
} from 'src/app/modules/shared/components/mui-breadcrumb/breadcrumb.service';

@Component({
    selector: 'mui-breadcrumb',
    template: `
        <ol class="breadcrumb flex flex-wrap text-sm md:text-base p-4">
            <ng-container *ngFor="let item of items$ | async; let last = last">
                <li class="flex items-center">
                    <ng-container *ngIf="!last; else plainText">
                        <a
                            [routerLink]="item.route"
                            class="text-primary hover:underline font-regular"
                        >
                            {{ item.label | translate }}
                        </a>
                    </ng-container>

                    <ng-template #plainText>
                        <span class="font-bold">
                            {{ item.label | translate }}
                        </span>
                    </ng-template>

                    <span *ngIf="!last" class="mx-2 text-primary font-bold">
                        {{ separator }}
                    </span>
                </li>
            </ng-container>
        </ol>
    `,
})
export class MuiBreadcrumbComponent {
    items$: Observable<BreadcrumbItem[]> = this.breadcrumbService.items$;

    @Input() separator: string = '>';

    constructor(private breadcrumbService: BreadcrumbService) {}
}
