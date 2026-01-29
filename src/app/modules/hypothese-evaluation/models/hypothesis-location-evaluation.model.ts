export interface HypothesisLocationEvaluationCriteria {
    locationHypothesisCriteriaId: number;
    value: string;
}

export interface HypothesisLocationEvaluationSub {
    hypotheseId: number;
    criterias: HypothesisLocationEvaluationCriteria[];
}

export interface HypothesisLocationEvaluation {
    hypothesisLocationEvaluation: HypothesisLocationEvaluationSub;
}
