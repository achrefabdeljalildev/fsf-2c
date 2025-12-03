import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseComponent} from "../../components/base-component/base-component";

@Component({
    selector: 'app-confirm-comment-modal',
    templateUrl: './confirm-modal.component.html',
})
export class ConfirmModalComponent extends BaseComponent implements OnInit, OnDestroy {


    @ViewChild('modal') modal: any;
    @Input() title:string ="";
    @Input() message:string ="";
    @Input() optionalNote: string = "";
    @Input() modalId :string = "";


    constructor() {
        super();
    }

    ngOnInit(): void {
        this.modalService.registerModal(this.modalId, this);
    }

    ngOnDestroy(): void {
        this.modalService.unregisterModal(this.modalId);
    }

    closeModal(result:boolean): void {
        this.modalService.close(this.modalId,result);
    }

    openModal(): void {
        if (this.modal) {
            this.modal.open();
        }
    }


}
