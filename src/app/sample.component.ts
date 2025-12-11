import { Component } from '@angular/core';

@Component({
    template: ` <div>
        <ul class="flex space-x-2 rtl:space-x-reverse">
            <li>
                <a href="javascript:;" class="text-primary hover:underline"
                    >الصفحات</a
                >
            </li>
            <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                <span>صفحة تجريبية</span>
            </li>
        </ul>
        <div class="panel mt-5 h-[calc(100vh-190px)]">
            <h1>صفحة تجريبية</h1>
        </div>
    </div>`,
})
export class SampleComponent {}
