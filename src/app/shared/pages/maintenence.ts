import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-maintenance',
    template: `
        <div
            class="panel h-[calc(100vh-170px)] max-h-[calc(100vh-170px)] overflow-y-auto bg-lightBlue flex flex-col items-center justify-center"
        >
            <div class="text-center p-2 ">
                <div class="flex items-center justify-center mb-4">
                    <i class="pi pi-wrench text-primary text-6xl"></i>
                </div>

                <h2 class="text-4xl font-bold text-primary dark:text-white mb-4">
                    {{ 'maintenance.title' | translate }}
                </h2>

                <h4 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
                    {{ 'maintenance.thankYou' | translate }}
                </h4>

                <div class="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                    <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ 'maintenance.message' | translate }}
                    </p>
                    <p class="text-base text-gray-600 dark:text-gray-300 mt-4">
                        {{ 'maintenance.pleaseVisit' | translate }}
                    </p>
                </div>

                <div class="flex justify-center gap-4 mt-8">
                    <button
                        type="button"
                        class="btn btn-primary flex items-center gap-2"
                        (click)="goToHome()"
                    >
                        <i class="pi pi-home"></i>
                        <span>{{ 'maintenance.goHome' | translate }}</span>
                    </button>
                </div>
            </div>
        </div>
    `,
    standalone: false,
})
export class MaintenenceComponent {
    store: any = { theme: 'light', isDarkMode: false }; // Default fallback values

    constructor(
        public router: Router,
        public storeData: Store<any>,
        public translate: TranslateService,
    ) {
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

    goToHome() {
        this.router.navigate(['/']);
    }
}
