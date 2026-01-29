import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/components/base-component/base-component';
import { HypotheseService } from '../../../hypothese/services/hypothese.service';

@Component({
    selector: 'app-hypothesis-evaluation-page',
    templateUrl: './hypothesis-evaluation-page.component.html',
    standalone: false,
})
export class HypothesisEvaluationPageComponent extends BaseComponent implements OnInit {
    hypotheseId: number | null = null;
    hypothese: any = null;
    isLoading: boolean = false;

    showLocationEvaluationForm: boolean = true;
    showParticipatingEvaluationForm: boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        protected override router: Router,
        private hypotheseService: HypotheseService,
    ) {
        super();
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.hypotheseId = parseInt(params['id'], 10);
            if (this.hypotheseId) {
                this.loadHypothesis();
            }
        });
    }

    loadHypothesis(): void {
        if (!this.hypotheseId) return;

        this.isLoading = true;
        this.hypotheseService.getById(this.hypotheseId).subscribe({
            next: (response: any) => {
                if (response?.isSuccess && response.data) {
                    this.hypothese = response.data;
                }
                this.isLoading = false;
            },
            error: (error: any) => {
                console.error('Error loading hypothesis', error);
                this.isLoading = false;
                this.showErrorMessage(this.translate('messages.errorLoadingData'));
                this.router.navigate(['/hypothese/list']);
            },
        });
    }

    switchToParticipatingEvaluation(): void {
        this.showLocationEvaluationForm = false;
        this.showParticipatingEvaluationForm = true;
    }

    switchToLocationEvaluation(): void {
        this.showLocationEvaluationForm = true;
        this.showParticipatingEvaluationForm = false;
    }

    onEvaluationSaved(): void {
        this.loadHypothesis();
    }

    goBack(): void {
        this.router.navigate(['/hypothese/list']);
    }
}
