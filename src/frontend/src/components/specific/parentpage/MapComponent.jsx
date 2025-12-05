
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BusMarker from './BusMarker.jsx';
import StopMarker from './StopMarker.jsx';
import BusInfo from './BusInfo.jsx';
import { fetchRoutePath } from '../../../api/map.path.js';
import MapEvents from './MapEvents.jsx';
import api from '../../../api/sql.api.js';
const status =
{
    "in progress": "Đang di chuyển",
    "pending": "Chưa khởi hành",
    "completed": "Đã kết thúc",
    "incident": "Gặp sự cố",
}
function MapComponent({ busData, selectedBus, setSelectedBus, registerReqBus, socket }) {

    const uniqueStops = React.useRef(new Map());
    const [busPos, setBusPos] = React.useState([]);
    const [paths, setPaths] = React.useState([]);
    const initializedBusPos = React.useRef(false);


    const handleSelectBus = React.useCallback((bus_id, map) => {
        const info = busData.find(bus => bus.bus_id === bus_id);
        const data = busPos.find(b => b.bus_id === bus_id);
        const nextStop = data.next_stop;
        const eta = data.eta;
        const status = data.status;

        setSelectedBus({ bus: info, next_stop: nextStop, eta: eta, status: status });

        if (!map || map === undefined) {
            console.log("map is not ready");
            return;
        }
    },[busPos,busData]
    )
    React.useEffect(() => {
        if (!paths || paths.length === 0)
            return;

        if (!socket) return;

        // Join room tương ứng với bus_id trên socket và gửi data về tuyến đường
        for (const path of paths) {
            const bus = busData.find(bus => bus.bus_id === path.bus_id)
            const stops = bus.stops;
            const schedule_id = bus.schedule_id

            socket.emit("parent:join_bus", {
                bus_id: path.bus_id,
                path: path.path,
                stops: stops,
                schedule_id: schedule_id,
                status: bus.status
            })
        }

        // Bắt event khi server gửi data cho client (pos, pased_path)
        socket.on("parent:bus_data", (data) => {
            const { bus_id, pos, passed_path, next_stop, eta, status } = data;
            setBusPos(prev => {
                const newState = [...prev];
                const idx = newState.findIndex(b => b.bus_id === bus_id);

                if (idx >= 0) {
                    newState[idx] = { ...newState[idx], pos, passed_path, next_stop, eta, status };
                } else {
                    newState.push({ bus_id, pos, passed_path, next_stop, eta, status });
                }
                return newState;
            });

        });

        return () => {
            socket.off("parent:bus_data");
        }
    }, [paths])

    React.useEffect(() => {
        if (!busPos || busPos.length === 0)
            return;
        if (selectedBus !== null) {
            const bus = busPos.find(b => b.bus_id === selectedBus.bus.bus_id);
            if (bus.next_stop !== null) {
                if (bus.eta !== selectedBus.eta || bus.status !== selectedBus.status)
                    setSelectedBus(prev => {
                        return { ...prev, next_stop: bus.next_stop, eta: bus.eta, status: bus.status };
                    });
            } else {
                setSelectedBus(prev => {
                    return { ...prev, status: bus.status, next_stop: bus.next_stop, eta: bus.eta };
                });
            }
        }

    }, [busPos])

    React.useEffect(() => {
        if (!busData || busData.length === 0)
            return;
        console.log("bus data: ", busData);

        const getPathsStops = async () => {
            for (const bus of busData) {

                // Lấy [lat,lng] các tuyến đường qua các trạm dừng 
                const path = await fetchRoutePath(bus.stops);
                setPaths(prev => {
                    const idx = prev.findIndex(b => b.bus_id === bus.bus_id)
                    if (idx >= 0) {
                        return prev;
                    } else {
                        return [...prev, { bus_id: bus.bus_id, path: path }];
                    }
                });

                // Lấy data trạm dừng để hiện lên map
                for (const stop of bus.stops) {
                    uniqueStops.current.set(stop.stop_id, stop);
                }
            }
        }
        getPathsStops();

        if (initializedBusPos.current)
            return

        initializedBusPos.current = true;

        const initBusPos = async () => {
            for (const bus of busData) {
                const location_track = await api.get(`/buses/${bus.bus_id}/location`);
                setBusPos(prev => {
                    const idx = prev.findIndex(b => b.bus_id === location_track.data.bus_id);
                    if (idx < 0) {
                        return [...prev, { bus_id: location_track.data.bus_id, pos: [location_track.data.latitude, location_track.data.longitude], passed_path: [], next_stop: null, eta: null, status: null }];
                    }
                    return prev;
                });
            }
        }
        initBusPos();

    }, [busData])

    React.useEffect(() => {
        registerReqBus(handleSelectBus);
    }, [handleSelectBus]);

    return <div className="w-full h-full relative box-border">
        <MapContainer
            center={[10.77, 106.7]}
            zoom={13}
            className="h-full w-full z-40 box-border">

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />
            {
                uniqueStops.current.size > 0 && (
                    Array.from(uniqueStops.current.values()).map(stop => (
                        <StopMarker key={stop.stop_id} stop_id={stop.stop_id} latitude={stop.latitude} longitude={stop.longitude} address={stop.address}/>
                    ))

                )
            }
            {
                paths.length > 0 && (

                    paths.map((path) => (
                        path.path && (
                            <Polyline
                                key={path.bus_id}
                                pathOptions={{ color: 'grey', weight: 6 }}
                                positions={path.path}
                            />
                        )

                    ))
                )
            }
            {
                busPos !== undefined && busPos.length > 0 && (
                    busPos.map((bus) => {
                        return <React.Fragment key={bus.bus_id}>
                            <BusMarker
                                bus_id={bus.bus_id}
                                latitude={bus.pos[0]}
                                longitude={bus.pos[1]}
                                onClick={handleSelectBus}
                                selectedBus={selectedBus}
                            ></BusMarker>
                            {bus.passed_path && bus.passed_path.length > 0 && (
                                <Polyline
                                    positions={bus.passed_path}
                                    pathOptions={{ color: 'blue', weight: 5 }}
                                />
                            )}
                        </React.Fragment>
                    })
                )
            }
            <MapEvents selectedBus={selectedBus} setSelectedBus={setSelectedBus}></MapEvents>

        </MapContainer>
        {
            selectedBus && (
                <BusInfo license_plate={selectedBus.bus.license_plate}
                    driver_name={selectedBus.bus.driver_name}
                    phone={selectedBus.bus.driver_phone}
                    next_stop={selectedBus.next_stop}
                    eta={selectedBus.eta}
                    status={status[selectedBus.status]}
                ></BusInfo>
            )
        }

    </div>

}
export default MapComponent;