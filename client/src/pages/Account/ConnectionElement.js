import React, { useEffect, useState } from "react";
import metamaskImg from "../../assets/metamask.png";
import walletConnectImg from "../../assets/walletconnect.png";
import starsImg from "../../assets/stars.png";
import "./styles/connectionElementStyle.css";

export default function ConnectionElement() {
    const [walletImg, setWalletImg] = useState();

    useEffect(() => {
        const authMethod = localStorage.getItem("authMethod");
        if (authMethod === "metamask") {
            setWalletImg(metamaskImg)
        } else if (authMethod === "walletConnect") {
            setWalletImg(walletConnectImg)
        } else if (authMethod === "magic") {
            setWalletImg(starsImg);
        }
    })

    return (
        <div className="connectionEl">
            <img className="connectionImg" src={walletImg}></img>
            <div className="nameBalance">
                <div className="connectionName">
                    0x533d5e...f2f10
                </div>
                <div className="connectionBalance">
                    USDC balance: $40
                </div>
            </div>
            {walletImg === starsImg ?
                <div className="withdrawBtn">
                    withdraw
                </div>
                : null
            }
            {/* <div className="withdrawBtn" id="primary">
                set primary
            </div> */}
        </div>
    );
}