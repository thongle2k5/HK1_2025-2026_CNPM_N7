
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';
import BusMarker from './BusMarker.jsx';
import StopMarker from './StopMarker.jsx';
import BusInfo from './BusInfo.jsx';
import { fetchRoutePath } from '../../../api/map.path.js';

export const socket = io("http://localhost:5000", {
    autoConnect: false,
});

function MapComponent({ busData }) {
    const uniqueStops = React.useRef(new Map());
    const [busPos, setBusPos] = React.useState([]);
    const [selectedBus, setSelectedBus] = React.useState(null);
    const [paths, setPaths] = React.useState([]);

    const handleSelectBus = (bus_id,map) => {
        const info = busData.find(bus => bus.bus_id === bus_id);
        const data = busPos.find(b => b.bus_id === bus_id);
        const nextStop = data.next_stop;
        const eta = data.eta;

        setSelectedBus({ bus: info, next_stop: nextStop, eta: eta });
        if(!map || map ===undefined)
        {
            console.log("map is not ready");
            return;
        }

        map.flyTo(data.pos, 17, { duration: 1 })
    }

    React.useEffect(() => {
        if (!paths || paths.length === 0)
            return;
        if (!socket.connected)
            socket.connect();

        // Join room tương ứng với bus_id trên socket và gửi data về tuyến đường
        socket.on("connect", () => {
            for (const path of paths) {
                const stops = busData.find(bus => bus.bus_id === path.bus_id).stops;
                socket.emit("parent:join_bus", {
                    bus_id: path.bus_id,
                    path: path.path,
                    stops: stops,
                })
            }
        })

        // Bắt event khi server gửi data cho client (pos, pased_path)
        socket.on("parent:bus_data", (data) => {
            const { bus_id, pos, passed_path, next_stop, eta } = data;
            setBusPos(prev => {
                const idx = prev.findIndex(b => b.bus_id === bus_id);
                if (idx >= 0) {
                    prev[idx] = { ...prev[idx], pos: pos, passed_path: passed_path, next_stop: next_stop, eta: eta };
                    return [...prev];
                } else {
                    return [...prev, { bus_id: bus_id, pos: pos, passed_path: passed_path, next_stop: next_stop, eta: eta }];
                }
            });

        });

        return () => {
            socket.off("parent:bus_data");
        }
    }, [paths])

    // React.useEffect(() => {
    //     if (!busPos || busPos.length === 0)
    //         return;
    // }, [busPos])

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

    }, [busData])

    return <div className="w-full h-full relative">
        <MapContainer
            center={[10.77, 106.7]}
            zoom={13}
            className="h-full w-full z-40">

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
                busPos.length > 0 && (
                    busPos.map((bus) => {
                        return <React.Fragment key={bus.bus_id}>
                            <BusMarker
                                bus_id={bus.bus_id}
                                latitude={bus.pos[0]}
                                longitude={bus.pos[1]}
                                onClick={ handleSelectBus }
                            ></BusMarker>
                            <Polyline
                                positions={bus.passed_path}
                                pathOptions={{ color: 'blue', weight: 5 }}
                            />
                        </React.Fragment>
                    })
                )
            }
        </MapContainer>
        {
            selectedBus && (
                <BusInfo license_plate={selectedBus.bus.license_plate}
                    driver_name={selectedBus.bus.driver_name}
                    phone={selectedBus.bus.driver_phone}
                    next_stop={selectedBus.next_stop.address}
                    eta={selectedBus.eta}
                ></BusInfo>
            )
        }

    </div>

}
export default MapComponent;