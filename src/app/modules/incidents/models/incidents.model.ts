export interface incidentsModel {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    riskCode?: string;
    locationId: number;
    riskImpactId: number;
    riskLikeliHoodId: number;
    riskStatusId: number;
    riskTypeId: number;
    date?: string;
}
