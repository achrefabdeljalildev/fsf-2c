import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private modalRegistry = new Map<string, any>();
    private resultSubject = new Subject<any>();

    registerModal(id: string, componentInstance: any): void {
        this.modalRegistry.set(id, componentInstance);
    }

    unregisterModal(id: string): void {
        this.modalRegistry.delete(id);
    }

    open(id: string): Observable<any> {
        const modal = this.modalRegistry.get(id);
        if (modal) {
            modal.openModal();
            return this.resultSubject.asObservable();
        } else {
            console.warn(`Modal with id "${id}" not found.`);
            throw new Error(`Modal with id "${id}" not found.`);
        }
    }


    close(id: string, result?: any): void {
        const modal = this.modalRegistry.get(id);
        if (modal) {
            modal.modal.close();
            this.resultSubject.next(result);
            this.resultSubject.complete();
            this.resultSubject = new Subject<any>();
        } else {
            console.warn(`Modal with id "${id}" not found.`);
        }
    }
}
