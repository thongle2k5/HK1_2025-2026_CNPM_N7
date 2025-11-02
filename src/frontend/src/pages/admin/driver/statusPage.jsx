

import React from 'react';

function StatusBadge({ status }) {
    let classes = "";
    let displayText = status;

    // Logic quyết định màu sắc dựa trên trạng thái
    switch (status) {
        case 'Hoạt động':
            classes = "bg-green-100 text-green-800";
            break;
        case 'Nghỉ phép':
            classes = "bg-yellow-100 text-yellow-800";
            break;
        case 'Vi phạm':
            classes = "bg-red-100 text-red-800";
            break;
        default:
            classes = "bg-gray-100 text-gray-800";
            displayText = "Không rõ";
            break;
    }

    return (
        <span 
            className={`inline-flex px-3 py-1 text-xs font-semibold leading-5 rounded-full ${classes}`}
        >
            {displayText}
        </span>
    );
}

export default StatusBadge;