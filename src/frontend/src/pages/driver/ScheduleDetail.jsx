import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScheduleDetail() {
    const { scheduleId } = useParams();
    const [schedule, setSchedule] = useState(null);
    const [loading, setLoading] = useState(true);
    const driverId = localStorage.getItem("driverId");

    // useEffect(() => {
    //     const fetchScheduleDetail = async () => {
    //         try {
    //             const res = await fetch(
    //                 `http://localhost:5000/api/scheduleDetail/driver/${driverId}/schedule/${scheduleId}`
    //             );
    //             const data = await res.json();
    //             setSchedule(data);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     if (driverId && scheduleId) fetchScheduleDetail();
    // }, [driverId, scheduleId]);

    useEffect(() => {
        const fetchScheduleDetail = async () => {
            try {
                if (!driverId) throw new Error("DriverId không xác định");

                const res = await fetch(
                    `http://localhost:5000/api/scheduleDetail/driver/${driverId}/schedule/${scheduleId}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setSchedule(data);
            } catch (err) {
                console.error(err);
                setSchedule(null);
            } finally {
                setLoading(false);
            }
        };

        if (scheduleId) fetchScheduleDetail();
    }, [driverId, scheduleId]);

    if (loading) return <div>Đang tải...</div>;
    if (!schedule) return <div>Không tìm thấy lịch làm việc</div>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">{schedule.route_name}</h1>
            <p className="text-gray-600 mb-4">Từ {schedule.start_time} đến {schedule.end_time}</p>
            <p className="text-gray-600 mb-4">Trạng thái: {schedule.status}</p>

            {/* Danh sách trạm */}
            <h2 className="text-lg font-medium mt-4 mb-2">Trạm dừng</h2>
            <ul className="list-disc pl-6">
                {schedule.stops?.map((stop, index) => (
                    <li key={index}>
                        {stop.stop_address} – {stop.expected_arrive_time}
                    </li>
                ))}
            </ul>
        </div>
    );
}
