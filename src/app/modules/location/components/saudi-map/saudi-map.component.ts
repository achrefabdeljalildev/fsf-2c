import {
    AfterViewInit,
    Component,
    Input,
    Output,
    EventEmitter,
    OnDestroy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { MapMarker } from '../../models/map-marker.model';
import saudiRegionsGeoJSON from './sa-maps.json';
import customCountryBorder from './custom.geo.json';
import { LocationService } from 'src/app/modules/location/services/location.service';
import { CriteriaModel } from 'src/app/shared/models/base/criteria.model';

@Component({
    selector: 'app-saudi-map',
    templateUrl: './saudi-map.component.html',
    styleUrls: ['./saudi-map.component.scss'],
    standalone: false,
})
export class SaudiMapComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() searchTerm: string = '';
    @Input() initializeOnLoad: boolean = true;
    @Output() markerSelected = new EventEmitter<string>();

    private map?: L.Map;
    private selectionMode: boolean = false;
    private selectedMarker?: L.Marker;
    private markersLayer = L.layerGroup();
    private regionsLayer = L.layerGroup();
    private borderLayer?: L.GeoJSON;
    private countryBorderLayer?: L.GeoJSON;
    private sub?: Subscription;
    isLoading: boolean = true;
    errorMessage: string = '';
    showRegions: boolean = false;
    selectedRegionId: string = 'none';
    availableRegions: Array<{ id: string; name: string; nameAr: string }> = [];

    constructor(private locationsService: LocationService) {}

    ngAfterViewInit(): void {
        if (this.initializeOnLoad) {
            this.initializeMap();
        }
    }

    public initializeMap(): void {
        if (this.map) return; // Already initialized
        // Build bounds from GeoJSON data for accurate fit
        const boundsLayer = L.geoJSON(saudiRegionsGeoJSON as any);
        const saudiBounds = boundsLayer.getBounds().pad(0.05);

        // Define strict bounds for Saudi Arabia (approximate)
        // Create the map constrained to Saudi bounds
        this.map = L.map('saudiMap', {
            zoomControl: true,
            maxBounds: saudiBounds,
            maxBoundsViscosity: 1.0, // prevent panning outside
            worldCopyJump: false,
        });

        // Basemap tiles (OpenStreetMap) without world wrap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            noWrap: true,
            attribution: '© OpenStreetMap contributors',
        }).addTo(this.map);

        // Fit the initial view to Saudi Arabia bounds
        this.map.fitBounds(saudiBounds);

        // Layer group to manage markers
        this.markersLayer.addTo(this.map);
        this.regionsLayer.addTo(this.map);

        // Draw border outline from GeoJSON (no fill)
        this.addSaudiBorderFromGeoJson();

        // Extract available regions for dropdown
        this.extractAvailableRegions();

        // Load regions from GeoJSON
        this.loadRegions();

        // Load markers from database or use mock data
        this.loadMarkers();

        // Enable map click for coordinate selection
        this.enableMapClickSelection();

        // Ensure Leaflet recalculates dimensions after view init
        setTimeout(() => this.invalidateMapSize(), 300);
    }

    private loadMarkers(): void {
        this.isLoading = true;
        this.errorMessage = '';

        // Load markers from API with search term
        const criteria = new CriteriaModel({
            pageNumber: 1,
            pageSize: 1000,
            searchTerm: this.searchTerm,
        });
        this.sub = this.locationsService.getPagedList(criteria).subscribe({
            next: (response) => {
                const markers = response.data.items
                    .filter((loc) => loc.siteCoordinates)
                    .map((loc) => ({
                        id: loc.id ?? 1,
                        name: loc.nameAr ?? '',
                        lat: parseFloat(loc.siteCoordinates.split(',')[0]),
                        lng: parseFloat(loc.siteCoordinates.split(',')[1]),
                        description: loc.code,
                        severity: loc.locationClassificationColor,
                    }));

                this.renderMarkers(markers);
                this.isLoading = false;
                this.invalidateMapSize();
            },
            error: (err) => {
                console.error('Failed to load markers', err);
                this.errorMessage = 'فشل تحميل المواقع من قاعدة البيانات';
                this.isLoading = false;
            },
        });
    }

    private getCustomMarkerIcon(severity?: string): L.Icon {
        // Use severity color if provided, otherwise default to blue
        const color = severity || '#3b82f6';

        // Create SVG marker with dynamic color using data URL
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
            <path d="M16 0C7.16 0 0 7.16 0 16c0 8 16 24 16 24s16-16 16-24c0-8.84-7.16-16-16-16z" fill="${color}" stroke="white" stroke-width="1.5"/>
            <circle cx="16" cy="16" r="6" fill="white" opacity="0.85"/>
        </svg>`;

        // Use data URL with base64 encoding for better compatibility
        const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgString);

        return L.icon({
            iconUrl: svgDataUrl,
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40],
            shadowUrl: '',
            shadowSize: [0, 0],
        });
    }

    private renderMarkers(markers: MapMarker[] | any[]): void {
        this.markersLayer.clearLayers();
        const leafletMarkers: L.Marker[] = [];

        for (const m of markers) {
            // Get coordinates - handle both lat/lng and latitude/longitude
            let lat = m.lat ?? m.latitude;
            let lng = m.lng ?? m.longitude;

            // Fallback: parse "siteCoordinates" if provided as "lat, lng" string
            if (
                (!Number.isFinite(lat) || !Number.isFinite(lng)) &&
                typeof m.siteCoordinates === 'string'
            ) {
                const parsed = this.parseSiteCoordinates(m.siteCoordinates);
                if (parsed) {
                    lat = parsed.lat;
                    lng = parsed.lng;
                }
            }

            // Basic validation
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                continue;
            }

            // Get dynamic icon based on severity color
            const customIcon = this.getCustomMarkerIcon(m.severity);
            const marker = L.marker([lat, lng], { icon: customIcon });

            const displayName = m.nameAr || m.name || 'Location';
            const popupHtml = `
            <div style="min-width:250px;" dir="rtl">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;" dir="rtl">
                    <div style="width: 12px; height: 12px; background-color: ${m.severity || '#e5e7eb'}; border-radius: 2px; flex-shrink: 0; border-radius: 999px;"></div>
                    <div style="font-weight:600; font-size: 14px; flex: 1;">
                        ${this.escapeHtml(displayName)}
                    </div>
                </div>
                ${m.name && m.name !== displayName ? `<div style="font-size: 12px; color: #888; margin-bottom: 6px;">${this.escapeHtml(m.name)}</div>` : ''}
                ${
                    m.descriptionAr || m.description
                        ? `<div style="margin-top:6px; font-size: 12px; color: #666;">
                                ${this.escapeHtml(m.descriptionAr || m.description)}
                            </div>`
                        : ''
                }
            </div>
      `;

            marker.bindPopup(popupHtml);
            marker.addTo(this.markersLayer);
            leafletMarkers.push(marker);
        }

        // If we have markers, fit map to them (but keep reasonable zoom)
        if (leafletMarkers.length && this.map) {
            const group = L.featureGroup(leafletMarkers);
            this.map.fitBounds(group.getBounds().pad(0.2), { maxZoom: 11 });
        }
    }

    // Parse siteCoordinates string formatted as "lat, lng"
    private parseSiteCoordinates(siteCoordinates: string): { lat: number; lng: number } | null {
        if (!siteCoordinates) return null;

        const parts = siteCoordinates.split(',').map((p) => parseFloat(p.trim()));
        if (parts.length >= 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
            return { lat: parts[0], lng: parts[1] };
        }

        return null;
    }

    private addSaudiBorderFromGeoJson(): void {
        if (!this.map) return;

        if (this.borderLayer) {
            this.borderLayer.remove();
        }

        this.borderLayer = L.geoJSON(saudiRegionsGeoJSON as any, {
            style: {
                color: '#1d4ed8',
                weight: 2,
                fill: false,
            },
        });

        this.borderLayer.addTo(this.map);
        this.borderLayer.bringToFront();
    }

    /**
     * Force Leaflet to recalculate container size to avoid side positioning glitches.
     */
    private invalidateMapSize(): void {
        if (this.map) {
            this.map.invalidateSize();
        }
    }

    private extractAvailableRegions(): void {
        const geoJsonData = saudiRegionsGeoJSON as any;
        this.availableRegions = geoJsonData.features.map((feature: any) => ({
            id: feature.properties?.id || '',
            name: feature.properties?.name || 'Unknown',
            nameAr: feature.properties?.nameAr || feature.properties?.name || 'Unknown',
        }));
    }

    private loadRegions(): void {
        if (!this.map) return;

        this.regionsLayer.clearLayers();

        // If 'none' is selected, don't load any regions
        if (this.selectedRegionId === 'none') {
            this.removeCountryBorder();
            return;
        }

        // Show country border when 'all' regions are selected
        if (this.selectedRegionId === 'all') {
            this.addCountryBorder();
        } else {
            this.removeCountryBorder();
        }

        // Process GeoJSON and create polygons for each region
        const geoJsonData = saudiRegionsGeoJSON as any;
        let selectedRegionFeature: any = null;

        geoJsonData.features.forEach((feature: any) => {
            const regionName = feature.properties?.name || 'Unknown';
            const regionNameAr = feature.properties?.nameAr || regionName;
            const regionId = feature.properties?.id || '';
            const geometry = feature.geometry;

            // Filter by selected region if not 'all'
            if (this.selectedRegionId !== 'all' && regionId !== this.selectedRegionId) {
                return;
            }

            // Store the selected region feature for zooming
            if (this.selectedRegionId !== 'all' && regionId === this.selectedRegionId) {
                selectedRegionFeature = feature;
            }

            if (geometry.type === 'Polygon') {
                this.createRegionPolygon(geometry.coordinates, regionNameAr, regionId);
            } else if (geometry.type === 'MultiPolygon') {
                geometry.coordinates.forEach((polygonCoords: any) => {
                    this.createRegionPolygon(polygonCoords, regionNameAr, regionId);
                });
            }
        });

        // Zoom to selected region if a specific region is selected
        if (selectedRegionFeature && this.selectedRegionId !== 'all' && this.map) {
            const regionLayer = L.geoJSON(selectedRegionFeature);
            this.map.fitBounds(regionLayer.getBounds().pad(0.1));
        }

        // Hide regions by default
        if (!this.showRegions) {
            this.regionsLayer.remove();
        }
    }

    private addCountryBorder(): void {
        if (!this.map) return;

        // Remove existing country border if present
        this.removeCountryBorder();

        // Create country border from custom GeoJSON
        this.countryBorderLayer = L.geoJSON(customCountryBorder as any, {
            style: {
                color: '#b91c1c',
                weight: 3,
                opacity: 0.8,
                fill: false,
            },
        });

        this.countryBorderLayer.addTo(this.map);
        this.countryBorderLayer.bringToFront();
    }

    private removeCountryBorder(): void {
        if (this.countryBorderLayer && this.map) {
            this.countryBorderLayer.remove();
        }
    }

    private createRegionPolygon(coordinates: any[], regionNameAr: string, regionId: string): void {
        // Reverse lat/lng as noted by user (GeoJSON has [lng, lat] format) and keep holes
        const rings = coordinates.map((ring: number[][]) =>
            ring.map((coord: number[]) => [coord[1], coord[0]] as L.LatLngExpression),
        );

        const polygon = L.polygon(rings, {
            color: '#2563eb',
            weight: 2,
            fillColor: '#3b82f6',
            fillOpacity: 0.2,
            className: 'region-polygon',
        });

        // Add popup with region name
        polygon.bindPopup(`
            <div style="font-weight: 600; font-size: 14px;">
                ${this.escapeHtml(regionNameAr)}
            </div>
            <div style="font-size: 12px; color: #666; margin-top: 4px;">
                ${this.escapeHtml(regionId)}
            </div>
        `);

        // Add tooltip on hover
        polygon.bindTooltip(regionNameAr, {
            permanent: false,
            direction: 'center',
            className: 'region-tooltip',
        });

        polygon.addTo(this.regionsLayer);
    }

    toggleRegions(): void {
        if (!this.map) return;

        this.showRegions = !this.showRegions;

        if (this.showRegions) {
            this.regionsLayer.addTo(this.map);
        } else {
            this.regionsLayer.remove();
        }
    }

    onRegionChange(): void {
        if (!this.map) return;

        // Reload regions with new filter
        this.loadRegions();

        // If regions are visible, ensure the layer is added
        if (this.showRegions && !this.map.hasLayer(this.regionsLayer)) {
            this.regionsLayer.addTo(this.map);
        }
    }

    private escapeHtml(input: string): string {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Reload markers when searchTerm input changes
        if (changes['searchTerm'] && this.map) {
            this.loadMarkers();
        }
    }

    /**
     * Enable map click selection for coordinates
     */
    private enableMapClickSelection(): void {
        if (!this.map) return;

        this.map.on('click', (event: L.LeafletMouseEvent) => {
            const { lat, lng } = event.latlng;
            const coordinates = `${lat}, ${lng}`;

            // Remove previous selection marker
            if (this.selectedMarker) {
                this.markersLayer.removeLayer(this.selectedMarker);
            }

            // Create a new selection marker
            const icon = L.icon({
                iconUrl:
                    'data:image/svg+xml;base64,' +
                    btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
                    <path d="M16 0C7.16 0 0 7.16 0 16c0 8 16 24 16 24s16-16 16-24c0-8.84-7.16-16-16-16z" fill="#ef4444" stroke="white" stroke-width="1.5"/>
                    <circle cx="16" cy="16" r="6" fill="white" opacity="0.85"/>
                </svg>`),
                iconSize: [32, 40],
                iconAnchor: [16, 40],
                popupAnchor: [0, -40],
            });

            this.selectedMarker = L.marker([lat, lng], { icon });
            this.selectedMarker.bindPopup(`Selected: ${coordinates}`);
            this.markersLayer.addLayer(this.selectedMarker);
            this.selectedMarker.openPopup();

            // Emit the selected coordinates
            this.markerSelected.emit(coordinates);
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.removeCountryBorder();
        this.map?.remove();
    }
}
