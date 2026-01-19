import { LocationModel } from 'src/app/modules/location/models/location.model';

export interface FieldSurvey {
    id?: number;
    surveyCode: string;
    locationId: number;
    surveyType: string;
    roomType: string;
    area: string;
    otherExperiments: string;
    nameAr: string;
    descriptionAr: string;
    fieldSurveyLocation: LocationModel;
}

export interface FieldSurveyClassificationForms {
    id?: number;
    entityId: number;
    entityName: string;
    entityClassficationFormId?: number;
    isSelected?: boolean;
    note?: string;
}

export interface EntityClassificationModel {
    classificationData: FieldSurveyClassificationForms[];
}
