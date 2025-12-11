import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root',
})
export class ToasterService {
    constructor(private translate: TranslateService) {}

    showMessage(msg = '', type = 'success') {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 10000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    }

    showSuccessMessage(key: string) {
        this.showMessage(this.translateMessage(key), 'success');
    }

    showErrorMessage(key: string) {
        this.showMessage(this.translateMessage(key), 'error');
    }

    private translateMessage(key: string): string {
        if (!key) {
            return '';
        }
        const translated = this.translate.instant(key);
        return translated !== key ? translated : key;
    }
}
