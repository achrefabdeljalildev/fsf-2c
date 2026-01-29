import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base-component/base-component';
import { AttachmentItem } from '../../../../shared/components/file-attachments/file-attachments.component';
import { CriteriaModel, FilterCriteriaModel } from '../../../../shared/models/base/criteria.model';
import { FileAttachmentService } from '../../../../shared/services/file-attachment.service';
import { LocationService } from '../../../location/services/location.service';
import { HypotheseTitleService } from '../../../settings/hypothese-settings/hypothese-titles/services/hypothese-title.service';
import { HypotheseTypeService } from '../../../settings/hypothese-settings/hypothese-types/services/hypothese-type.service';
import { HypothesesInvolvedPartyService } from '../../../settings/hypothese-settings/hypotheses-involved-parties/services/hypotheses-involved-party.service';
import { Hypothese } from '../../models/hypothese.model';
import { HypotheseService } from '../../services/hypothese.service';

@Component({
    selector: 'app-hypothese-view',
    templateUrl: './hypothese-view.component.html',
    standalone: false,
})
export class HypotheseViewComponent extends BaseComponent implements OnInit {
    hypotheseId: number | null = null;
    hypotheseForm!: FormGroup;
    isLoading: boolean = false;
    isEditMode: boolean = false;
    isInitializing: boolean = false;
    showInvolvedPartiesMode: boolean = false;

    // Dropdowns data
    locations: any[] = [];
    hypotheseTypes: any[] = [];
    hypotheseTitles: any[] = [];
    allHypotheseTitles: any[] = [];
    loadingHypotheseTitles: boolean = false;
    hypotheseInvolvedPartiesData: any[] = [];
    hypotheseSequenceEvent: any[] = [];
    availableInvolvedParties: any[] = [];
    selectedInvolvedParties: any[] = [];
    days: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    // Attachments
    attachments: AttachmentItem[] = [];

