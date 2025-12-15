import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: './footer.html',
    standalone: false,
})
export class FooterComponent {
    currYear: number = new Date().getFullYear();
    constructor() {}
    ngOnInit() {}
}
