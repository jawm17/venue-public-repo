import React from "react";
import stars from "../../assets/stars.png";
import { useHistory } from "react-router-dom";
import "./styles/landingNav.css";

export default function LandingHeader() {
    const history = useHistory();


    function scrollCue() {
        document.getElementById("landingInfoArea").scrollTop = window.innerHeight * 2;
        document.getElementById("landingTextFlex").style.opacity = "0"
    }

    return (
        <div id="headerFlexL">
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
                        features
                    </div>
                    <div className="landingMenuItem" onClick={() => scrollCue()}>
                        tutorial
                    </div>
                    <div className="landingMenuItem" onClick={() => window.open("https://twitter.com/envyhose", '_blank')}>
                        contact
                    </div> */}
                    <div id="landingHeaderBtn" onClick={() => history.push("/soon")}>
                        open app
                    </div>
                </div>
            </div>
        </div>
    );
}
