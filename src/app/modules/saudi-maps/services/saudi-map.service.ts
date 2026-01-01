import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapMarker } from '../models/map-marker.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { ApiResponseModel } from 'src/app/shared/models/base/paged-response.model';

@Injectable({
    providedIn: 'root',
})
export class SaudiMapService extends BaseService<MapMarker> {
    private readonly markersApiUrl = '/Location'; // Update with your actual API endpoint

    constructor() {
        super('');
    }

    /**
     * Fetch all markers for the map from the database
     * Returns a list of locations with lat/lng coordinates
     */
    getMapMarkers(): Observable<ApiResponseModel<MapMarker[]>> {
        return this.http.get<ApiResponseModel<MapMarker[]>>(this.markersApiUrl);
    }

    /**
     * Convert location data to map markers
     * Adapts location objects to the MapMarker interface
     */
    convertLocationsToMarkers(locations: any[]): MapMarker[] {
        return locations.map((loc) => ({
            id: loc.id,
            name: loc.nameAr || loc.name,
            lat: loc.latitude || loc.lat,
            lng: loc.longitude || loc.lng,
            description: loc.descriptionAr || loc.description,
        }));
    }
}
