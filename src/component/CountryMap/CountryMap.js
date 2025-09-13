import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige o problema do ícone do Marker
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Componente auxiliar para mudar a visão do mapa sempre que latlng mudar
function RecenterMap({ latlng, zoom = 5 }) {
  const map = useMap();
  useEffect(() => {
    if (latlng) {
      map.setView(latlng, zoom);
    }
  }, [latlng, zoom, map]);
  return null;
}

function CountryMap({ latlng, name }) {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    // Carrega GeoJSON com fronteiras dos países
    fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <MapContainer
      center={latlng}
      zoom={5}
      style={{ height: "300px", width: "400px" }}
    >
      {/* Fundo sem labels */}
      <TileLayer
        url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; Carto'
      />

      {/* Fronteiras dos países */}
      {countries && (
        <GeoJSON
          data={countries}
          style={() => ({
            color: "black",   // cor da borda
            weight: 1,        // espessura
            fillOpacity: 0    // sem preenchimento
          })}
        />
      )}

      {/* Marcador */}
      <Marker position={latlng} />

      {/* Recentrar o mapa sempre que latlng mudar */}
      <RecenterMap latlng={latlng} zoom={5} />
    </MapContainer>
  );
}

export default CountryMap;
