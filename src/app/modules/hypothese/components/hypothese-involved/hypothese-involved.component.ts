import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HypothesesInvolvedPartyService } from 'src/app/modules/settings/hypothese-settings/hypotheses-involved-parties/services/hypotheses-involved-party.service';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';
import { HypotheseService } from '../../services/hypothese.service';

@Component({
    selector: 'app-hypothese-involved',
    templateUrl: './hypothese-involved.component.html',
    standalone: false,
})
export class HypotheseInvolvedComponent extends BaseComponent implements OnInit {
    @Input() hypotheseId: number | null = null;
    @Input() selectedInvolvedParties: any[] = [];

    @Output() onSave = new EventEmitter<void>();

    form!: FormGroup;
    involvedParties: any[] = [];
    loadingParties: boolean = false;
    saving: boolean = false;
    visible: boolean = false;
    partyCheckboxes: Map<number, FormControl> = new Map();

    constructor(
        private fb: FormBuilder,
        private involvedPartyService: HypothesesInvolvedPartyService,
        private hypotheseService: HypotheseService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            involvedParty: [[], Validators.required],
        });
        this.loadInvolvedParties();
    }

    openModal(): void {
        if (this.hypotheseId) {
            this.visible = true;
            // Pre-select checkboxes based on selectedInvolvedParties
            this.preselectParties();
        }
    }

    closeModal(): void {
        this.visible = false;
    }

    private preselectParties(): void {
        if (this.selectedInvolvedParties && this.selectedInvolvedParties.length > 0) {
            const selectedIds = this.selectedInvolvedParties.map((p) => p.id || p);
            this.partyCheckboxes.forEach((control, partyId) => {
                control.setValue(selectedIds.includes(partyId), { emitEvent: false });
            });
        }
    }

    getPartyCheckbox(partyId: number): FormControl {
        if (!this.partyCheckboxes.has(partyId)) {
            const selectedIds = this.selectedInvolvedParties?.map((p) => p.id || p) || [];
            const isSelected = selectedIds.includes(partyId);
            this.partyCheckboxes.set(partyId, new FormControl(isSelected));
        }
        return this.partyCheckboxes.get(partyId)!;
    }

    private loadInvolvedParties(): void {
        this.loadingParties = true;
        const criteria = new CriteriaModel({ pageNumber: 1, pageSize: 1000 });
        this.involvedPartyService.getPagedList(criteria).subscribe({
            next: (response) => {
                if (response?.isSuccess && response.data?.items) {
                    this.involvedParties = response.data.items;
                } else {
                    this.involvedParties = [];
                }
                this.loadingParties = false;
            },
            error: () => {
                this.involvedParties = [];
                this.loadingParties = false;
            },
        });
    }

    save(): void {
        if (!this.hypotheseId) {
            this.showErrorMessage(this.translateService.instant('messages.saveParentFirst'));
            return;
        }

        // Collect selected party IDs from checkboxes
        const selected: number[] = [];
        this.partyCheckboxes.forEach((control, partyId) => {
            if (control.value) {
                selected.push(partyId);
            }
        });

        this.saving = true;
        this.hypotheseService.createHypotheseInvolved(this.hypotheseId, selected).subscribe({
            next: (response: any) => {
                if (response?.isSuccess) {
                    this.showSuccessMessage(
                        this.translateService.instant(
                            'validationMessages.hypothesesInvolvedPartyAddedSuccess',
                        ),
                    );
                    this.partyCheckboxes.forEach((control) => control.reset());
                    this.closeModal();
                    // emit event or callback if needed
                    this.onSave.emit();
                }
                this.saving = false;
            },
            error: () => {
                this.showErrorMessage(
                    this.translateService.instant(
                        'validationMessages.hypothesesInvolvedPartyErrorSave',
                    ),
                );
                this.saving = false;
            },
        });
    }
}
