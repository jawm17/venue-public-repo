import React, { useState, useContext, useEffect } from "react";
import NFTDisplay from "./NFTDisplay";
import SelectedNFTDisplay from "./SelectedNFTDisplay";
import "./styles/nftSelectorStyle.css";
import ethChain from "./ethChain.png";
import polygonChain from "./polygonChain.png";
import { AuthContext } from "../../context/AuthContext";
import { Network, Alchemy } from "alchemy-sdk";

export default function NFTSelector(props) {
    
    const [chain, setChain] = useState("mainnet");
    const [nfts, setNfts] = useState([]);
    const [selectedNFT, setSelectedNFT] = useState();
    const [loadingNFTs, setLoadingNFTs] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setSelectedNFT();
        props.setChain(chain);
        if (chain === "mainnet") {
            setLoadingNFTs(true);
            getMainnetNfts();
        } else {
            setLoadingNFTs(true);
            getPolygonNfts();
        }
    }, [chain]);

    useEffect(() => {
        props.setToken(selectedNFT);
    }, [selectedNFT]);

    async function getMainnetNfts() {
        setNfts([]);
        let settings = {
            apiKey: "_2PLc79asdkVn4I9mjW4ZGuFv3dlVtmx",
            network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(settings);
        const rawData = await alchemy.nft.getNftsForOwner(user.address);
        let nftData = [];
        console.log(rawData.ownedNfts)
        rawData.ownedNfts.forEach(nft => {
            if (nft.media[0] && nft.media[0].thumbnail) {
                nftData.push({ contractAddress: nft.contract.address, tokenId: nft.tokenId, tokenType: nft.tokenType, media: nft.media[0].thumbnail, name: nft.title });
            } else {
                // console.log(nft)
            }
        });
        setNfts(nftData);
        setLoadingNFTs(false);
    }

    async function getPolygonNfts() {
        setNfts([]);
        let settings = {
            apiKey: "w1jm8yaxFLd3sjA_RbdRDujeWzUEwoSO",
            network: Network.MATIC_MAINNET,
        };
        const alchemy = new Alchemy(settings);
        const rawData = await alchemy.nft.getNftsForOwner(user.address);
        let nftData = [];
        console.log(rawData.ownedNfts)
        rawData.ownedNfts.forEach(nft => {
            if (nft.media[0] && nft.media[0].thumbnail) {
                nftData.push({ contractAddress: nft.contract.address, tokenId: nft.tokenId, tokenType: nft.tokenType, media: nft.media[0].thumbnail, name: nft.title });
            } else {
                // console.log(nft)
            }
        });
        setNfts(nftData);
        setLoadingNFTs(false);
    }

    return (
        <div id="gateArea">
            <div id="selectorOptionsArea">
                <div className="pawyallChainLabel">
                    Chain
                </div>
                <div className="chainBtns">
                    <div onClick={() => setChain("mainnet")} id="mainnetChainBtn" className="chainBtn" style={chain === "mainnet" ? { borderColor: "#00c3ff" } : { borderColor: "#004181" }}>
                        <img id="ethChainImg" src={ethChain}></img>
                        Mainnet
                    </div>
                    <div onClick={() => setChain("polygon")} id="polygonChainBtn" className="chainBtn" style={chain === "polygon" ? { borderColor: "rgb(255, 161, 252)" } : { borderColor: "rgb(127, 0, 144)" }}>
                        <img id="polygonChainImg" src={polygonChain}></img>
                        Polygon
                    </div>
                </div>
            </div>

            {selectedNFT ?
                <SelectedNFTDisplay nft={selectedNFT} selectLink={(link) => props.selectLink(link)} unselectNFT={() => setSelectedNFT()} />
                :
                <div id="nftDisplayArea">
                    {loadingNFTs ?
                        <div className="loaderFlex2">
                            <div className="loader2">
                            </div>
                        </div>
                        :
                        nfts.map((nft) => {
                            return <NFTDisplay
                                media={nft.media}
                                name={nft.name}
                                type={nft.type}
                                tokenId={nft.tokenId}
                                contractAddress={nft.contractAddress}
                                selectNFT={() => setSelectedNFT(nft)}
                                key={nft.tokenId + nft.contractAddress}
                            />
                        })}
                    <div id="nftDisplaySpace">
                    </div>
                </div>
            }
        </div >
    );
}