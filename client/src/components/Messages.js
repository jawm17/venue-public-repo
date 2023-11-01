import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Notification from "./Notification";
import "./styles/messagesStyle.css";

export default function Messages(props) {
    const [selectedMenuItem, setSelectedMenuItem] = useState("notifications");
    const { user, readCount, setReadCount, notificationArray } = useContext(AuthContext);
    
    useEffect(() => {
        updateReadCount();
    }, []);

    async function updateReadCount() {
        setReadCount(notificationArray.length);
        try {
            const res = await axios.post("/user/update-messages-read", {readCount: notificationArray.length});
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div id="modalBlur" onClick={() => props.cancel()}></div>
            <div id="messagesBody">
                {/* <svg onClick={() => props.cancel()} id="closeMessages" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg> */}
                <div id="messagesTop">
                    <svg onClick={() => props.cancel()} id="closeMessages" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div id="messagesTitle">
                        notifications
                    </div>
                </div>
                {/* <div id="messagesMenu">
                    <div className="messagesMenuItem menuItem1" onClick={() => setSelectedMenuItem("notifications")} id={selectedMenuItem === "notifications" ? "selectedMessagesMenuItem" : ""}>
                        notifications (3)
                    </div>
                    <div className="messagesMenuItem menuItem2" onClick={() => setSelectedMenuItem("collectors")} id={selectedMenuItem === "collectors" ? "selectedMessagesMenuItem" : ""}>
                        messages
                    </div>
                    <div className="messagesMenuItem menuItem3" onClick={() => setSelectedMenuItem("tokens")} id={selectedMenuItem === "tokens" ? "selectedMessagesMenuItem" : ""}>
                        collectors
                    </div>
                </div> */}
                <div id="messagesArea">
                    {notificationArray.map((message) => {
                        return <Notification message={message} key={message._id} user={user}/>
                    })}
                </div>
            </div>
        </div>
    );
}