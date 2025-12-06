import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';

// service
import { AppService } from 'src/app/service/app.service';
// i18n
import { TranslateModule } from '@ngx-translate/core';
// perfect-scrollbar
import { provideScrollbarOptions } from 'ngx-scrollbar';

// headlessui
import { MenuModule as HeadlessUIMenuModule } from 'headlessui-angular';

import { MenuModule } from 'primeng/menu';
// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';

// modal
import { NgxCustomModalComponent } from 'ngx-custom-modal';
// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { LoadingDirective } from 'src/app/shared/app-loader/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/button-loader/button-busy.directive';
import { HijriDatepickerComponent } from './components/hijri-datepicker/hijri-datepicker.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { SafePipe } from './pipes/safe.pipe';
import { MuiBreadcrumbComponent } from 'src/app/modules/shared/components/mui-breadcrumb/mui-breadcrumb.component';
import { PdfViewerComponent } from 'src/app/modules/shared/components/pdf-viewer/pdf-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forChild(),
        MenuModule,
        HeadlessUIMenuModule,
        DataTableModule,
        ConfirmDialogModule,
        FlatpickrModule.forRoot(),
        NgxCustomModalComponent,
        SortablejsModule,
        SkeletonModule,
        ButtonModule,
    ],
    declarations: [
        // components
        HijriDatepickerComponent,
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
        //modals
        ConfirmModalComponent,
        SafePipe,
        MuiBreadcrumbComponent,
    ],
    exports: [
        // components
        HijriDatepickerComponent,
        PdfViewerComponent,
        //modals
        ConfirmModalComponent,
        SkeletonModule,
        ButtonModule,
        ConfirmDialogModule,
        // modules
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MenuModule,
        HeadlessUIMenuModule,
        DataTableModule,
        FlatpickrModule,
        NgxCustomModalComponent,
        SortablejsModule,
        SortablejsModule,
        SafePipe,
        LoadingDirective,
        ButtonBusyDirective,
        NgxSpinnerModule,
        MuiBreadcrumbComponent,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                Title,
                AppService,
                provideScrollbarOptions({
                    visibility: 'hover',
                    appearance: 'compact',
                }),
            ],
        };
    }
}
