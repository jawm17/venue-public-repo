import React from "react";
import stars from "../../assets/stars.png";
import { useHistory } from "react-router-dom";
import "./styles/learnMoreStyle.css";

export default function LearnMore() {
    const history = useHistory();

    return (
        <div id="blogOuter">
            <div id="blogInner">
                <div id="blogHeader">
                    <div id="logoFlexL">
                        <div id="logoIconL">
                            <img src={stars} id="logoStarsL" onClick={() => history.push("/home")}></img>
                        </div>
                        <div id="logoTextL" onClick={() => history.push("/home")}>
                            venue
                        </div>
                    </div>
                </div>
                <div id="blogPostTitle">
                    EtherPlay Cards
                </div>
                <div id="blogPostContent">
                    <div className="blogSection">
                        venue utilizes the polygon blockchain to facilitate payments directly from fan to creator. In order to transact on venue (unlocking a video, tipping a creator, collecting), users must first purchase credits in the form of an “EtherPlay card”. This card gives users an amount of credits equal to the dollar amount they payed for it. You can think about it as a card you might get at an arcade. You first purchase a card that gives you “tokens” which allow you to play games at the arcade. In the same way, once you’ve purchased an EtherPlay card, you now have “credits” that you may spend across all EtherPlay platforms including venue.
                    </div>
                    <div className="blogSection">
                        When users transact on venue, creators receive credits which can be redeemed for real money. By utilizing blockchain technology in the form of the EtherPlay card, creators receive money for their work directly and instantly without third party payment processors.
                    </div>
                </div>
            </div>
        </div>
    )
}