export interface HypothesisParticipatingEvaluationCriteria {
    participatingHypothesisCriteriaId: number;
    hypothesesInvolvedPartiesId: number;
    value: string;
}

export interface HypothesisParticipatingEvaluationSub {
    hypotheseId: number;
    criterias: HypothesisParticipatingEvaluationCriteria[];
}

export interface HypothesisParticipatingEvaluation {
    hypothesisParticipatingEvaluation: HypothesisParticipatingEvaluationSub;
}
