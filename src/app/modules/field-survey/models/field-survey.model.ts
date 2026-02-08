import { LocationModel } from 'src/app/modules/location/models/location.model';

export interface FieldSurvey {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    locationId: number;
    imagePath: string;
    classificationId: number;
    opearationCenter: string;
    openingDate: string;
    siteLocation: string;
    siteCoordinates: string;
    siteReceiptDate: string;
    nearestPoliceStation: string;
    nearestDefenseCenter: string;
    siteLength: string;
    northBoundar: string;
    southBoundar: string;
    westBoundar: string;
    eastBoundar: string;
    siteType: string;
    administrativeSite: string;
    administrativeSiteDistance: string;
    administrativeSiteType: string;
    administrativeOfficeNumber: number;
    administrativeWCNumber: number;
    administrativeServiceNumber: number;
    weaponsWarehouse: boolean;
    warhouseArea: string;
    maintainceWorkShop: boolean;
    parkingSpaces: boolean;
    parkingSpacesNumber: number;
    staff: number;
    fieldSurveyLocation?: LocationModel;
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
