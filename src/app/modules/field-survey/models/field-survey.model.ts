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
    filedSurvyLocation: LocationModel;
}
