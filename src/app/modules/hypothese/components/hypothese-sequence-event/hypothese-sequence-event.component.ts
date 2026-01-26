import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@shared/components/base-component/base-component';
import { InvolvedParty } from 'src/app/modules/hypothese/models/hypothese.model';
import { HypotheseSequenceEvent } from '../../models/hypothese-sequence-event.model';
import { HypotheseSequenceEventService } from '../../services/hypothese-sequence-event.service';

@Component({
    selector: 'app-hypothese-sequence-event',
    templateUrl: './hypothese-sequence-event.component.html',
    standalone: false,
})
export class HypotheseSequenceEventComponent extends BaseComponent implements OnInit {
    @Input() hypotheseId: number | null = null;
    @Input() involvedParties: InvolvedParty[] = [];
    @Input() sequenceEvents: HypotheseSequenceEvent[] = [];

    @Output() onSave = new EventEmitter<void>();
    eventForm!: FormGroup;
    displayDialog: boolean = false;
    isLoading: boolean = false;
    selectedEvent: HypotheseSequenceEvent | null = null;
    isEditMode: boolean = false;

    constructor(
        private fb: FormBuilder,
        private sequenceEventService: HypotheseSequenceEventService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(): void {
        this.eventForm = this.fb.group({
            event: ['', [Validators.required]],
            time: ['', [Validators.required]],
            hypothesesInvolvedPartiesId: [null, [Validators.required]],
        });
    }

    openDialog(): void {
        this.selectedEvent = null;
        this.eventForm.reset();
        this.displayDialog = true;
    }

    editEvent(event: HypotheseSequenceEvent): void {
        this.selectedEvent = event;
        this.isEditMode = true;
        this.eventForm.patchValue({
            event: event.event,
            time: this.parseTimeStringToDate(event.time),
            hypothesesInvolvedPartiesId: event.hypothesesInvolvedPartiesId,
        });

        this.displayDialog = true;
    }

    saveEvent(): void {
        if (this.eventForm.invalid) {
            this.eventForm.markAllAsTouched();
            return;
        }

        if (!this.hypotheseId) return;

        this.isLoading = true;
        const formValue = this.eventForm.value;
        const eventData: HypotheseSequenceEvent = {
            id: this.selectedEvent?.id,
            ...formValue,
            hypotheseId: this.hypotheseId,
            time: this.formatDateToTimeString(formValue.time),
        };

        const request = this.isEditMode
            ? this.sequenceEventService.update(eventData)
            : this.sequenceEventService.create(eventData);
        request.subscribe({
            next: (response) => {
                if (response?.isSuccess) {
                    this.showSuccessMessage(
                        this.translateService.instant('validationMessages.savedSuccessfully'),
                    );

                    this.displayDialog = false;
                }

                this.isLoading = false;
                this.onSave.emit();
            },
            error: (error) => {
                console.error('Failed to save sequence event', error);
                this.showErrorMessage(this.translateService.instant('messages.error'));
                this.isLoading = false;
            },
        });
    }

    deleteEvent(event: HypotheseSequenceEvent): void {
        if (!event.id) return;

        this.isLoading = true;
        this.sequenceEventService.deleteById(event.id).subscribe({
            next: () => {
                this.showSuccessMessage(
                    this.translateService.instant('messages.deletedSuccessfully'),
                );

                this.isLoading = false;
                this.onSave.emit();
            },
            error: (error) => {
                console.error('Failed to delete sequence event', error);
                this.showErrorMessage(this.translateService.instant('messages.error'));
                this.isLoading = false;
            },
        });
    }

    closeDialog(): void {
        this.displayDialog = false;
        this.eventForm.reset();
    }

    private parseTimeStringToDate(timeStr?: string | null): Date | null {
        if (!timeStr) return null;
        const [hStr, mStr, sStr] = timeStr.split(':');
        const h = parseInt(hStr, 10);
        const m = parseInt(mStr, 10);
        const s = parseInt(sStr, 10);
        if (isNaN(h) || isNaN(m)) return null;
        const d = new Date();
        d.setHours(h, m, s, 0);
        return d;
    }

    private formatDateToTimeString(dateVal: Date | string | null): string | null {
        if (!dateVal) return null;
        const d = typeof dateVal === 'string' ? new Date(dateVal) : dateVal;
        if (!(d instanceof Date) || isNaN(d.getTime())) return null;
        const hh = d.getHours().toString().padStart(2, '0');
        const mm = d.getMinutes().toString().padStart(2, '0');
        const ss = d.getSeconds().toString().padStart(2, '0');
        return `${hh}:${mm}:${ss}`;
    }
}
