import { LocationClassification } from 'src/app/modules/location-classification/models/location-classification.model';
import { Organization } from 'src/app/modules/organization/models/organization.model';
import { Province } from 'src/app/modules/province/models/province.model';
import { Region } from 'src/app/modules/regions/models/region.model';

export enum SiteType {
    None = 1,
    Found = 2,
    Inside = 3,
    Outside = 4,
}

export interface LocationModel {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    code: string;
    area: string;
    provinceId: number;
    provinceNameAr?: string;
    organizationId: number;
    organizationNameAr?: string;
    regionId: number;
    regionNameAr?: string;
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
    siteType: SiteType;
    administrativeSite?: string;
    administrativeSiteDistance?: string;
    administrativeSiteType?: string;
    administrativeOfficeNumber?: number;
    administrativeWCNumber?: number;
    administrativeServiceNumber?: number;
    weaponsWarehouse: boolean;
    warhouseArea: string;
    maintainceWorkShop: boolean;
    parkingSpaces: boolean;
    parkingSpacesNumber?: number;
    staff: number;
    province?: Province;
    organization?: Organization;
    region?: Region;
    locationClassification?: LocationClassification;
}
