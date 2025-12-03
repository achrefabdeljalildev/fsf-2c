import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// flatpicker
import { FlatpickrModule } from 'angularx-flatpickr';
// quill editor
import { QuillModule } from 'ngx-quill';
// service
import { AppService } from 'src/app/service/app.service';
// i18n
import { TranslateModule } from '@ngx-translate/core';
// perfect-scrollbar
import { NgScrollbarModule, provideScrollbarOptions } from 'ngx-scrollbar';
// headlessui
import { MenuModule as HeadlessUIMenuModule } from 'headlessui-angular';

import { MenuModule } from 'primeng/menu';
// datatable
import { DataTableModule } from '@bhplugin/ng-datatable';
// apexchart
import { NgApexchartsModule } from 'ng-apexcharts';

// select
import { NgSelectModule } from '@ng-select/ng-select';
// modal
import { NgxCustomModalComponent } from 'ngx-custom-modal';
// sortable
import { SortablejsModule } from '@dustfoundation/ngx-sortablejs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';
import { RatingModule } from 'primeng/rating';
import { SkeletonModule } from 'primeng/skeleton';
import { LoadingDirective } from 'src/app/shared/app-loader/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/button-loader/button-busy.directive';
import { HijriDatepickerComponent } from './components/hijri-datepicker/hijri-datepicker.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { SafePipe } from './pipes/safe.pipe';
import { MuiBreadcrumbComponent } from 'src/app/modules/shared/components/mui-breadcrumb/mui-breadcrumb.component';
import { ImageModule } from 'primeng/image';
import { PdfViewerComponent } from 'src/app/modules/shared/components/pdf-viewer/pdf-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        TranslateModule.forChild(),
        NgScrollbarModule,
        MenuModule,
        HeadlessUIMenuModule,
        DataTableModule,
        ConfirmDialogModule,
        DialogModule,
        NgSelectModule,
        FlatpickrModule.forRoot(),
        QuillModule.forRoot(),
        NgxCustomModalComponent,
        SortablejsModule,
        DataViewModule,
        SkeletonModule,
        GalleriaModule,
        ButtonModule,
        NgApexchartsModule,
        ImageModule,
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
        DataViewModule,
        SkeletonModule,
        GalleriaModule,
        ButtonModule,
        RatingModule,
        NgApexchartsModule,
        ConfirmDialogModule,
        DialogModule,
        // modules
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        NgScrollbarModule,
        MenuModule,
        HeadlessUIMenuModule,
        DataTableModule,
        NgSelectModule,
        FlatpickrModule,
        QuillModule,
        NgxCustomModalComponent,
        SortablejsModule,
        DataViewModule,
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
