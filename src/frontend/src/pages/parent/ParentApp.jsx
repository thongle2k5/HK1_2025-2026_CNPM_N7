
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Thêm useEffect import
import Header from "../../components/specific/parentpage/Header.jsx";
import ChildTracking from "./ChildTracking.jsx";
import Notifications from "./Notifications.jsx";
import ChatBubble from "./ChatBubble.jsx";
import { ParentSocketProvider } from "../../components/specific/parentpage/ParentSocketProvider.jsx";

const user = { user_id: 1 };

function ParentApp() {
    const [busIds, setBusIds] = useState([]);
    return (
        <div className="w-screen h-screen flex flex-col relative">
            <ParentSocketProvider busIds={busIds}>
                <Header />
                <Routes>
                    <Route path="/" element={<ChildTracking user={user} setBusIds={setBusIds} />} />
                    <Route path="/parent" element={<ChildTracking user={user} setBusIds={setBusIds} />} />
                    <Route
                        path="/parent/notifications"
                        element={<Notifications user={user} />}
                    />
                </Routes>
            </ParentSocketProvider>

            <ChatBubble user={user} />
        </div>
    );
}

export default ParentApp;
