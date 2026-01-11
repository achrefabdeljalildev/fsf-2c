import { EntityClassificationFormModel } from './entity-classification-form.model';

export interface EntityClassificationModel {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    parentId: number;
    entityName: string;
    children?: EntityClassificationModel[];
    entityClassficationForms?: EntityClassificationFormModel[];
    isFormNode?: boolean;
}
