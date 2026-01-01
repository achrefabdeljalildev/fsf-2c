export interface EntityClassificationModel {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    parentId: number;
    entityName: string;
    children?: EntityClassificationModel[];
}
