import { Region } from 'src/app/modules/regions/models/region.model';

export interface Province {
    id?: number;
    nameAr: string;
    descriptionAr: string;
    regionId?: number;
    region: Region;
}
