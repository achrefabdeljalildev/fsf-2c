export interface LocationHypothesisCriteria {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    parentId: number;
    children?: LocationHypothesisCriteria[];
}
