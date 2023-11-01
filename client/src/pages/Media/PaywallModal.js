import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Web3Context } from "../../context/Web3Context";
import axios from "axios";
import "./styles/paywallModalStyle.css";

export default function PaywallModal(props) {
    const { user, balance, getBalance } = useContext(AuthContext);
    const { chainId, sendTx, getAccountBalance } = useContext(Web3Context);
    const [balanceError, setBalanceError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        // get token id
        // if token id is gold
        // display message
        getBalance();
    }, []);

    async function unlockVideo() {
        console.log(balance < props.videoData.price);
        console.log(props.videoData.price)
        if (balance < props.videoData.price) {
            setBalanceError(true);
        } else {
            setLoading(true);
            try {
                const { data } = await axios.post("/tx/transfer-token-value", {
                    video: props.videoData._id,
                });
                console.log(data);
                if (data.success) {
                    getBalance();
                    props.checkTxStatus(data.txRes.hash);
                    props.close();
                } else {
                    if (data.message.msgBody === "Insufficient Balance") {
                        console.log(data.message)
                        alert("error")
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    // if insufficient balance display prompt to buy more points
    // otherwise return null and handle tx automatically

    return (
        <>
            <div id="modalBlur" onClick={() => props.close()}></div>
            <div id="paywallModalBody">
                <svg onClick={() => props.close()} id="closeUnlockModal" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75L14.25 14.25"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L9.75 14.25"></path>
                </svg>
                <div id="paywallModalTitle">
                    Unlock Video (${props.videoData?.price})
                </div>
                <img id="paywallModalImg" src={props.videoData?.thumbSrc}></img>
                {/* <div id="paywallModalText">
                    This video costs ${props.videoData?.price} to unlock
                </div> */}
                <div id="paywallModalText">
                    Are you sure you want to unlock this video?
                </div>
                {balanceError ?
                    <div id="paywallModalText">
                        Your balance is too low. <mark id="addFundsLink" onClick={() => props.buyCard()}>add funds</mark>
                    </div>
                    :
                    null
                }
                <div id="checkWalletNFTBtn" onClick={!loading ? () => unlockVideo() : null}>
                    {loading ?
                        <div className="loaderFlex3">
                            <div className="loader3">
                            </div>
                        </div>
                        :
                        <div>
                            {done ? "complete" : "unlock"}
                        </div>
                    }

                </div>
            </div>
        </>
    );
}