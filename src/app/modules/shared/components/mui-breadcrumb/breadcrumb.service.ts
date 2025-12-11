// breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface BreadcrumbItem {
    label: string;
    route?: string;
}

@Injectable({
    providedIn: 'root', // global
})
export class BreadcrumbService {
    private readonly _items$ = new BehaviorSubject<BreadcrumbItem[]>([]);

    // Expose as readonly observable
    readonly items$: Observable<BreadcrumbItem[]> = this._items$.asObservable();

    set(items: BreadcrumbItem[]): void {
        this._items$.next(items);
    }

    clear(): void {
        this._items$.next([]);
    }

    // Optional helpers
    add(item: BreadcrumbItem): void {
        this._items$.next([...this._items$.value, item]);
    }

    removeLast(): void {
        const current = this._items$.value;
        this._items$.next(current.slice(0, -1));
    }
}