    constructor(
        private fb: FormBuilder,
        private hypotheseService: HypotheseService,
        private locationService: LocationService,
        private hypotheseTypeService: HypotheseTypeService,
        private hypotheseTitleService: HypotheseTitleService,
        private hypothesesInvolvedPartyService: HypothesesInvolvedPartyService,
        private fileAttachmentService: FileAttachmentService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.loadDropdownData();
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.hypotheseId = +params['id'];
                this.isEditMode = true;
                this.loadHypothese(this.hypotheseId);
            }
        });
    }

    initForm(): void {
        this.hypotheseForm = this.fb.group({
            nameAr: [''],
            descriptionAr: [''],
            locationId: [null, [Validators.required]],
            hypotheseTypeId: [null, [Validators.required]],
            hypotheseTitleId: [null, [Validators.required]],
            day: ['', [Validators.required]],
            date: [null, [Validators.required]],
            fromTimeSpan: [null, [Validators.required]],
            toTimeSpan: [null, [Validators.required]],
        });
        // Listen to hypotheseTypeId changes to filter titles
        this.hypotheseForm.get('hypotheseTypeId')?.valueChanges.subscribe((typeId) => {
            if (this.isInitializing) return;
            this.onHypotheseTypeChange(typeId);
        });
    }

    loadDropdownData(): void {
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });

        // Load locations
        this.locationService.getPagedList(criteria).subscribe((response) => {
            if (response?.isSuccess && response.data?.items) {
                this.locations = response.data.items;
            }
        });

        // Load hypothese types
        this.hypotheseTypeService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.hypotheseTypes = response.data.items;
            }
        });

        // Load all hypothese titles
        this.hypotheseTitleService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.allHypotheseTitles = response.data.items;
                this.hypotheseTitles = response.data.items;
            }
        });

        // Load available involved parties
        this.hypothesesInvolvedPartyService.getPagedList(criteria).subscribe((response: any) => {
            if (response?.isSuccess && response.data?.items) {
                this.availableInvolvedParties = response.data.items;
            }
        });
    }

    onHypotheseTypeChange(typeId: number | null, selectedTitleId?: number | null): void {
        if (!typeId) {
            this.hypotheseTitles = this.allHypotheseTitles;
            this.hypotheseForm.get('hypotheseTitleId')?.reset();
            return;
        }
        // Filter titles by selected type
        this.loadingHypotheseTitles = true;
        const filterCriteria = new FilterCriteriaModel({
            propertyName: 'hypotheseTypeId',
            values: [typeId.toString()],
        });

        const criteria = new CriteriaModel({
            pageNumber: 1,
            pageSize: 1000,
            filters: [filterCriteria],
        });

        this.hypotheseTitleService.getPagedList(criteria).subscribe({
            next: (response: any) => {
                if (response?.isSuccess && response.data?.items) {
                    this.hypotheseTitles = response.data.items;
                } else {
                    this.hypotheseTitles = [];
                }
                if (selectedTitleId) {
                    this.hypotheseForm.get('hypotheseTitleId')?.setValue(selectedTitleId);
                } else {
                    this.hypotheseForm.get('hypotheseTitleId')?.reset();
                }
                this.loadingHypotheseTitles = false;
            },
            error: () => {
                this.hypotheseTitles = [];
                this.loadingHypotheseTitles = false;
            },
        });
    }

    loadHypothese(id: number): void {
        this.isLoading = true;
        this.hypotheseService.getById(id).subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data) {
                    const data = response.data;
                    this.isInitializing = true;
                    this.hypotheseForm.patchValue({
                        ...data,
                        locationId: data.location?.id,
                        hypotheseTypeId: data.hypotheseTitle?.hypotheseType?.id,
                        hypotheseTitleId: data.hypotheseTitle?.id,
                        date: data.date ? new Date(data.date) : null,
                        fromTimeSpan: this.parseTimeToDate(data.fromTimeSpan),
                        toTimeSpan: this.parseTimeToDate(data.toTimeSpan),
                    });

                    this.hypotheseInvolvedPartiesData = data.hypotheseInvolvedPartiesData || [];
                    this.hypotheseSequenceEvent = data.hypotheseSequenceEvent || [];

                    this.isInitializing = false;
                    this.loadHypotheseAttachments(id);
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to load hypothese', error);
                this.isLoading = false;
            },
        });
    }

    private parseTimeToDate(timeStr?: string | null): Date | null {
        if (!timeStr) return null;
        // Expecting HH:mm
        const [hStr, mStr] = timeStr.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        if (isNaN(h) || isNaN(m)) return null;
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    }

    private formatDateToTimeString(dateVal: Date | string | null): string | null {
        if (!dateVal) return null;
        const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
        if (!(d instanceof Date) || isNaN(d.getTime())) return null;
        const hh = d.getHours().toString().padStart(2, '0');
        const mm = d.getMinutes().toString().padStart(2, '0');
        return `${hh}:${mm}`;
    }

    private loadHypotheseAttachments(hypotheseId: number): void {
        this.fileAttachmentService.getFilesByEntity(hypotheseId, 'Hypothese').subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data) {
                    this.attachments = response.data.map((file: any) => ({
                        id: file.id,
                        name: file.originalName,
                        size: file.size,
                        url: file.url,
                        extension: file.extension,
                    }));
                }
            },
            error: (error) => {
                console.error('Failed to load attachments', error);
            },
        });
    }

    submit(): void {
        if (this.hypotheseForm.invalid) {
            this.hypotheseForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const formVal = this.hypotheseForm.value;
        const hypotheseData: Hypothese = {
            ...formVal,
            fromTimeSpan: this.formatDateToTimeString(formVal.fromTimeSpan) ?? '',
            toTimeSpan: this.formatDateToTimeString(formVal.toTimeSpan) ?? '',
        } as Hypothese;

        const request = this.isEditMode
            ? this.hypotheseService.update({ id: this.hypotheseId!, ...hypotheseData })
            : this.hypotheseService.create(hypotheseData);

        request.subscribe({
            next: (response) => {
                if (response?.isSuccess) {
                    this.showSuccessMessage(
                        this.translateService.instant('validationMessages.savedSuccessfully'),
                    );
                    // If created new record, upload pending attachments
                    if (!this.isEditMode && response?.data?.id) {
                        const pendingUploads = this.attachments.filter(
                            (attachment) => attachment.file,
                        );

                        if (pendingUploads.length > 0) {
                            this.fileAttachmentService
                                .uploadFiles(
                                    pendingUploads.map((attachment) => ({
                                        file: attachment.file!,
                                        entityName: 'Hypothese',
                                        entityKey: response.data.id!.toString(),
                                        path: 'Hypotheses',
                                        category: 'Documents',
                                    })),
                                )
                                .subscribe({
                                    next: () => {
                                        this.router.navigate(['/hypothese/edit', response.data.id]);
                                    },
                                    error: (error) => {
                                        console.error('Failed to upload attachments', error);
                                        this.router.navigate(['/hypothese/list']);
                                    },
                                });
                        } else {
                            this.router.navigate(['/hypothese/list']);
                        }
                    } else {
                        this.router.navigate(['/hypothese/list']);
                    }
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Failed to save hypothese', error);
                this.showErrorMessage(this.translateService.instant('messages.error'));
                this.isLoading = false;
            },
        });
    }

    private handlePostSubmitAttachments(): void {
        const pendingUploads = this.attachments.filter((attachment) => attachment.file);

        if (pendingUploads.length > 0 && this.hypotheseId) {
            this.fileAttachmentService
                .uploadFiles(
                    pendingUploads.map((attachment) => ({
                        file: attachment.file!,
                        entityName: 'Hypothese',
                        entityKey: this.hypotheseId!.toString(),
                        path: 'Hypotheses',
                        category: 'Documents',
                    })),
                )
                .subscribe({
                    next: () => {
                        this.router.navigate(['/hypothese/list']);
                    },
                    error: (error) => {
                        console.error('Failed to upload attachments', error);
                        this.router.navigate(['/hypothese/list']);
                    },
                });
        } else {
            this.router.navigate(['/hypothese/list']);
        }
    }

    onFileAdded(file: File): void {
        if (this.isEditMode || !file) return;
        // Queue pending attachment until entity is created
        this.attachments = [
            ...this.attachments,
            {
                id: `${Date.now()}-${file.name}`,
                name: file.name,
                size: file.size,
                file,
            },
        ];
    }

    onAttachmentDownload(event: any): void {
        if (event && event.url) {
            window.open(event.url, '_blank');
        }
    }

    onAttachmentRemove(event: any): void {
        if (event && event.id) {
            if (this.isEditMode) {
                this.fileAttachmentService.deleteFile(event.id).subscribe({
                    next: () => {
                        this.showSuccessMessage(
                            this.translateService.instant('messages.deletedSuccessfully'),
                        );
                        if (this.hypotheseId) {
                            this.loadHypotheseAttachments(this.hypotheseId);
                        }
                    },
                    error: () => {
                        this.showErrorMessage(this.translateService.instant('messages.error'));
                    },
                });
            } else {
                this.attachments = this.attachments.filter((a) => a.id !== event.id);
            }
        }
    }

    onUploadSuccess(event: any): void {
        this.showSuccessMessage(this.translateService.instant('messages.savedSuccessfully'));
        if (this.isEditMode && this.hypotheseId) {
            this.loadHypotheseAttachments(this.hypotheseId);
        }
    }

    onUploadError(event: any): void {
        this.showErrorMessage(this.translateService.instant('messages.error'));
    }

    back(): void {
        this.router.navigate(['/hypothese/list']);
    }

    removeInvolvedParty(partyId: number): void {
        this.hypotheseInvolvedPartiesData = this.hypotheseInvolvedPartiesData.filter(
            (p) => p.id !== partyId,
        );
    }

    addSelectedInvolvedParties(): void {
        if (!this.selectedInvolvedParties || this.selectedInvolvedParties.length === 0) {
            this.finishAddingInvolvedParties();
            return;
        }

        this.isLoading = true;
        const partiesToAdd = this.selectedInvolvedParties.map((party) => ({
            hypothesesInvolvedPartyId: party.id,
        }));

        this.addPartiesSequentially(partiesToAdd, 0);
    }

    private addPartiesSequentially(parties: any[], index: number): void {
        if (index >= parties.length) {
            this.isLoading = false;
            this.finishAddingInvolvedParties();
            return;
        }

        if (!this.hypotheseId) {
            this.isLoading = false;
            return;
        }

        this.hypotheseService.createHypotheseInvolved(this.hypotheseId, parties[index]).subscribe({
            next: (response: any) => {
                if (response?.isSuccess) {
                    this.hypotheseInvolvedPartiesData.push(response.data);
                }
                this.addPartiesSequentially(parties, index + 1);
            },
            error: (error) => {
                console.error('Failed to add involved party', error);
                this.addPartiesSequentially(parties, index + 1);
            },
        });
    }

    finishAddingInvolvedParties(): void {
        this.showInvolvedPartiesMode = false;
        this.handlePostSubmitAttachments();
    }

    cancelInvolvedPartiesMode(): void {
        this.showInvolvedPartiesMode = false;
        this.selectedInvolvedParties = [];
        this.router.navigate(['/hypothese/list']);
    }
}
