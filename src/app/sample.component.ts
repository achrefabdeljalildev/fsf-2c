import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/modules/shared/components/mui-breadcrumb/breadcrumb.service';

@Component({
    template: ` <div>
        <div class="panel h-[calc(100vh-190px)]">
            <h1>صفحة تجريبية</h1>
        </div>
    </div>`,
    standalone: false
})
export class SampleComponent {
    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'الصفحة الرئيسية', route: '/' },
            { label: 'صفحة تجريبية', route: '/services' },
        ]);
    }
}
