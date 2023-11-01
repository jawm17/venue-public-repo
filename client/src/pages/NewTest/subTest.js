import React from "react";
import "./subTestStyle.css";
import orb5 from "./orb5.gif";
import orb6 from "./orb6.gif";
import orb7 from "./orb7.gif";

export default function SubTest() {

    return (
        <div id="subTestFlex">
            <div id="subTest">
                <div className="subDivBg">
                    <div className="subDiv">
                        <div className="tierTitle">
                            TIER 1
                        </div>
                        <div className="tierSubTitle">
                            1 month
                        </div>
                        <div className="orbFlex">
                            <img src={orb5} className="orbImg"></img>
                        </div>
                        <div className="tierBtn">
                            <div className="tierBtnText">
                                UNLOCK
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subDivBg">
                    <div className="subDiv">
                        <div className="tierTitle">
                            TIER 2
                        </div>
                        <div className="tierSubTitle">
                            1 year 
                        </div>
                        <div className="orbFlex">
                            <img src={orb6} className="orbImg"></img>
                        </div>
                        <div className="tierBtn">
                            <div className="tierBtnText">
                                UNLOCK
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subDivBg">
                    <div className="subDiv">
                        <div className="tierTitle">
                            TIER 3
                        </div>
                        <div className="tierSubTitle">
                            lifetime
                        </div>
                        <div className="orbFlex">
                            <img src={orb7} className="orbImg"></img>
                        </div>
                        <div className="tierBtn">
                            <div className="tierBtnText">
                                UNLOCK
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}