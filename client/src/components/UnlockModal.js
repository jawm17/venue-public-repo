import React, { useState } from "react";
import "./styles/unlockModalStyle.css";

export default function UnlockModal(props) {
    const token = props.accessParams.accessToken;
    const [loading, setLoading] = useState(false);

    function startChecking() {
        setLoading(true);
        props.checkWallet();
    }

    return (
        <div id="unlockModalBG">
            <div id="unlockModalBody">
                <svg onClick={() => props.close()} id="closeUnlockModal" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.75 12C4.75 7.99594 7.99594 4.75 12 4.75V4.75C16.0041 4.75 19.25 7.99594 19.25 12V12C19.25 16.0041 16.0041 19.25 12 19.25V19.25C7.99594 19.25 4.75 16.0041 4.75 12V12Z"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75L14.25 14.25"></path>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 9.75L9.75 14.25"></path>
                </svg>
                <div id="unlockModalTitle">
                    Unlock Video
                </div>
                <div id="unlockModalText">
                    The following NFT is required to access this video.
                </div>
                <div id="unlockNFTDisplay">
                    <img src={token?.media} id="modalNFTImg"></img>
                    <div id="modalNFTInfo">
                        <div id="modalNFTInfoInner">
                            <div id="modalNFTName">
                                {token?.name}
                            </div>
                            <div id="modalNFTAddress">
                                {token ? (token.contractAddress).substring(0, 21) : null}...
                            </div>
                            <div id="modalNFTLink" onClick={() => window.open(props.link, '_blank')}>
                                purchase NFT
                                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 15.25V6.75H8.75"></path>
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 7L6.75 17.25"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div id="checkWalletNFTBtn" onClick={() => startChecking()}>
                    {loading ?
                        <div className="loaderFlex3">
                            <div className="loader3">
                            </div>
                        </div>
                        :
                        <div>
                            check wallet
                        </div>
                    }

                </div> */}
            </div>
        </div>
    );
}