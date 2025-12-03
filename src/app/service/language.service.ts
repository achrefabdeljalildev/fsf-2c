import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    private readonly baseUrl = '/Administration/api/UserAccount/change-language';
    private currentLang: 'en' | 'ar' = 'en';
    constructor(private translate: TranslateService ,private http: HttpClient) {}
    getLanguage(): 'en' | 'ar' {
        return this.translate.currentLang as 'en' | 'ar';
    }

    toggleLanguage(): void {
        this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    }

   changeLanguage(language: string): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        let apiLanguage: string;
        if (language === 'en') {
            apiLanguage = 'en-GB';
        } else if (language === 'fr') {
            apiLanguage = 'fr-FR';
        } else if (language === 'ar') {
            apiLanguage = 'ar-SA';
        } else {
            apiLanguage = language; 
        }

        return this.http.post<any>(`${this.baseUrl}?language=${apiLanguage}`, {}, { headers });
    }
}
