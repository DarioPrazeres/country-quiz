import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, GeoJSON as LeafletGeoJSON } from "leaflet";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface RecenterMapProps {
  latlng: LatLngExpression;
  zoom?: number;
}

function RecenterMap({ latlng, zoom = 5 }: RecenterMapProps) {
  const map = useMap();

  useEffect(() => {
    if (latlng) {
      map.setView(latlng, zoom);
    }
  }, [latlng, zoom, map]);

  return null;
}

interface CountryMapProps {
  latlng: LatLngExpression;
  name?: string;
}

function CountryMap({ latlng, name }: CountryMapProps) {
  const [countries, setCountries] = useState<GeoJSON.GeoJsonObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    )
      .then((res) => res.json())
      .then((data: GeoJSON.GeoJsonObject) => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <div className="country-map-container">
      
      
      <div className="country-map-wrapper">
        {isLoading && (
          <div className="map-loading-overlay">
            <div className="map-loading-spinner"></div>
            <span>Loading map...</span>
          </div>
        )}
        
        <MapContainer
          center={latlng}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer
            url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; Carto'
          />

          {countries && (
            <GeoJSON
              data={countries}
              style={() => ({
                color: "#4f46e5",
                weight: 1,
                fillOpacity: 0,
                opacity: 0.6,
              })}
            />
          )}

          <Marker position={latlng} />

          <RecenterMap latlng={latlng} zoom={4} />
        </MapContainer>
      </div>
      
      <div className="map-attribution">
        © OpenStreetMap • © Carto
      </div>
    </div>
  );
}

export default CountryMap;