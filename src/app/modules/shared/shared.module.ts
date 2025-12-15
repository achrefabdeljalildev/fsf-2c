import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// service
import { AppService } from 'src/app/service/app.service';
// i18n
import { TranslateModule } from '@ngx-translate/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { LoadingDirective } from 'src/app/shared/app-loader/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/button-loader/button-busy.directive';
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
        ConfirmDialogModule,
        SkeletonModule,
    ],
    declarations: [
        // components
        LoadingDirective,
        ButtonBusyDirective,
        PdfViewerComponent,
        //modals
        SafePipe,
        MuiBreadcrumbComponent,
    ],
    exports: [
        // components
        PdfViewerComponent,
        //modals
        SkeletonModule,
        ConfirmDialogModule,
        // modules
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
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
            providers: [Title, AppService],
        };
    }
}
