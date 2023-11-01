import React from "react";
import profilePic from "../../assets/sampleProfile.png";
import "./collectModalStyle.css";

export default function CollectModal() {

    return (
        <div id="collectOuter">
            <div id="collectArea">
                <div id="collectInner">
                    <div id="collectTop">
                        <img src={profilePic} id="collectProfilePic"></img>
                        <div id="collectTitle">
                            envy
                        </div>
                    </div>
                    <div id="collectInfo">
                        <div id="collectInfoInner">
                            <div id="collectInfoTitle">
                                This collectible grants access to 
                            </div>
                            <ul>
                                <li className="collectBenefit">
                                    exclusive content
                                </li>
                                <li className="collectBenefit">
                                    chat with the creator
                                </li>
                                <li className="collectBenefit">
                                    10% royalties from future collects
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="collectConfirm">
                        collect
                    </div>
                </div>
            </div>
        </div>
    );
}