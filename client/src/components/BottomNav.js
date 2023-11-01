import React, { useState } from "react";
import "./styles/bottomNavStyle.css"

import Home from "../pages/HomePage/Home";

export default function BottomNav(props) {
    const [navSelected, setNavSelected] = useState({ type: "search", "left": 120, "color": "#00fc00" });

    return (
        <div id="outerNav" style={{ backgroundColor: navSelected.color }}>
            <div id="innerScreen">
                <Home />
                <div id="navSelector" style={{ "left": navSelected.left }}>
                    <div className="navSelectorSides">

                    </div>
                    <div className="navSelectorSides" id="rightSide">

                    </div>
                </div>
            </div>
            <div id="bottomNavBtnArea">
                <div className="navBtn" style={navSelected.type === "home" ? { "marginBottom": 5 } : null} onClick={() => setNavSelected({ type: "home", "left": 27, "color": "#0b83ff" })}>
                    <svg width="26" height="26" fill={props.page === "home" ? "black" : "none"} viewBox="0 0 24 24">
                        <path stroke={navSelected.type === "home" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"></path>
                        <path stroke={navSelected.type === "home" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"></path>
                    </svg>
                </div>
                <div className="navBtn">
                    <svg width="26" height="26" style={navSelected.type === "search" ? { "marginBottom": 5 } : null} onClick={() => setNavSelected({ type: "search", "left": 122, "color": "#00fc00" })} fill={props.page === "discover" ? "black" : "none"} viewBox="0 0 24 24">
                        <path stroke={navSelected.type === "search" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"></path>
                    </svg>
                </div>
                <div className="navBtn" style={navSelected.type === "wallet" ? { "marginBottom": 5 } : null} onClick={() => setNavSelected({ type: "wallet", "left": 213, "color": "red" })}>
                    <svg width="26" height="26" fill={props.page === "wallet" ? "black" : "none"} viewBox="0 0 24 24">
                        <path stroke={navSelected.type === "wallet" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path>
                        <path stroke={navSelected.type === "wallet" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path>
                        <path stroke={navSelected.type === "wallet" ? "white" : "black"} stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path>
                    </svg>
                </div>
                <div className="navBtn">
                    <svg width="26" height="26" fill={props.page === "account" ? "black" : "none"} viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}