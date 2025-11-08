
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRoutePath } from '../../../api/map.path.js';

function MapComponent(props) {
    const baseURL = "http://localhost:5000/api";
    const { schedules } = props;
    const [routes, setRoutes] = React.useState([]);
    const uniqueStops = React.useRef(new Map());
    const [paths, setPaths] = React.useState([]);
    React.useEffect(() => {
        if (!routes || routes.length === 0)
            return;
        console.log(routes);
        const fetchPaths = async () => {
            const pathsRes = await Promise.all(routes.map(async (route) => {
                const pathRes = await fetchRoutePath(route.stops);
                return {route_id: route.route_id, path: pathRes };
            }));
            setPaths(pathsRes);
        }
        fetchPaths();

    }, [routes])
    React.useEffect(() => {
        if (!schedules || schedules.length === 0) {
            console.log("No schedules found");
            return;
        }
        const fetchStopsByRoutes = async () => {
            try {
                const res = await Promise.allSettled(
                    schedules.map(async (s) => {
                        const stopsRes = await fetch(`${baseURL}/stops/route/${s.schedule.route_id}`);
                        if (!stopsRes)
                            console.log(`No stops from route ${s.schedule.route_id}`);
                        const stops = await stopsRes.json();
                        return { route_id: s.schedule.route_id, stops };
                    })
                );
                const fulfilled = res.map((r) => {
                    if (r.status === "fulfilled") {
                        r.value.stops.forEach((stop) => {
                            uniqueStops.current.set(stop.stop_id, stop);
                        });
                        return r.value;
                    }
                    else
                        return { ...r, stops: "N/A" };
                });
                const uniqueRoutes = Array.from(
                    new Map(
                        fulfilled
                            .filter((r) => r.stops !== "N/A")
                            .map((r) => [r.route_id, r])
                    ).values()
                );
                const sortedStopsRoutes = uniqueRoutes.map((route) => {
                    const sortedStops  = [...route.stops].sort((a, b) => a.order - b.order);
                    return { ...route, stops: sortedStops }
                })
                setRoutes(sortedStopsRoutes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStopsByRoutes();
    }, [schedules])
    return <div className="w-full h-full">
        <MapContainer center={[10.77, 106.7]} zoom={13} className="h-full w-full">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />
            {
                uniqueStops.current.size > 0 && (
                    Array.from(uniqueStops.current.values()).map(stop => (
                        <Marker key={stop.stop_id} position={[stop.latitude, stop.longitude]}>
                            <Popup>
                                {stop.stop_name}
                            </Popup>
                        </Marker>
                    ))
                )
            }
            {
                paths.length > 0 && (
                    paths.map((path) => (
                        <Polyline
                            key={path.route_id}
                            pathOptions={{ color: 'grey', weight: 5 }}
                            positions={path.path}
                        />  
                    ))
                )
            }
        </MapContainer>
    </div>

}
export default MapComponent;