import React, { useEffect, useState } from "react";
import { Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import polyline from "@mapbox/polyline";

const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjExOWEwNTA1NTQxNDRkNDM5MWI0MjBiZmRjN2NlMjAyIiwiaCI6Im11cm11cjY0In0=";

export default function RoutePolyline({ routeId, currentPos }) {
  const [routePositions, setRoutePositions] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    if (!routeId) return;

    const fetchRouteData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/route/${routeId}/stops/admin`
        );
        const stopData = await res.json();

        if (!stopData || stopData.length < 2) return;
        setStops(stopData);
        let coordinates = stopData.map((stop) => [
          stop.longitude,
          stop.latitude,
        ]);
        if (currentPos) {
          const startPoint = [currentPos.lng, currentPos.lat];
          coordinates = [startPoint, ...coordinates];
        }

        const orsResponse = await fetch(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: ORS_API_KEY,
            },
            body: JSON.stringify({
              coordinates: coordinates,
              instructions: false,
            }),
          }
        );

        const orsData = await orsResponse.json();

        if (orsData.features && orsData.features.length > 0) {
          const geometry = orsData.features[0].geometry.coordinates;

          // Đảo ngược lại thành [Lat, Lng] để Leaflet hiểu
          const leafletPositions = geometry.map((coord) => [
            coord[1],
            coord[0],
          ]);

          setRoutePositions(leafletPositions);
        }
      } catch (err) {
        console.error("Lỗi vẽ tuyến đường:", err);
      }
    };

    fetchRouteData();
  }, [routeId]);

  if (routePositions.length === 0) return null;

  return (
    <>
      {/* 1. Vẽ đường bám theo mặt đất (Màu xanh đậm) */}
      <Polyline
        positions={routePositions}
        pathOptions={{
          color: "#2563EB",
          weight: 5,
          opacity: 0.8,
          lineJoin: "round",
        }}
      />

      {/* 2. Vẽ các Trạm dừng (Màu đỏ) */}
      {stops.map((stop, index) => (
        <Marker
          key={`stop-${index}`}
          position={[stop.latitude, stop.longitude]}
          icon={L.divIcon({
            className:
              "bg-white border-2 border-red-500 rounded-full font-bold text-xs flex items-center justify-center",
            html: `<span style="margin-top: 1px;">${stop.order}</span>`,
            iconSize: [24, 24],
          })}
        >
          <Popup>
            <b>Trạm số {stop.order}</b>
            <br />
            {stop.address}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
