import { ComponentRef, Directive, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Directive({
    selector: '[appLoading]',
    standalone: false
})
export class LoadingDirective implements OnChanges {
    private static index = 0;

    @Input('appLoading') busyIf: boolean = false;

    isBusy = false;
    private spinnerName = '';

    private spinnerComponentRef: ComponentRef<NgxSpinnerComponent> | null = null;

    constructor(
        private _viewContainer: ViewContainerRef,
        private ngxSpinnerService: NgxSpinnerService,
    ) {
        this.loadComponent();
    }

    refreshState(): void {
        if (this.isBusy === undefined || this.spinnerName === '') {
            return;
        }

        if (this.isBusy) {
            this.ngxSpinnerService.show(this.spinnerName);
        } else {
            this.ngxSpinnerService.hide(this.spinnerName);
        }
    }

    loadComponent() {
        this.spinnerComponentRef = this._viewContainer.createComponent(NgxSpinnerComponent);
        this.spinnerName = `busyIfSpinner-${LoadingDirective.index++}-${Math.floor(Math.random() * 1000000)}`;

        let spinner = this.spinnerComponentRef.instance;
        spinner.name = this.spinnerName;
        spinner.fullScreen = false;
        spinner.type = 'ball-clip-rotate';
        spinner.size = 'medium';
        spinner.bdColor = 'rgba(161,161,161,0.4)';
        spinner.template = `<svg width="64" height="64" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#909567">
        <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
          <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="-360 67 67" dur="2.5s" repeatCount="indefinite"/>
        </path>
        <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
          <animateTransform attributeName="transform" type="rotate" from="0 67 67" to="360 67 67" dur="8s" repeatCount="indefinite"/>
        </path>
      </svg>`;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['busyIf']) {
            this.isBusy = changes['busyIf'].currentValue;
            this.refreshState();
        }
    }
}
