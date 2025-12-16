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

// App - services
import { AppService } from 'src/app/shared/services/app.service';

// App - directives
import { LoadingDirective } from 'src/app/shared/directives/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/directives/button-busy.directive';

// App - components
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';

// App - pipes
import { SafePipe } from './pipes/safe.pipe';

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
    ],
    declarations: [
        // pipes
        SafePipe,

        // components
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
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

        // components
        PdfViewerComponent,
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
