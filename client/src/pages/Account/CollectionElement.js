import React from "react";
import diamond from "../../assets/diamondIcon.png";
import gold from "../../assets/goldIconWhite.png";
import "./styles/collectionElementStyle.css";

export default function CollectionElement(props) {

    function openCollection(id) {
        if (document.getElementById("collectionItem" + id).style.height === "280px") {
            document.getElementById("collectionItem" + id).style.height = "64px";
            document.getElementById("collectionInfoArea" + id).style.display = "0";
        } else {
            document.getElementById("collectionItem" + id).style.height = "280px";
            setTimeout(() => {
                document.getElementById("collectionInfoArea" + id).style.opacity = "100%";
            }, 100);
        }
    }

    return (
        <div className="collectionItem" id={"collectionItem" + props.index} onClick={() => openCollection(props.index)}>
            <div className="collectionItemTop">
                <img className="collectionItemImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8bR6yf5Mldklg49I6Q_HUnFd5HP5ekVxiA&usqp=CAU"></img>
                <div>
                    riley
                </div>
                <div className="nftLevelBadge" id="gold">
                    <img src={gold} className="nftBadgeIcon" id="goldIcon"></img><div>gold</div>
                </div>
            </div>
            <div className="collectionInfoArea" id={"collectionInfoArea" + props.index}>
                <div className="collectionInfoBg">
                    <img className="collectionImgMain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8bR6yf5Mldklg49I6Q_HUnFd5HP5ekVxiA&usqp=CAU"></img>
                    <div className="collectionInfo">
                        <div className="collectionText" id="collectionName">
                            riley
                        </div>
                        {/* <div className="collectionText">
                            Address: 0x5E52D1...A032
                        </div> */}
                        <div className="collectionText">
                            Royalty: 5%
                        </div>
                        <div className="collectionText">
                            Earned: $102.34
                        </div>
                    </div>
                    <div id="sellNftBtn">
                        sell NFT
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 15.25V6.75H8.75"></path>
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 7L6.75 17.25"></path>
                        </svg>
                    </div>
                </div>
                <div className="benefitsArea">
                    <div className="collectionBenefit">exclusive content</div>
                    <div className="collectionBenefit">5% royalties</div>
                </div>
            </div>
        </div>
    );
}