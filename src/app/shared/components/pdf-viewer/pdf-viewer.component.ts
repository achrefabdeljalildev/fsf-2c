import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'pdf-viewer',
    templateUrl: './pdf-viewer.component.html',
    styleUrls: ['./pdf-viewer.component.css'],
    standalone: false,
})
export class PdfViewerComponent implements OnInit, OnDestroy {
    @Input() src: any = null;
    @Input() isVisible: boolean = false;
    @Input() isLoading: boolean = false;
    @Output() isVisibleChange = new EventEmitter<boolean>();
    @Output() closeModal = new EventEmitter<void>();

    private subscription: Subscription = new Subscription();
    blobDocument: any;
    error: string = '';

    ngOnInit(): void {
        if (this.isVisible) {
            this.blobDocument = URL.createObjectURL(this.src);
        }

        // Prevent body scrolling when modal is open
        if (this.isVisible) {
            document.body.style.overflow = 'hidden';
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }

    ngOnChanges(): void {
        if (this.isVisible) {
            this.blobDocument = URL.createObjectURL(this.src);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    printDocument(): void {
        if (this.blobDocument) {
            const printWindow = window.open(this.blobDocument, '_blank');
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.print();
                };
            }
        }
    }

    downloadDocument(): void {
        if (this.blobDocument) {
            const link = document.createElement('a');
            link.href = this.blobDocument;
            const fileName = `attachment-${Date.now()}.pdf`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    onClose(): void {
        if (this.src) {
            URL.revokeObjectURL(this.src);
        }

        document.body.style.overflow = 'auto';
        this.isVisibleChange.emit(false);
    }

    onBackdropClick(event: Event): void {
        if (event.target === event.currentTarget) {
            this.onClose();
        }
    }
}
