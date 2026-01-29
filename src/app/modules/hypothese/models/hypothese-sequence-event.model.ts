export interface HypotheseSequenceEvent {
    id?: number;
    event: string;
    time: string; // TimeSpan format HH:mm:ss
    hypothesesInvolvedPartiesId: number;
    hypotheseId: number;
}
