import React from "react";
import "./styles/selectedNFTDisplayStyle.css";

export default function SelectedNFTDisplay(props) {

    return (
        <div id="selectedNFTArea">
            <div className="selectedNFT">
                <div className="selectedNFTFLex">
                    <img src={props.nft.media} className="selectedNFTImg" />
                    <div className="selectedNFTInfo">
                        <div id="selectedName">
                            {props.nft.name}
                        </div>
                        <div id="selectedContract">
                            contract address: {props.nft.contractAddress}
                        </div>
                        <div>
                            token ID: {props.nft.tokenId}
                        </div>
                        <div id="nftLinkInputArea">
                            <div id="nftLinkLabel">
                                link to purchase:
                            </div>
                            <div id="nftLinkInputOuter">
                                <input id="nftLinkInput" onChange={(e) => props.selectLink(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <svg onClick={() => props.unselectNFT()} id="unselectNFT" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L6.75 17.25"></path>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75L17.25 17.25"></path>
                    </svg>
                </div>
            </div>
            <div id="selectedBottomInfo">
                Only the holders of this nft collection will be able to access your video.
            </div>
        </div>
    );
}