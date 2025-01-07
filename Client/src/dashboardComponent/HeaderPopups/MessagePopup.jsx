import React, { useState } from "react";

function MessagePopup() {
    const [activeTab, setActiveTab] = useState('notif');  // Single state for active tab

    const handleClick = (tab) => {
        setActiveTab(tab);  // Toggle logic simplified
    };

    return (
        <div className="messagepopup">
            {/* Header Section */}
            <div className="messagepopupDivide">
                <div
                    onClick={() => handleClick('notif')}
                    className={`messagepopupNotif`}
                >
                    Notification
                </div>
                <div
                    onClick={() => handleClick('mess')}
                    className={`messagepopupMess`}
                >
                    Message
                </div>
            </div>
            <hr />
            
            {/* Content Section */}
            <div className="messagepopupItems">
                {activeTab === 'mess' && <Message />}
                {activeTab === 'notif' && <Notification />}
            </div>
        </div>
    );
}

function Notification() {
    return(
        <div>
            
        </div>
    )
}

function Message() {
    return (
        <div>

        </div>
    )
}

export default MessagePopup;
