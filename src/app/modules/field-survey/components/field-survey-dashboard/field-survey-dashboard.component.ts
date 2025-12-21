import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';

@Component({
    selector: 'app-field-survey-dashboard',
    templateUrl: './field-survey-dashboard.component.html',
    standalone: false,
})
export class FieldSurveyDashboardComponent extends BaseComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {}
}
