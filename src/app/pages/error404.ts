import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
    templateUrl: './error404.html',
})
export class Error404Component {
    store: any = { theme: 'light', isDarkMode: false }; // Default fallback values

    constructor(public router: Router, public storeData: Store<any>) {
        this.initStore();
    }

    initStore() {
        this.storeData
            .select((state) => state.index)
            .subscribe({
                next: (indexState) => {
                    this.store = indexState || this.store;
                },
                error: (err) => {
                    console.error('Error selecting store state:', err);
                },
            });
    }
}
