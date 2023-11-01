import React from "react";
import PersonalActivityTx from "../../components/PersonalActivityTx";
import CardElement from "./CardElement";
import CollectionElement from "./CollectionElement";
import ConnectionElement from "./ConnectionElement";
import PreviewComponent from "../../components/PreviewComponent";
import "./styles/walletStyle.css";

export default function AccountContent(props) {
    if (props.selectedTab === "cards") {
        return (
            <div className="contentGrid">
                {props.cards.map((card, index) => {
                    return (
                        <CardElement
                            key={card.tokenId}
                            index={index}
                            tokenId={card.tokenId}
                            balance={card.balance}
                        />
                    )
                })}
            </div>
        )
    } else if (props.selectedTab === "transactions") {
        if(props.transactions.length > 0) {
            return (
                <div >
                    {props.transactions.map(tx => {
                        return (
                            <PersonalActivityTx
                                tx={tx}
                                key={tx._id}
                                username={props.user.username}
                            />
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div id="noCollectiblesMsg">you have 0 transactions</div>
            )
        }
    } else if (props.selectedTab === "collection") {
        return (
            <div id="noCollectiblesMsg">you have 0 collectibles</div>
        )
    } else if (props.selectedTab === "wallets") {
        return (
            <ConnectionElement />
        );
    } else if (props.selectedTab === "videos") {
        if(props.videos.length > 0) {
            return (
                <div className="contentGrid">
                    {props.videos.map(video => {
                        return (
                            <PreviewComponent
                                key={video._id + "created"}
                                videoID={video._id}
                                price={video.price}
                                thumb={video.thumbSrc}
                                title={video.title}
                                timestamp={video.timestamp}
                                views={video.viewHistory?.length}
                                solEarned={video.solEarned}
                                username={props.username}
                                userPic={props.profileImg}
                                grid={true}
                            />
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div id="noCollectiblesMsg">you have 0 videos</div>
            )
        }
    } else if (props.selectedTab === "unlocked") {
        return (
            <div className="contentGrid">
                {props.unlockedMedia.map(video => {
                    return (
                        <PreviewComponent
                            key={video._id + "unlocked" + Math.random()}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            timestamp={video.timestamp}
                            title={video.title}
                            views={video.viewHistory?.length}
                            solEarned={video.solEarned}
                            username={video.user.username}
                            userPic={video.user.profileImg}
                            grid={true}
                        />
                    )
                })}
            </div>
        )
    } else if (props.selectedTab === "liked") {
        return (
            <div className="contentGrid">
                {props.likedMedia.map(video => {
                    return (
                        <PreviewComponent
                            key={video._id + "liked"}
                            videoID={video._id}
                            price={video.price}
                            thumb={video.thumbSrc}
                            timestamp={video.timestamp}
                            title={video.title}
                            views={video.viewHistory?.length}
                            solEarned={video.solEarned}
                            username={video.user.username}
                            userPic={video.user.profileImg}
                            grid={true}
                        />
                    )
                })}
            </div>
        )
    }
}