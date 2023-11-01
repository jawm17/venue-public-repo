import React, { useEffect, useState } from "react";
import ethChain from "./ethChain.png";
import polygonChain from "./polygonChain.png";
import "./styles/paywallOptionsStyle.css";

export default function PaywallOptions(props) {
    const [chain, setChain] = useState("mainnet");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        props.setChain(chain);
    }, [chain]);

    useEffect(() => {
        props.setAmount(amount);
    }, [amount]);

    function changeAmount(e) {
        if (!isNaN(e.target.value)) {
            setAmount(e.target.value)
        }
    }

    return (
        <div id="paywallOptionsArea">
            {/* <div className="pawyallChainLabel">
                Chain
            </div>
            <div className="chainBtns">
                <div onClick={() => setChain("mainnet")} id="mainnetChainBtn" className="chainBtn" style={chain ==="mainnet" ? {borderColor: "#00c3ff"} : {borderColor: "#004181"}}>
                    <img id="ethChainImg" src={ethChain}></img>
                    Mainnet
                </div>
                <div onClick={() => setChain("polygon")} id="polygonChainBtn" className="chainBtn" style={chain ==="polygon" ? {borderColor: "rgb(255, 161, 252)"} : {borderColor: "rgb(127, 0, 144)"}}>
                <img id="polygonChainImg" src={polygonChain}></img>
                    Polygon
                </div>
            </div> */}
            <div id="paywallAmountLabel">
                Amount
            </div>
            <div id="amountInputFlex">
                <div id="amountCurrency">
                    $
                </div>
                <div id="amountInputArea">
                    <input className="createInput" value={amount} onChange={(e) => changeAmount(e)}></input>
                </div>
            </div>
        </div>
    );
}