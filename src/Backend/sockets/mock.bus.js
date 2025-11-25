
// File này để giả lập xe buýt chạy trên tuyến đường 
export async function runBusAlongPath(path, speedKmH, stepsPerSegment, emitFunc) {
  console.log("Bắt đầu đi");

  if (!path || path.length < 2) return;

  // Hàm tính khoảng cách km giữa 2 tọa độ
  const haversineDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };

  // Hàm tính delay giữa các step
  const calculateDelay = (distance, speed, steps) => {
    const timeHours = distance / speed; // giờ
    const timeSeconds = timeHours * 3600; // giây
    return (timeSeconds / steps) * 1000; // ms
  };

  // Interpolate giữa 2 điểm
  const interpolate = (start, end, steps) => {
    const result = [];
    const latStep = (end[0] - start[0]) / steps;
    const lngStep = (end[1] - start[1]) / steps;
    for (let i = 0; i <= steps; i++) {
      result.push([start[0] + latStep * i, start[1] + lngStep * i]);
    }
    return result;
  };

  // Duyệt path
  for (let i = 0; i < path.length - 1; i++) {
    const start = path[i];
    const end = path[i + 1];

    // chia segment thành nhiều điểm để di chuyển mượt
    const segmentPoints = interpolate(start, end, stepsPerSegment);
    const distance = haversineDistance(start[0], start[1], end[0], end[1]);
    const delay = calculateDelay(distance, speedKmH, stepsPerSegment);

    for (const pos of segmentPoints) {
      // emit dữ liệu realtime
      emitFunc(pos[0], pos[1]);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  console.log("✅ Bus đã hoàn thành lộ trình");
}



