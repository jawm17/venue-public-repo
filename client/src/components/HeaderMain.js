import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthWindow from "./AuthWindow";
import BuyCard from "./BuyCard";
import { AuthContext } from "../context/AuthContext";
import Nanobar from "nanobar";
import stars from "../assets/stars.png";
import HeaderMenuBar from "./HeaderMenuBar";
import HeaderSearch from "./HeaderSearch";
import NotificationsModal from "./NotificationsModal";
import MiniProfileMenu from "./MiniProfileMenu";
import WalletModal from "./WalletModal";
import Messages from "./Messages";
import "./styles/headerMainStyle.css";
import "./styles/navBottomStyle.css";

export default function HeaderMain(props) {
    const history = useHistory();
    const [authWindow, setAuthWindow] = useState(false);
    const [miniProfileMenu, setMiniProfileMenu] = useState(false);
    const [cardWindow, setCardWindow] = useState(false);
    const [walletWindow, setWalletWindow] = useState(false);
    const [messagesOpen, setMessagesOpen] = useState(false);
    const { isAuthenticated, setIsAuthenticated, readCount, user, setUser, balance, notificationArray } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifyOpen, setNotifyOpen] = useState(false);

    const style = {
        menuBg: {
            display: menuOpen ? "initial" : "none"
        },
        menuStyle: {
            right: menuOpen ? 0 : "var(--menuWidth)",
        },
        profileBtn: {
            backgroundColor: menuOpen ? "var(--graySecond)" : "#2b3136",
            zIndex: menuOpen ? 11 : 1
        }
    }

    // useEffect(() => {
    //     if (menuOpen) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "scroll";
    //     }
    //     return () => document.body.style.overflow = "scroll";
    // }, [menuOpen]);

    const logout = async () => {
        try {
            const res = await axios.get("/user/logout");
            if (res.data.success) {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem("authMethod");
                setMenuOpen(false);
                setMiniProfileMenu(false);
            }
        } catch (err) {
      
        }
    };

    useEffect(() => {
        var options = {
            classname: 'my-class',
            id: 'my-id',
            target: document.getElementById('loaderLine')
        };
        var nanobar = new Nanobar(options);
        // move bar
        nanobar.go(30); // size bar 30%
        nanobar.go(76); // size bar 76%
        // size bar 100% and and finish
        nanobar.go(100);
    }, []);

    function changePage(page) {
        history.push(page);
        setMenuOpen(false);
    }

    useEffect(() => {
        if (props.googleAuth) {
            setAuthWindow(true);
        }
    }, [props.googleAuth])

    function purchaseDone() {
        setCardWindow(false);

        // setTimeout(() => {
        //     getCardBalances(user.address);
        // }, 3300);
    }


    function collectMech() {
        let s_tokenCounter = 0;
        let s_TokenIdToBalance = {};
        let numGoldMembers = 100;
        for (let i = 0; i < 10; i++) {
            let price = 20;
            // % royalties for collectors
            let tokenShare = (price * 40) / 100;
   
            let tokensToDistribute = (s_tokenCounter < numGoldMembers) ? s_tokenCounter : numGoldMembers;
            let sharePerToken = tokenShare / tokensToDistribute;
            for (let i = 0; i < tokensToDistribute; i++) {
                s_TokenIdToBalance[i] += sharePerToken;
            }
            s_TokenIdToBalance[s_tokenCounter] = 0;
            s_tokenCounter++;
        }
        let tokenToCheck = 0;
        console.log(s_TokenIdToBalance[tokenToCheck])
    }

    useEffect(() => {
        collectMech();
    }, []);

    function activateSearch() {
        document.getElementById("searchBarArea").style.display = "flex";
        document.getElementById("searchInput").focus();
    }

    function openMessagesFromSidebar() {
        setMenuOpen(false);
        setMessagesOpen(true)
    }

    return (
        <>
            <div id="headerOuter">
                {/* <div id="headerFlag0">

                </div>
                <div id="headerFlag">

                </div>
                <div id="headerFlag2">

                </div> */}
                <div id="loaderLine">

                </div>
                {messagesOpen ? <Messages cancel={() => setMessagesOpen(false)} /> : null}
                {walletWindow ? <WalletModal cancel={() => setWalletWindow(false)} user={user} /> : null}
                {authWindow ? <AuthWindow cancel={() => setAuthWindow(false)} googleAuth={props.googleAuth} /> : null}
                {cardWindow ? <BuyCard cancel={() => setCardWindow(false)} purchaseDone={() => purchaseDone()} /> : null}
                {notifyOpen ? <NotificationsModal cancel={() => setNotifyOpen(false)} /> : null}
                {miniProfileMenu ? <MiniProfileMenu cancel={() => setMiniProfileMenu(false)} totalBalance={balance} user={user} logout={() => logout()} /> : null}
                <div id="headerMenuBg" style={style.menuBg} onClick={() => setMenuOpen(false)}>
                </div>
                <HeaderMenuBar notificationArray={notificationArray} readCount={readCount} openMessages={() => openMessagesFromSidebar()} closeMenu={() => setMenuOpen(false)} totalBalance={balance} menuOpen={menuOpen} user={user} logout={() => logout()} changePage={(page) => changePage(page)} />

                <div id="logoFlex" onClick={() => history.push("/home")}>
                    <img src={stars} id="logoStars"></img>
                    <div id="logoText">venue</div>
                </div>

                <HeaderSearch />

                <div id="headerBtnsRight">
                    <div className="headerBtn" onClick={() => history.push("/home")}>
                        <div className="headerIcon">
                            <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"></path>
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"></path>
                            </svg>
                        </div>
                        <div className="headerBtnText">
                            home
                        </div>
                    </div>
                    <div className="headerBtn" id="headerSearchBtn" onClick={() => activateSearch()}>
                        <div className="headerIcon">
                            <svg width="19.2" height="19.2" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" />
                            </svg>
                        </div>
                        <div className="headerBtnText">
                            search
                        </div>
                    </div>
                    <div style={!isAuthenticated ? { display: "none" } : { display: "flex" }} id="cardBtn" className="headerBtn" onClick={isAuthenticated ? () => history.push("/wallet") : () => setAuthWindow(true)}>
                        <svg className="headerIcon" id="cardIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path>
                        </svg>
                        <div className="headerBtnText">
                            wallet
                        </div>
                    </div>

                    {isAuthenticated ?
                        <div className="headerBtn" id="profileBtnNew" onClick={() => setMenuOpen(!menuOpen)}>
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="3.25" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                            </svg>
                            <img src={user?.profileImg} id="profileBtnImg"></img>
                            <div className="headerBtnText">
                                profile
                            </div>
                            {readCount < notificationArray.length ?
                                <div id="notificationsIcon">
                                    {notificationArray.length - readCount}
                                </div>
                                :
                                null
                            }
                        </div>
                        :
                        <div id="connectBtn" onClick={() => setAuthWindow(true)}>
                            <div id="connectBtnText">
                                connect
                            </div>
                            <svg id="connectBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                            </svg>
                        </div>
                    }
                </div>
                <div id="mobileHeaderBtnsRight">
                    {isAuthenticated ?
                        <div className="headerBtn" onClick={() => setMessagesOpen(true)}>
                            {readCount < notificationArray.length ?
                                <div id="notificationsIcon">
                                    {notificationArray.length - readCount}
                                </div>
                                :
                                null
                            }
                            <svg className="headerIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z"></path>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15.5V12.75"></path>
                            </svg>
                        </div>
                        :
                        <div id="connectBtn" onClick={() => setAuthWindow(true)}>
                            <div>
                                connect
                            </div>
                            <svg id="connectBtnIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="8" r="3.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                            </svg>
                        </div>
                    }
                </div>

            </div>

            <div id="navBottom">
                <div className="headerCircleBtn" onClick={() => history.push("/home")}>
                    <div className="headerIcon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"></path>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="headerCircleBtn" id="headerSearchBtn" onClick={() => activateSearch()}>
                    <div className="headerIcon">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" />
                        </svg>
                    </div>
                </div>
                <div className="headerCircleBtn createStarsBtn" id="headerSearchBtn" onClick={isAuthenticated ? () => history.push("/create") : () => setAuthWindow(true)}>
                    <img src={stars} id="createStars"></img>
                </div>
                <div className="headerCircleBtn" id="headerSearchBtn" onClick={isAuthenticated ? () => history.push("/wallet") : () => setAuthWindow(true)}>
                    <svg id="cardIcon" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"></path>
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"></path>
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"></path>
                    </svg>
                </div>
                {isAuthenticated ?
                    <div className="headerCircleBtn" id="headerSearchBtn" onClick={() => setMiniProfileMenu(true)}>
                        <img src={user?.profileImg} id="profileBtnImg"></img>
                    </div>
                    :
                    <div className="headerCircleBtn" id="headerSearchBtn" onClick={() => setAuthWindow(true)}>
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="3.25" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle>
                            <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.8475 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93201 14 6.14367 15.7731 5.35924 17.2584C4.82597 18.2681 5.70558 19.25 6.8475 19.25Z"></path>
                        </svg>
                    </div>
                }
            </div>
        </>
    );
}