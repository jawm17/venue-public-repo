import React, { useEffect, useState } from "react";
import EquityConfetti from "../../components/equityConfetti";
import eth from "./eth2.png";
import "./testEquityStyle.css";

export default function TestEquity() {
    const [done, setDone] = useState(false);

    useEffect(() => {
        let x = document.getElementById("fundingFill").getBoundingClientRect().width;
        console.log(x)
        let time = setInterval(() => {
            if (x < 410) {
                document.getElementById("fundingFill").style.width = x + "px";
                x = x + 10;
                console.log(x)
            } else {
                setTimeout(() => {
                    setDone(true);
                }, 500);
                clearInterval(time);
            }
        }, 20);
    }, []);

    return (
        <div id="subTestFlex">
            {done ? <EquityConfetti /> : null}
            <div id="testEquity">
                <div>
                    <div id="tubeData">
                        <div id="tubeTitle">
                            Funding Goal
                        </div>
                        <div id="tubeSubTitle">
                            <div>
                                5.25
                            </div>
                            <img id="ethLogo" src={eth}></img>
                        </div>
                    </div>
                    <div id="fundingTube">
                        <div id="fillCurve">
                        </div>

                        <div id="fillCover">
                        </div>
                        <div id="fundingFill">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}