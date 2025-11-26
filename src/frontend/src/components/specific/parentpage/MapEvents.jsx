import { useMap } from "react-leaflet";
import { useEffect } from "react";

export default function MapEvents({ selectedBus, setSelectedBus }) {
    const map = useMap();

    useEffect(() => {
        if (!selectedBus) return; // chỉ gắn listener khi đang follow bus

        const stopFollow = () => setSelectedBus(null);

        map.on("dragstart", stopFollow);
        map.on("zoomstart", stopFollow);
        map.on("click", stopFollow);

        return () => {
            map.off("dragstart", stopFollow);
            map.off("zoomstart", stopFollow);
            map.off("click", stopFollow);
        };
    }, [map, selectedBus]);

    return null;
}
