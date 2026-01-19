import { Component, Input } from '@angular/core';

@Component({
    selector: 'main-content',
    templateUrl: './main-content.component.html',
    standalone: false,
})
export class MainContentComponent {
    @Input() isPanel: boolean = true;
}
