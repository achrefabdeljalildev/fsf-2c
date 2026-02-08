import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FileUploadResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface FileUploadRequest {
    file?: File;
    entityName?: string;
    entityKey?: string;
    path?: string;
    category?: string;
}

export interface FileItem {
    id?: string;
    name: string;
    url?: string;
    size?: number;
    extension?: string;
}

export interface GetFileResponse {
    success: boolean;
    message: string;
    data?: FileItem[];
}

export interface ImageUploadResponse {
    fileName: string;
    filePath: string;
}

@Injectable({
    providedIn: 'root',
})
export class FileAttachmentService {
    private uploadUrl = '/upload/File';
    private getFilesUrl = '/GetFileByEntityKeyName';

    constructor(private http: HttpClient) {}

    /**
     * Upload a file with metadata
     * @param request File upload request containing file and metadata
     * @returns Observable with upload response
     */
    uploadFile(request: FileUploadRequest): Observable<FileUploadResponse> {
        const formData = new FormData();

        if (request.file) {
            formData.append('File', request.file);
        }
        if (request.entityName) {
            formData.append('EntityName', request.entityName);
        }
        if (request.entityKey) {
            formData.append('EntityKey', request.entityKey);
        }
        if (request.path) {
            formData.append('Path', request.path);
        }
        if (request.category) {
            formData.append('Category', request.category);
        }
        return this.http.post<FileUploadResponse>(this.uploadUrl, formData);
    }

    /**
     * Upload multiple files
     * @param requests Array of file upload requests
     * @returns Observable array of upload responses
     */
    uploadFiles(requests: FileUploadRequest[]): Observable<FileUploadResponse[]> {
        return new Observable((observer) => {
            const responses: FileUploadResponse[] = [];
            let completed = 0;
            let errors = 0;

            requests.forEach((request, index) => {
                this.uploadFile(request).subscribe({
                    next: (response) => {
                        responses[index] = response;
                        completed++;
                        if (completed + errors === requests.length) {
                            observer.next(responses);
                            observer.complete();
                        }
                    },
                    error: (error) => {
                        responses[index] = {
                            success: false,
                            message: error.message || 'Upload failed',
                        };
                        errors++;
                        if (completed + errors === requests.length) {
                            observer.next(responses);
                            observer.complete();
                        }
                    },
                });
            });
        });
    }

    /**
     * Download a file by URL
     * @param url File URL
     * @param fileName File name for download
     */
    downloadFile(url: string, fileName: string): void {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    }

    /**
     * Get files by entity name and key
     * @param entityId Entity ID or key
     * @param entityName Entity name
     * @returns Observable with file list
     */
    getFilesByEntity(entityId: string | number, entityName: string): Observable<any> {
        const params = {
            EntityId: entityId.toString(),
            EntityName: entityName,
        };

        return this.http.get<any>(this.getFilesUrl, { params });
    }

    /**
     * Delete a file by ID
     * @param fileId File ID to delete
     * @returns Observable with delete response
     */
    deleteFile(fileId: string | number): Observable<FileUploadResponse> {
        return this.http.delete<FileUploadResponse>(`/General/${fileId}`);
    }

    /**
     * Upload a single image to the general image endpoint
     */
    uploadImage(file: File): Observable<ImageUploadResponse> {
        const formData = new FormData();
        formData.append('File', file);

        return this.http.post<ImageUploadResponse>('/upload/image', formData);
    }
}
