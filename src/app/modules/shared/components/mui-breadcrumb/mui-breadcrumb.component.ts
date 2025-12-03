import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

export interface BreadcrumbItem {
    label: string;
    route?: string;
}

@Component({
    selector: 'mui-breadcrumb',
    template: `<ol class="breadcrumb flex flex-wrap text-sm md:text-base my-2">
        <ng-container *ngFor="let item of items; let last = last">
            <li class="flex items-center">
                <ng-container *ngIf="!last; else plainText">
                    <a [routerLink]="item.route" class="text-primary hover:underline font-bold">
                        {{ item.label | translate }}
                    </a>
                </ng-container>
                <ng-template #plainText>
                    <span class="font-bold">{{ item.label | translate }}</span>
                </ng-template>
                <span *ngIf="!last" class="mx-2 text-primary font-bold">{{ separator }}</span>
            </li>
        </ng-container>
    </ol> `,
})
export class MuiBreadcrumbComponent {
    @Input() items: BreadcrumbItem[] = [];
    @Input() separator: string = '/';
}
