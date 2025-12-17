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

// App - services
import { AppService } from 'src/app/shared/services/app.service';

// App - directives
import { LoadingDirective } from 'src/app/shared/directives/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/directives/button-busy.directive';

// App - pipes
import { SafePipe } from './pipes/safe.pipe';

// App - components
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';
import {
    BaseDatatableComponent,
    BaseDatatableColumnDirective,
} from 'src/app/shared/components/base-datatable/base-datatable.component';

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
    ],
    declarations: [
        // pipes
        SafePipe,

        // components
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
        BaseDatatableComponent,
        BaseDatatableColumnDirective,
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

        // directives
        BaseDatatableColumnDirective,

        // components
        PdfViewerComponent,
        BaseDatatableComponent,
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [Title, AppService],
        };
    }
}
