import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
const busIcon = L.ExtraMarkers.icon({
    icon: 'fa-bus',
    markerColor: 'blue',    // màu nền
    shape: 'circle',          // hình giọt / circle / square / star
    prefix: 'fa',             // fontawesome
    iconColor: 'yellow',       // màu icon
    innerHTML: '',            // thêm HTML nếu muốn
});

const BusMarker = ({ bus_id, latitude, longitude, onClick, selectedBus }) => {
    const markerRef = React.useRef(null);
    const map = useMap();

    React.useEffect(() => {
        if (!markerRef.current) {
            // 🔹 Tạo marker chỉ một lần
            const marker = L.marker([latitude, longitude], {
                icon: busIcon,
                zIndexOffset: 2000,

            }).addTo(map);

            marker.bindTooltip(`🚌 BUS ${bus_id}`, {
                permanent: true,
                direction: 'top',
                offset: [0, -36],

            });
            markerRef.current = marker;
        } else {
            // 🔹 Cập nhật vị trí marker (popup vẫn giữ nguyên)
            markerRef.current.setLatLng([latitude, longitude]);
        }

    }, [latitude, longitude, bus_id, map]);
    React.useEffect(() => {
        if (!markerRef.current) return;

        // Gỡ event cũ
        markerRef.current.off('click');

        // Gắn event mới
        markerRef.current.on('click', (e) => {
            L.DomEvent.stopPropagation(e);
            onClick(bus_id, map);
        });

    }, [onClick, bus_id, map]);

    React.useEffect(() => {
        if (selectedBus !== null) {
            if (selectedBus.bus.bus_id === bus_id) {
                map.setView([latitude, longitude], 17);
            }
        }

    }, [latitude, longitude, selectedBus]);

    // ❌ Không return JSX vì ta thao tác trực tiếp với Leaflet
    return null;
};

export default BusMarker;
