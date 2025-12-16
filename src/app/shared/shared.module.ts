import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// service
import { AppService } from 'src/app/shared/services/app.service';
// i18n
import { TranslateModule } from '@ngx-translate/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { LoadingDirective } from 'src/app/shared/directives/app-loader/app-loader.directive';
import { ButtonBusyDirective } from 'src/app/shared/directives/button-loader/button-busy.directive';
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SafePipe } from './pipes/safe.pipe';

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
