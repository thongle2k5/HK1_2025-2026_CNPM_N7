import React from "react";
import { Bell } from "lucide-react";

const Header = ({ title, onBellClick }) => {

  return (
    <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}My Child's Bus</h1>
        
      <div className="flex items-center gap-4">
        
        {/* Bell Icon */}
        <div 
          className="relative cursor-pointer group"
          onClick={onBellClick}
        >
          <Bell 
            className="
              w-6 h-6 
              transition duration-200 
              group-hover:text-blue-200 
              group-hover:scale-110
            " 
          />
          
          <span className="absolute -top-1 -right-1 bg-green-400 text-xs text-white rounded-full px-1">
            3
          </span>
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
