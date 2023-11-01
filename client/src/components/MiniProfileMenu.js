import React from "react";
import { useHistory } from "react-router-dom";
import whiteStars from "../assets/whitestars.png";
import "./styles/miniProfileMenuStyle.css";

export default function MiniProfileMenu(props) {
    const history = useHistory();

    function navigate(page) {
        history.push("/" + page);
        props.cancel();
    }

    return (
        <>
            <div id="modalBlur" onClick={() => props.cancel()}></div>
            <div id="profileMenuBody">
                <svg onClick={() => props.cancel()} id="closeModal" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="profileMenuUserInfo">
                    <img id="profileMenuImg" src={props.user?.profileImg}></img>
                    <div id="profileUserNameBalance">
                        <div id="profileMenuName">{props.user?.username}</div>
                        <div id="profileMenuBalance">balance: ${props.totalBalance}</div>
                    </div>
                </div>
                <div id="mProfileMenuBtnArea">
                    <div className="mProfileMenuBtn" onClick={() => navigate("account")}>
                        <svg className="mProfileMenuIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                        </svg>
                        <div>
                            profile
                        </div>
                    </div>
                    <div className="mProfileMenuBtn" onClick={() => navigate("create")}>
                    <img className="mProfileMenuIcon" src={whiteStars}></img>
                        <div>
                            create
                        </div>
                    </div>
                    <div className="mProfileMenuBtn" onClick={() => props.logout()}>
                        <svg className="mProfileMenuIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 8.75L19.25 12L15.75 15.25"></path>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H10.75"></path>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"></path>
                        </svg>
                        <div>
                            disconnect
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}