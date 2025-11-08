import polyline from "@mapbox/polyline";

const heiGIT_API_KEY= "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImNmZGY0ZmJiMDE1OTQxNjFiNjk5MDY1YTM0ZmZjYjhmIiwiaCI6Im11cm11cjY0In0=";
const heiGIT_BASE_URL="https://api.openrouteservice.org"


export const fetchRoutePath = async (stops) => {
  if (!stops || stops.length < 2) return [];

  try {
    const coordinates = stops.map((s) => [s.longitude, s.latitude]); // ORS yêu cầu [lng, lat]
    const res = await fetch(heiGIT_BASE_URL+"/v2/directions/driving-car", {
      method: "POST",
      headers: {
        "Authorization": heiGIT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinates,
      }),
    });

    const data = await res.json();

    if (!data?.routes?.[0]?.geometry) throw new Error("No route geometry");
    return polyline.decode(data.routes[0].geometry); // trả về [lat, lng]
  } catch (err) {
    console.error("❌ Error fetching route path:", err);
    return [];
  }
};