import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Header = ({unreadCount = 0, onBellClick})  => {
  const navigate = useNavigate();
  
  const BellClicked = () => {
    if (onBellClick) {
      onBellClick();
      navigate("/parent/notifications");
    }
  };

  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">My Child's Bus</h1>
        
      <div className="flex items-center gap-4">
        
        {/* Bell Icon */}
        <div 
          className="relative cursor-pointer group"
          onClick={BellClicked}
        >
          <Bell 
            className="
              w-6 h-6 
              transition duration-200 
              group-hover:text-blue-200 
              group-hover:scale-110
            " 
          />
          {/* Badge hiển thị số thông báo chưa đọc */}
           {unreadCount >= 0 && (
             <span className="
                absolute 
                -top-2 -right-2 
                bg-red-500 
                text-white 
                text-xs 
                font-bold 
                rounded-full 
                min-w-[18px] 
                h-[18px] 
                flex 
                items-center 
                justify-center 
                animate-pulse
                ">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
              )}
        </div>

        {/* User Letter */}
        <div className="bg-blue-800 text-white rounded-md w-8 h-8 flex items-center justify-center font-bold">
          U
        </div>

      </div>
    </header>
  );
};

export default Header;