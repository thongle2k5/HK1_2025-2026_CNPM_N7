import { Routes, Route ,useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/specific/parentpage/Header.jsx";
import ChildTracking from "./ChildTracking.jsx";
import Notifications from "./Notifications.jsx";
import ChatBubble from "./ChatBubble.jsx";
import { ParentSocketProvider } from "../../components/specific/parentpage/ParentSocketProvider.jsx";

function ParentApp() {
    const location = useLocation();
    const user = location.state?.user;
  const [busIds, setBusIds] = useState([]);
  return (
    <div className="w-screen h-screen flex flex-col relative">
      <ParentSocketProvider busIds={busIds} user={user}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<ChildTracking setBusIds={setBusIds} user={user}/>}
          />
          <Route
            path="/notifications"
            element={<Notifications user ={user}/>}
          />
        </Routes>
        <ChatBubble user={user} />
      </ParentSocketProvider>
    </div>
  );
}

export default ParentApp;

// import { SocketProvider } from "../../components/specific/parentpage/ParentSocketProvider.jsx";

// function ParentApp({user} = {}) {
//   if (!user) {
//     user = { user_id: 1 };
//   }

//   const [unreadCount, setUnreadCount] = useState(0);
//   const baseURL = "http://localhost:5000/api";

//   useEffect(() => {
//     const fetchUnreadCount = async () => {
//       try {
//         const response = await fetch(
//           `${baseURL}/notifications/unread-count/${user.user_id}`
//         );
//         const data = await response.json();
//         setUnreadCount(data.unreadCount);
//       } catch (error) {
//         console.error("Error fetching unread count:", error);
//       }
//     };

//     fetchUnreadCount();
//   }, []);

//   const markAllAsRead = async () => {
//     try {
//       await fetch(`${baseURL}/notifications/mark-all-read/${user.user_id}`, {
//         method: "POST",
//       });
//       setUnreadCount(0);
//     } catch (error) {
//       console.error("Error marking all as read:", error);
//     }
//   };

//   const handleBellClick = async () => {
//     await markAllAsRead();
//   };

//   return (
//     <div className="w-screen h-screen flex flex-col relative">
//       <Header onBellClick={handleBellClick} unreadCount={unreadCount} />

//       <SocketProvider>
//         <Routes>
//           <Route path="/" element={<ChildTracking user={user} />} />
//           <Route path="/parent" element={<ChildTracking user={user} />} />
//           <Route
//             path="/parent/notifications"
//             element={<Notifications user={user} />}
//           />
//         </Routes>
//       </SocketProvider>

//       <ChatBubble user={user} />
//     </div>
//   );
// }

// export default ParentApp;
