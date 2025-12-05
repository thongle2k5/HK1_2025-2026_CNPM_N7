import L from 'leaflet';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useMap } from 'react-leaflet';
import React from 'react';
const stopIcon = L.ExtraMarkers.icon({
    icon: 'fa-map-marker',
    markerColor: 'blue',    // màu nền
    shape: 'circle',          // hình giọt / circle / square / star
    prefix: 'fa',             // fontawesome
    innerHTML: '',            // thêm HTML nếu muốn
});


const StopMarker = ({ stop_id, latitude, longitude, address }) => {
    const map = useMap();
    const markerRef = React.useRef();
    React.useEffect(() => {
        if (!markerRef.current) {
            // 🔹 Tạo marker chỉ một lần
            const marker = L.marker([latitude, longitude], {
                icon: stopIcon,
                zIndexOffset: 1000,
            }).addTo(map);

            marker.bindTooltip(`Trạm ${stop_id}`, {
                permanent: true,
                direction: 'top',
                offset: [0, -36],
            });
            marker.bindPopup(`<b>Trạm ${stop_id}</b><br/>${address}`);

            marker.on("click", () => {
                marker.openPopup();
            });

            markerRef.current = marker;
        } else {
            // 🔹 Cập nhật vị trí marker (popup vẫn giữ nguyên)
            markerRef.current.setLatLng([latitude, longitude]);
        }

    }, [latitude, longitude, stop_id, map]);

    // ❌ Không return JSX vì ta thao tác trực tiếp với Leaflet
    return null;
};

export default StopMarker;

