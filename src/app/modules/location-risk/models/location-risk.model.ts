import { LocationModel } from '../../location/models/location.model';

export interface LocationRisk {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    riskCode?: string;
    locationId: number;
    riskImpactId: number;
    riskLikeliHoodId: number;
    date: Date | string;
    riskStatusId: number;
    riskTypeId: number;

    // Related data
    location?: LocationModel;
    riskImpact?: RiskClassification;
    riskLikeliHood?: RiskClassification;
    riskStatus?: RiskClassification;
    riskType?: RiskClassification;
}

export interface RiskClassification {
    id: number;
    nameAr: string;
    descriptionAr?: string;
    color?: string;
}
