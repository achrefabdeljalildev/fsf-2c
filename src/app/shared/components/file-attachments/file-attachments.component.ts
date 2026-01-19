import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FileAttachmentService, FileUploadResponse } from '../../services/file-attachment.service';

export interface AttachmentItem {
    id?: string | number;
    name: string;
    size?: number;
    url?: string;
    extension?: string;
    isUploading?: boolean;
    uploadProgress?: number;
    file?: File;
}

@Component({
    selector: 'app-file-attachments',
    templateUrl: './file-attachments.component.html',
    standalone: false,
})
export class FileAttachmentsComponent implements OnInit, OnChanges {
    @Input() attachments: AttachmentItem[] = [];
    @Input() helperText: string = '';
    @Input() allowMultiple: boolean = true;
    @Input() disableActions: boolean = false;
    @Input() entityName: string = '';
    @Input() entityKey: string = '';
    @Input() path: string = '';
    @Input() category: string = '';
    @Input() itemsPerPage: number = 3;

    @Output() fileAdded = new EventEmitter<File>();
    @Output() download = new EventEmitter<AttachmentItem>();
    @Output() remove = new EventEmitter<AttachmentItem>();
    @Output() uploadSuccess = new EventEmitter<FileUploadResponse>();
    @Output() uploadError = new EventEmitter<{ file: File; error: any }>();

    @ViewChild('fileInput') private fileInput?: ElementRef<HTMLInputElement>;

    currentPage: number = 0;
    paginatedAttachments: AttachmentItem[] = [];

    constructor(private fileService: FileAttachmentService) {}

    ngOnInit(): void {
        this.updatePaginatedAttachments();
    }

    ngOnChanges(): void {
        this.currentPage = 0;
        this.updatePaginatedAttachments();
    }

    private updatePaginatedAttachments(): void {
        const start = this.currentPage * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedAttachments = this.attachments.slice(start, end);
    }

    onPageChange(event: any): void {
        this.currentPage = event.page;
        this.updatePaginatedAttachments();
    }

    get totalPages(): number {
        return Math.ceil(this.attachments.length / this.itemsPerPage);
    }

    triggerFileInput(): void {
        if (this.disableActions) return;
        this.fileInput?.nativeElement.click();
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = input.files;

        if (!files || files.length === 0) {
            return;
        }

        Array.from(files).forEach((file) => {
            this.fileAdded.emit(file);
            // Auto-upload if all metadata is provided
            if (this.shouldAutoUpload()) {
                this.uploadFileToServer(file);
            }
        });
        input.value = '';
    }

    /**
     * Check if all required metadata is provided for auto-upload
     */
    private shouldAutoUpload(): boolean {
        return !!(this.entityName && this.entityKey && this.path && this.category);
    }

    /**
     * Upload file to server
     */
    uploadFileToServer(file: File): void {
        if (!this.shouldAutoUpload()) {
            console.warn('Missing required metadata for file upload');
            return;
        }

        // Find or create attachment item
        let attachment = this.attachments.find((a) => a.name === file.name);
        if (!attachment) {
            attachment = {
                id: `${Date.now()}-${file.name}`,
                name: file.name,
                size: file.size,
                isUploading: true,
                uploadProgress: 0,
            };
            this.attachments = [...this.attachments, attachment];
        } else {
            attachment.isUploading = true;
            attachment.uploadProgress = 0;
        }

        this.fileService
            .uploadFile({
                file: file,
                entityName: this.entityName,
                entityKey: this.entityKey,
                path: this.path,
                category: this.category,
            })
            .subscribe({
                next: (response: FileUploadResponse) => {
                    // Update attachment with response data
                    const updatedAttachment = this.attachments.find((a) => a.id === attachment!.id);
                    if (updatedAttachment) {
                        updatedAttachment.isUploading = false;
                        updatedAttachment.uploadProgress = 100;
                        if (response.data?.url) {
                            updatedAttachment.url = response.data.url;
                        }
                    }
                    this.uploadSuccess.emit(response);
                },
                error: (error) => {
                    // Mark as failed but keep in list
                    const updatedAttachment = this.attachments.find((a) => a.id === attachment!.id);
                    if (updatedAttachment) {
                        updatedAttachment.isUploading = false;
                    }
                    this.uploadError.emit({ file, error });
                },
            });
    }

    handleDownload(item: AttachmentItem): void {
        this.download.emit(item);
        if (item.url) {
            this.fileService.downloadFile(item.url, item.name);
        }
    }

    handleRemove(item: AttachmentItem): void {
        if (this.disableActions) return;
        this.remove.emit(item);
    }

    trackByAttachment(_index: number, item: AttachmentItem): string | number {
        return item.id ?? item.name;
    }

    formatSize(bytes?: number): string {
        if (bytes === undefined || bytes === null) {
            return '';
        }
        if (bytes < 1024) return `${bytes} B`;
        const kb = bytes / 1024;
        if (kb < 1024) return `${kb.toFixed(1)} KB`;
        return `${(kb / 1024).toFixed(1)} MB`;
    }

    getIcon(item: AttachmentItem): string {
        const ext = item.extension || item.name?.split('.').pop()?.toLowerCase();
        if (ext === 'pdf') return 'pi-file-pdf';
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext || '')) {
            return 'pi-image';
        }
        if (['doc', 'docx'].includes(ext || '')) return 'pi-file-word';
        if (['xls', 'xlsx', 'csv'].includes(ext || '')) return 'pi-file-excel';
        return 'pi-file';
    }
}
