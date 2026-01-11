export interface MapMarker {
    id: string | number;
    name: string;
    lat?: number;
    lng?: number;
    description?: string;
    regionId?: string;
    severity?: string;
}
