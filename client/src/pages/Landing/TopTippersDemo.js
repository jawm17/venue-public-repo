import React from "react";
import TopTipper from "./TipperDemoComponent";
import videoTips from "./sampleLeaders.json";
import "./styles/topTippersStyle.css";

export default function TopTippersDemo() {
    return (
        <div id="tipperBg">
            <div id="tipperInner">


                <div id="topTippersTitle">
                    Top Tippers
                </div>
                <div className="videoRowFlex">
                    <div id="videoTippersDesktop">
                        {videoTips.map((tip, index) => {
                            return <TopTipper name={tip.name} amount={tip.solEarned} profileImg={tip.profilePic} tip={tip} index={index} />
                        })}
                    </div>
                </div>
         

            </div>

        </div>
    );
}