
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRoutePath } from '../../../api/map.path.js';
import { io } from 'socket.io-client';
import BusMarker from './BusMarker.jsx';
import StopMarker from './StopMarker.jsx';

export const socket = io("http://localhost:5000", { autoConnect: false });
export function getPassedPath(fullPath, currentPos) {
    // Tìm điểm trên path gần với vị trí hiện tại nhất
    let minDist = Infinity;
    let idx = 0;

    fullPath.forEach((point, i) => {
        const dist = Math.hypot(point[0] - currentPos[0], point[1] - currentPos[1]);
        if (dist < minDist) {
            minDist = dist;
            idx = i;
        }
    });

    // Trả về quãng đường đã đi: từ đầu đến index gần nhất
    return fullPath.slice(0, idx + 1);
}

function MapComponent(props) {
    const baseURL = "http://localhost:5000";
    const { schedules } = props;
    const [routes, setRoutes] = React.useState([]);
    const uniqueStops = React.useRef(new Map());
    const [busTracking, setBusTracking] = React.useState([]);
    const [nextStopInfo, setNextStopInfo] = React.useState([]);

    React.useEffect(() => {
        if (!nextStopInfo || nextStopInfo.length === 0)
            return;
        console.log(nextStopInfo);
    }, [nextStopInfo])

    React.useEffect(() => {// Update trạng thái trạm (Đã đến/Chưa đến) trong mỗi route sau mỗi lần cập nhật vị trí xe
        if (!busTracking || busTracking.length === 0)
            return;
        if (!routes || routes.length === 0)
            return;

        const updatedRoutes = routes.map(route => {
            const busPos = busTracking.find(bus => bus.bus_id === route.bus_id);
            if (!busPos)
                return route;
            const passedPath = getPassedPath(route.path, [busPos.latitude, busPos.longitude]);
            const updatedStops = route.stops.map(stop => {
                if (!stop.isPassed) {
                    const nextStopPath = getPassedPath(route.path, [stop.latitude, stop.longitude]);
                    if (passedPath.length >= nextStopPath.length) {
                        return { ...stop, isPassed: true };
                    }
                }
                return stop;
            });
            const hasChanged = updatedStops.some((s, i) => s !== route.stops[i]);
            if (!hasChanged)
                return route;
            return { ...route, stops: updatedStops };
        });
        const routeHasChanged = updatedRoutes.some((r, i) => r !== routes[i]);
        if (!routeHasChanged)
            return;
        setRoutes(updatedRoutes);

    }, [busTracking])

    React.useEffect(() => {// Update thông tin trạm tiếp theo xe sẽ đến 
        if (!busTracking || busTracking.length === 0)
            return;
        if (!routes || routes.length === 0)
            return;
        const nextStopInfo = routes.map(route => {
            const nextStops = route.stops.filter(stop => !stop.isPassed);
            if (nextStops.length === 0)
                return { bus_id: route.bus_id, stop: null, eta: null }

            return { bus_id: route.bus_id, stop: nextStops[0] };
        })
        setNextStopInfo(nextStopInfo);
    }, [routes])

    React.useEffect(() => {
        if (!schedules || schedules.length === 0)
            return;

        if (!socket.connected) // Kết nối 1 lần vào server socket
            socket.connect();

        const uniqueSchedules = Array.from(
            new Map(schedules.map((schedule) => [schedule.schedule.bus_id, schedule])).values()
        )

        socket.on("connect", () => {
            console.log("✅ Connected to server");
        });

        // Tham gia room trong socket
        uniqueSchedules.forEach((schedule) => {
            socket.emit("join_bus", schedule.schedule.bus_id);
        })

        // Lấy Data Location của xe và gán vào useState busTracking
        socket.on("bus_location_update", (data) => {
            const dataArray = Array.isArray(data) ? data : [data];
            setBusTracking(prev => {
                const updated = [...prev];
                dataArray.forEach(d => {
                    const idx = updated.findIndex(b => b.bus_id === d.bus_id);
                    if (idx !== -1) updated[idx] = d;
                    else updated.push(d);
                });
                return updated;
            });
        });

        return () => {
            socket.off("bus_location_update");
            //     socket.disconnect();
        };

    }, [schedules])

    React.useEffect(() => {
        if (!schedules || schedules.length === 0) {
            console.log("No schedules found");
            return;
        }
        const fetchStopsByRoutes = async () => {
            try {
                const res = await Promise.allSettled(
                    schedules.map(async (s) => {
                        const stopsRes = await fetch(`${baseURL}/api/stops/route/${s.schedule.route_id}`);
                        if (!stopsRes)
                            console.log(`No stops from route ${s.schedule.route_id}`);
                        const stops = await stopsRes.json();
                        return { route_id: s.schedule.route_id, stops, bus_id: s.schedule.bus_id };
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
                    const sortedStops = [...route.stops].sort((a, b) => a.order - b.order);
                    const stops = sortedStops.map((stop) => {
                        return { ...stop, isPassed: false }
                    })
                    return { ...route, stops: stops }
                })

                const routesData = await Promise.all(sortedStopsRoutes.map(async (route) => {
                    const pathRes = await fetchRoutePath(route.stops);
                    return { ...route, path: pathRes };
                }))


                setRoutes(routesData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStopsByRoutes();
    }, [schedules])
    return <div className="w-full h-full relative">
        <MapContainer center={[10.77, 106.7]} zoom={13} className="h-full w-full z-40">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />
            {
                uniqueStops.current.size > 0 && (
                    Array.from(uniqueStops.current.values()).map(stop => (
                        <StopMarker key={stop.stop_id} stop_id={stop.stop_id} latitude={stop.latitude} longitude={stop.longitude} />
                    ))

                )
            }
            {
                routes.length > 0 && (

                    routes.map((route) => (
                        route.path && (
                            <Polyline
                                key={route.route_id}
                                pathOptions={{ color: 'grey', weight: 6 }}
                                positions={route.path}
                            />
                        )

                    ))
                )
            }
            {
                busTracking.length > 0 && (
                    busTracking.map((bus) => {
                        return <BusMarker
                            key={bus.bus_id}
                            bus_id={bus.bus_id}
                            latitude={bus.latitude}
                            longitude={bus.longitude}
                        ></BusMarker>
                    })
                )
            }
            {
                routes.length > 0 && busTracking.length > 0 && (

                    routes.map(route => {
                        // Tìm vị trí xe tương ứng với route
                        const busPos = busTracking.find(bus => bus.bus_id === route.bus_id);
                        if (!busPos || !route.path)
                            return null;

                        return (
                            <Polyline
                                key={`${route.route_id}-${busPos.bus_id}`}
                                positions={getPassedPath(route.path, [busPos.latitude, busPos.longitude])}
                                pathOptions={{ color: 'blue', weight: 5 }}
                            />
                        );
                    })

                )
            }


        </MapContainer>
        <div className="bg-white rounded-xl m-4 absolute bottom-4 left-4 z-50 w-1/4 h-1/3 p-4 flex flex-col border border-gray-500">
            <span className="text-2xl font-semibold pb-2">Thông tin xe</span>
            <div className="text-lg flex flex-col">
                <span>Biển số xe: </span>
                <span>Tài xế: </span>
                <span>Trạm dừng tiếp theo: </span>
                <span>Thời gian dự kiến:</span>
                <span>Trạng thái: </span>
            </div>

        </div>
    </div>

}
export default MapComponent;