import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    standalone: false
})
export class AuthComponent {
    constructor(private translateService: TranslateService) {
        let currentLang = localStorage.getItem('i18n_locale') || 'ar';
        this.translateService.use(currentLang);
    }
}
