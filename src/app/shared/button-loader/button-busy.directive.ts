import { AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[buttonBusy]',
    standalone: false
})
export class ButtonBusyDirective implements OnInit, AfterViewInit {
    @Input() busyText: string = '';

    private _originalButtonInnerHtml: string = '';
    private _button!: HTMLElement;

    constructor(
        private _element: ElementRef,
        private _renderer: Renderer2,
    ) {}

    @Input('buttonBusy') set buttonBusy(isBusy: boolean) {
        this.refreshState(isBusy);
    }

    ngOnInit(): void {
        this._button = this._element.nativeElement;
    }

    ngAfterViewInit(): void {
        this._originalButtonInnerHtml = this._button.innerHTML;
    }

    refreshState(isBusy: boolean): void {
        if (!this._button) {
            return;
        }

        if (isBusy) {
            // Disable button
            this._renderer.setAttribute(this._button, 'disabled', 'true');
            this._renderer.setAttribute(this._button, 'data-disabled-before', 'true');

            // Set the busy state content (loading spinner)
            this._renderer.setProperty(
                this._button,
                'innerHTML',
                `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>`,
            );
        } else {
            // Only re-enable button if it was previously disabled (tracked via data attribute)
            if (!this._button.hasAttribute('data-disabled-before')) {
                return;
            }

            // Enable button
            this._renderer.removeAttribute(this._button, 'disabled');
            this._renderer.removeAttribute(this._button, 'data-disabled-before');

            // Restore original button content
            this._renderer.setProperty(this._button, 'innerHTML', this._originalButtonInnerHtml);
        }
    }
}
