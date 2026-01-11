// Angular
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

// 3rd party
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DataTableModule } from '@bhplugin/ng-datatable';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';

// App - services
import { AppService } from 'src/app/shared/services/app.service';

// App - directives
import { LoadingDirective } from 'src/app/shared/directives/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/directives/button-busy.directive';

// App - pipes
import { SafePipe } from './pipes/safe.pipe';

// App - components
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';
import { BaseFormHeaderComponent } from 'src/app/shared/components/base-form-header/base-form-header.component';
import { ListHeaderComponent } from 'src/app/shared/components/list-header/list-header.component';
import { FileAttachmentsComponent } from 'src/app/shared/components/file-attachments/file-attachments.component';
import { LogsListComponent } from 'src/app/shared/components/logs-list/logs-list.component';
import { MainContentComponent } from 'src/app/shared/components/main-content/main-content.component';

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
        TagModule,
    ],
    declarations: [
        // pipes
        SafePipe,

        // components
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
        BaseFormHeaderComponent,
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

        // components
        PdfViewerComponent,
        BaseFormHeaderComponent,
        DataTableModule,
        ListHeaderComponent,
        LogsListComponent,
        DialogModule,
        FileAttachmentsComponent,
        MainContentComponent,
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
