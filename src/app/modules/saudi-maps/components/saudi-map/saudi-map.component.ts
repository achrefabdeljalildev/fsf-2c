import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { Subscription } from 'rxjs';
import { SaudiMapService } from '../../services/saudi-map.service';
import { MapMarker } from '../../models/map-marker.model';

@Component({
    selector: 'app-saudi-map',
    templateUrl: './saudi-map.component.html',
    styleUrls: ['./saudi-map.component.scss'],
    standalone: false,
})
export class SaudiMapComponent implements AfterViewInit {
    private map?: L.Map;
    private markersLayer = L.layerGroup();
    private sub?: Subscription;
    isLoading: boolean = true;
    errorMessage: string = '';

    // Simplified border polygon for Saudi Arabia (approximate outline)
    private readonly saudiBorderCoords: L.LatLngExpression[] = [
        [32.1, 35.7],
        [31.0, 37.5],
        [30.0, 39.0],
        [30.5, 40.5],
        [31.2, 44.0],
        [28.5, 48.5],
        [27.0, 50.0],
        [24.5, 50.0],
        [22.0, 55.0],
        [18.0, 54.5],
        [16.5, 52.0],
        [16.0, 48.0],
        [17.5, 46.5],
        [18.5, 44.0],
        [19.5, 42.0],
        [21.0, 38.0],
        [24.0, 36.0],
        [27.0, 35.5],
        [30.0, 35.0],
    ];

    // Mock data for development (remove when backend is ready)
    private mockMarkers: MapMarker[] = [
        {
            id: 1,
            name: 'الرياض - مقر الحكومة',
            lat: 24.7136,
            lng: 46.6753,
            description: 'العاصمة والمقر الرئيسي للحكومة',
        },
        {
            id: 2,
            name: 'جدة - الميناء الرئيسي',
            lat: 21.5433,
            lng: 39.1728,
            description: 'مركز تجاري رئيسي على البحر الأحمر',
        },
        {
            id: 4,
            name: 'مكة المكرمة',
            lat: 21.4267,
            lng: 39.8263,
            description: 'المدينة المقدسة والحرم المكي',
        },
        {
            id: 5,
            name: 'المدينة المنورة',
            lat: 24.4672,
            lng: 39.5936,
            description: 'المدينة المنورة والحرم النبوي',
        },
        {
            id: 6,
            name: 'الطائف',
            lat: 21.2744,
            lng: 40.4158,
            description: 'منتجع صيفي في الجبال',
        },
        {
            id: 7,
            name: 'القصيم - بريدة',
            lat: 26.3263,
            lng: 44.0255,
            description: 'مركز زراعي وتجاري في الوسط',
        },
    ];

    constructor(private saudiMapService: SaudiMapService) {}

    ngAfterViewInit(): void {
        // Define strict bounds for Saudi Arabia (approximate)
        const saudiBounds = L.latLngBounds(
            L.latLng(16.0, 34.5), // SW
            L.latLng(32.2, 55.6667), // NE
        );

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

        // Draw border outline
        this.addSaudiBorder();
        // Visually mask everything outside Saudi (optional, lightweight)
        this.addOutsideMask();

        // Load markers from database or use mock data
        this.loadMarkers();

        // Ensure Leaflet recalculates dimensions after view init
        setTimeout(() => this.invalidateMapSize(), 300);
    }

    private loadMarkers(): void {
        this.isLoading = true;
        this.errorMessage = '';

        // TODO: Remove this condition and use API only when backend is ready
        const useMockData = true;

        if (useMockData) {
            // Use mock data for development
            setTimeout(() => {
                this.renderMarkers(this.mockMarkers);
                this.isLoading = false;
                this.invalidateMapSize();
            }, 500); // Simulate network delay
        } else {
            // Use real API when backend is ready
            this.sub = this.saudiMapService.getMapMarkers().subscribe({
                next: (response) => {
                    const markers = response.data || [];
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
    }

    myFunction() {
        alert('Marker clicked!');
    }

    private renderMarkers(markers: MapMarker[] | any[]): void {
        this.markersLayer.clearLayers();
        const leafletMarkers: L.Marker[] = [];

        for (const m of markers) {
            // Get coordinates - handle both lat/lng and latitude/longitude
            const lat = m.lat ?? m.latitude;
            const lng = m.lng ?? m.longitude;

            // Basic validation
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
                continue;
            }

            const marker = L.marker([lat, lng]);

            const popupHtml = `
            <div style="min-width:200px">
                <div style="font-weight:600; font-size: 14px; margin-bottom: 8px;" onclick="${this.myFunction}">
                    ${this.escapeHtml(m.name || m.nameAr || 'موقع')}
                </div>
                ${
                    m.description || m.descriptionAr
                        ? `<div style="margin-top:6px; font-size: 12px; color: #666;">
                                ${this.escapeHtml(m.description || m.descriptionAr)}
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

    private addSaudiBorder(): void {
        if (!this.map) return;
        const border = L.polygon(this.saudiBorderCoords, {
            color: '#2563eb',
            weight: 1,
            fillColor: '#fff',
            fillOpacity: 0,
        });
        border.addTo(this.map);
        border.bringToFront();
    }

    /**
     * Adds a simple mask covering the world outside Saudi Arabia
     * so only Saudi appears visually. Uses a polygon with a hole.
     */
    private addOutsideMask(): void {
        if (!this.map) return;
        const world: L.LatLngExpression[] = [
            [90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180],
        ];
        const mask = L.polygon([world, this.saudiBorderCoords], {
            stroke: false,
            color: 'transparent',
            fillColor: '#ffffff', // match app background
            fillOpacity: 0.8,
            interactive: false,
        });
        mask.addTo(this.map);
        mask.bringToBack();
    }

    /**
     * Force Leaflet to recalculate container size to avoid side positioning glitches.
     */
    private invalidateMapSize(): void {
        if (this.map) {
            this.map.invalidateSize();
        }
    }

    private escapeHtml(input: string): string {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        this.map?.remove();
    }
}
