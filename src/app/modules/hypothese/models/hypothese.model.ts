import { LocationModel } from '../../location/models/location.model';

export interface Hypothese {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    hypotheseTypeId: number;
    hypotheseTitleId: number;
    locationId: number;
    day: string;
    date: Date | string;
    fromTimeSpan: string;
    toTimeSpan: string;

    // Related data
    location?: LocationModel;
    hypotheseTitle?: HypotheseTitle;

    hypotheseInvolvedPartiesData?: any[];
}

export interface HypotheseType {
    id: number;
    nameAr: string;
    descriptionAr?: string;
}

export interface HypotheseTitle {
    id: number;
    nameAr: string;
    descriptionAr?: string;
    hypotheseType?: HypotheseType;
}
