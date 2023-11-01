import React from "react";
import whiteStars from "../assets/whitestars.png";
import "./styles/headerMenuBarStyle.css";

export default function HeaderMenuBar(props) {

    const style = {
        menuBg: {
            display: props.menuOpen ? "initial" : "none"
        },
        menuStyle: {
            right: props.menuOpen ? 0 : "var(--menuWidth)",
        }
    }

    return (
        <div id="headerMenu" style={style.menuStyle}>
            <div id="menuUserInfo">
                <div>
                    <div id="menuName">
                        {props.user?.username}
                    </div>
                    <div id="menuAddress">
                        balance: ${props.totalBalance}
                    </div>
                </div>
                <img id="menuBarImg" src={props.user?.profileImg}></img>
            </div>

            {/* {user?.address?.slice(0, 18)}... */}

            <div id="menuFlex">
                <svg onClick={() => props.closeMenu()} id="closeMenuBtn" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div id="menu">
                    {/* <div id="headerWallet">
                        <div id="walletWithdraw">
                            withdraw
                        </div>
                    </div> */}
                    {/* <div id="sidebarUserMobile">
                        <div>

                        </div>
                    </div> */}
                    <div className="menuOption" onClick={() => props.changePage("/account")}>
                        <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                        </svg>
                        <div className="menuOptionLabel">
                            profile
                        </div>
                    </div>
                    {/* <div className="menuOption" onClick={() => props.changePage("/wallet")}>
                            <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path>
                            </svg>
                            <div className="menuOptionLabel">
                                wallet
                            </div>
                        </div> */}
                    <div className="menuOption" onClick={() => props.openMessages()}>
                        <svg className="menuOptionIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.5V12.75"></path>
                        </svg>
                        <div className="menuOptionLabel">
                            notifications
                        </div>
                        {props.readCount < props.notificationArray.length ?
                            <div id="notifCount">
                                {props.notificationArray.length - props.readCount}
                            </div>
                            :
                            null
                        }
                    </div>
                    {/* <div className="menuOption" onClick={() => props.changePage("/leaderboard")}>
                        <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 11.25L10.25 5.75"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 19.2502H6.25C6.80229 19.2502 7.25 18.8025 7.25 18.2502V15.75C7.25 15.1977 6.80229 14.75 6.25 14.75H5.75C5.19772 14.75 4.75 15.1977 4.75 15.75V18.2502C4.75 18.8025 5.19772 19.2502 5.75 19.2502Z"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.75 19.2502H12.25C12.8023 19.2502 13.25 18.8025 13.25 18.2502V12.75C13.25 12.1977 12.8023 11.75 12.25 11.75H11.75C11.1977 11.75 10.75 12.1977 10.75 12.75V18.2502C10.75 18.8025 11.1977 19.2502 11.75 19.2502Z"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.75 19.2502H18.25C18.8023 19.2502 19.25 18.8025 19.25 18.2502V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H17.75C17.1977 4.75 16.75 5.19772 16.75 5.75V18.2502C16.75 18.8025 17.1977 19.2502 17.75 19.2502Z"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.25 8.25V4.75H7.75"></path>
                        </svg>

                        <div className="menuOptionLabel">
                            leaderboard
                        </div>
                    </div> */}
                    <div className="menuOption" onClick={() => props.changePage("/create")} id="createMenuBtn">
                        {/* <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4.75L13.75 10.25H19.25L14.75 13.75L16.25 19.25L12 15.75L7.75 19.25L9.25 13.75L4.75 10.25H10.25L12 4.75Z"></path>
                            </svg> */}
                        <img className="menuOptionIcon" src={whiteStars}></img>
                        <div className="menuOptionLabel">
                            create
                        </div>
                    </div>
                    <div className="menuOption" onClick={() => props.changePage("/search")} id="searchMenuOption">
                        <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" />
                        </svg>
                        <div className="menuOptionLabel">
                            search
                        </div>
                    </div>
                    <div className="menuOption" onClick={() => props.logout()}>
                        <svg className="menuOptionIcon" width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 8.75L19.25 12L15.75 15.25"></path>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 12H10.75"></path>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H15.25"></path>
                        </svg>
                        <div className="menuOptionLabel">
                            disconnect
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}