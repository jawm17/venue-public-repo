import React, { useState, useContext, useEffect } from "react";
import stars from "../../assets/stars.png";
import { useHistory } from "react-router-dom";
import "./landingHeaderStyle.css";
import { AuthContext } from "../../context/AuthContext";

export default function LandingHeader() {
    const history = useHistory();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);


    function scrollCue() {
        document.getElementById("landingInfoArea").scrollTop = window.innerHeight * 2;
        document.getElementById("landingTextFlex").style.opacity = "0"
    }

    return (
        <div id="headerOuterL">
            <div id="logoFlexL">
                <div id="logoIconL">
                    <img src={stars} id="logoStarsL"></img>
                </div>
                {/* <img id="venueLogoL" src={venueLogo}></img> */}
                <div id="logoTextL">
                    venue
                </div>
            </div>
            <div id="landingMenuFlex">
                {/* <div className="landingMenuItem">
                    about
                </div> */}
                {/* <div className="landingMenuItem" onClick={() => scrollCue()}>
                    services
                </div> */}
                <div className="landingMenuItem" onClick={() => window.open("https://twitter.com/envyhose", '_blank')}>
                    contact
                </div>
            </div>
            <div id="lilFlex">
                <div id="openApp" onClick={() => history.push("/home")}>
                    open app
                </div>
            </div>
        </div>
    );
}
