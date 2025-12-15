import { Component } from '@angular/core';

@Component({
    template: ` <div>
        <div class="panel h-[calc(100vh-190px)]">
            <h1>صفحة تجريبية</h1>
        </div>
    </div>`,
    standalone: false,
})
export class SampleComponent {
    constructor() {}
}
