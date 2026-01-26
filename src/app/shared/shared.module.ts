// Angular
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// 3rd party
import { DataTableModule } from '@bhplugin/ng-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { TreeModule } from 'primeng/tree';

// App - services
import { AppService } from 'src/app/shared/services/app.service';

// App - directives
import { LoadingDirective } from 'src/app/shared/directives/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/directives/button-busy.directive';

// App - pipes
import { SafePipe } from './pipes/safe.pipe';

// App - components
import { FlatpickrDirective } from 'angularx-flatpickr';
import { BaseFormHeaderComponent } from 'src/app/shared/components/base-form-header/base-form-header.component';
import { BaseInputComponent } from 'src/app/shared/components/base-input-component/base-input.component';
import { FileAttachmentsComponent } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { ListFilterComponent } from 'src/app/shared/components/list-filter/list-filter.component';
import { ListHeaderComponent } from 'src/app/shared/components/list-header/list-header.component';
import { LogsListComponent } from 'src/app/shared/components/logs-list/logs-list.component';
import { MainContentComponent } from 'src/app/shared/components/main-content/main-content.component';
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forChild(),
        RouterModule,
        ConfirmDialogModule,
        SkeletonModule,
        BreadcrumbModule,
        TableModule,
        PaginatorModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        DataTableModule,
        DialogModule,
        TreeModule,
        ContextMenuModule,
        TagModule,
        CheckboxModule,
        SelectModule,
        MultiSelectModule,
        FlatpickrDirective,
    ],
    declarations: [
        // pipes
        SafePipe,

        // components
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
        BaseFormHeaderComponent,
        BaseInputComponent,
        ListFilterComponent,
        ListHeaderComponent,
        FileAttachmentsComponent,
        LogsListComponent,
        MainContentComponent,
    ],
    exports: [
        // pipes
        SafePipe,

        // modules
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        SkeletonModule,
        ConfirmDialogModule,
        LoadingDirective,
        ButtonBusyDirective,
        NgxSpinnerModule,
        BreadcrumbModule,
        TableModule,
        InputTextModule,
        TextareaModule,
        ButtonModule,
        TagModule,
        TreeModule,
        ContextMenuModule,
        CheckboxModule,
        SelectModule,
        MultiSelectModule,

        // components
        PdfViewerComponent,
        BaseFormHeaderComponent,
        BaseInputComponent,
        ListFilterComponent,
        DataTableModule,
        ListHeaderComponent,
        LogsListComponent,
        DialogModule,
        FileAttachmentsComponent,
        MainContentComponent,
        FlatpickrDirective,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [Title, AppService, ConfirmationService],
        };
    }
}
