"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { formatPrice } from "@/lib/utils";

export default function LeafletMap({
  lat,
  lng,
  title,
  price,
}: {
  lat: number;
  lng: number;
  title: string;
  price: number;
}) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: "aframe-pin",
        html: `<div class="aframe-pin-inner"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M11 5.5 16.5 16h-11L11 5.5Z"/></svg></div>`,
        iconSize: [44, 44],
        iconAnchor: [11, 40],
        popupAnchor: [11, -36],
      }),
    [],
  );

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full min-h-[320px] w-full"
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          <div style={{ minWidth: 140 }}>
            <strong style={{ fontFamily: "inherit", fontSize: 14 }}>{title}</strong>
            <div style={{ marginTop: 4, color: "#b93c1e", fontWeight: 700 }}>
              {formatPrice(price)} <span style={{ color: "#8a7e6e", fontWeight: 500 }}>/ gecə</span>
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
