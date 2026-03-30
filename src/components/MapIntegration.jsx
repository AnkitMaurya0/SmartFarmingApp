import { useEffect, useRef } from 'react';
import { t } from '../utils/translations';

export default function MapIntegration({ lang, location, locationName }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const s = t[lang];

  const lat = location?.lat || 28.6;
  const lon = location?.lon || 77.2;

  useEffect(() => {
    // Small delay ensures the DOM element is fully mounted and sized
    const timer = setTimeout(() => {
      if (!mapRef.current || mapInstance.current) return;

      import('leaflet').then((L) => {
        const leaflet = L.default || L;

        // Guard: check container is still mounted
        if (!mapRef.current) return;

        const map = leaflet.map(mapRef.current, {
          center: [lat, lon],
          zoom: 13,
          zoomControl: true,
          attributionControl: true,
        });

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
          maxZoom: 19,
        }).addTo(map);

        const icon = leaflet.divIcon({
          className: '',
          html: '<div style="font-size:2rem;filter:drop-shadow(0 2px 6px rgba(74,222,128,0.8))">📍</div>',
          iconSize: [36, 36],
          iconAnchor: [18, 36],
        });

        leaflet.marker([lat, lon], { icon })
          .addTo(map)
          .bindPopup(`<b>📍 ${locationName || 'Your Field'}</b><br/>Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`)
          .openPopup();

        mapInstance.current = map;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [lat, lon, locationName]);

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '1.25rem' }}>🗺️</span>
        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{s.map}</span>
        {locationName && (
          <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            📍 {locationName}
          </span>
        )}
      </div>
      <div
        ref={mapRef}
        id="leaflet-map"
        style={{ height: 340, width: '100%', background: '#1a2e1a' }}
      />
    </div>
  );
}
