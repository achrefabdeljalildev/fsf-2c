import { LocationClassification } from 'src/app/modules/settings/location-classification/models/location-classification.model';
import { Organization } from 'src/app/modules/settings/organization/models/organization.model';
import { Province } from 'src/app/modules/settings/province/models/province.model';
import { Region } from 'src/app/modules/settings/regions/models/region.model';

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
    locationClassificationColor?: string;
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
