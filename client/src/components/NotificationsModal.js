import React , { useEffect, useRef } from "react";
import Notification from "./Notification";
import { io } from "socket.io-client";
import "./styles/NotificationsModalStyle.css";

export default function NotificationsModal(props) {
    const notifications = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},]
    const socket = useRef();

    useEffect(() => {

        socket.current = io("ws://localhost:8900");
    }, []);

    return (
        <div id="notififyOuter">
            <div id="notifyBody">
                <svg onClick={() => props.cancel()} id="closeCards" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="notifyTitle">
                    Notifications
                </div>
                <div id="notificationsArea">
                    {notifications.map((item) => {
                        return <Notification />
                    })}
                </div>
            </div>
        </div>
    );
}